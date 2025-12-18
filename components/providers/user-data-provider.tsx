"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserData } from '@/lib/data/types'
import { userService } from '@/lib/data/user-service'

interface UserContextType {
    userData: UserData | null
    isLoading: boolean
    error: Error | null
    refreshUser: () => Promise<void>
    switchUser: (userId: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const loadData = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const userId = userService.getCurrentUserId()
            const data = await userService.getUserData(userId)
            setUserData(data)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to load user data'))
        } finally {
            setIsLoading(false)
        }
    }

    const switchUser = (userId: string) => {
        if (userService.setCurrentUserId(userId)) {
            loadData()
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <UserContext.Provider value={{ userData, isLoading, error, refreshUser: loadData, switchUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
