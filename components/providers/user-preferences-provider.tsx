"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface UserPreferencesContextType {
    avatar: string
    setAvatar: (avatar: string) => void
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined)

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
    const [avatar, setAvatarState] = useState("😎")

    useEffect(() => {
        const storedAvatar = localStorage.getItem("user-avatar")
        if (storedAvatar) {
            setAvatarState(storedAvatar)
        }
    }, [])

    const setAvatar = (newAvatar: string) => {
        setAvatarState(newAvatar)
        localStorage.setItem("user-avatar", newAvatar)
    }

    return (
        <UserPreferencesContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </UserPreferencesContext.Provider>
    )
}

export function useUserPreferences() {
    const context = useContext(UserPreferencesContext)
    if (context === undefined) {
        throw new Error("useUserPreferences must be used within a UserPreferencesProvider")
    }
    return context
}
