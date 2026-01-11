"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

// Lazy import analytics to ensure client-side only
function getAnalytics() {
    if (typeof window === "undefined") return null
    // Dynamic import workaround for client-side singleton
    const { analytics } = require("@/lib/analytics")
    return analytics
}

// Lazy import heartbeat
function getHeartbeat() {
    if (typeof window === "undefined") return null
    const { heartbeat } = require("@/lib/heartbeat")
    return heartbeat
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isInitialized = useRef(false)
    const [analytics, setAnalytics] = useState<any>(null)

    // Initialize analytics and heartbeat on mount (client side only)
    useEffect(() => {
        const a = getAnalytics()
        const h = getHeartbeat()

        setAnalytics(a)

        if (!isInitialized.current && a) {
            a.startSession()

            // Start heartbeat tracking with visitor ID
            if (h) {
                h.start(a.getVisitorId())
            }

            isInitialized.current = true
        }

        return () => {
            if (a) {
                a.endSession()
            }
            if (h) {
                h.stop()
            }
        }
    }, [])

    // Track page views on route change (skip admin/dashboard pages)
    useEffect(() => {
        if (analytics && pathname) {
            // Skip tracking for admin and dashboard pages
            const isAdminPath = pathname.includes("/adminlend") || pathname.includes("/dashboard")
            if (!isAdminPath) {
                analytics.trackPageView(pathname)
            }
        }
    }, [pathname, analytics])

    return <>{children}</>
}

// Hook for manual tracking in components
export function useAnalytics() {
    const [analytics, setAnalytics] = useState<any>(null)

    useEffect(() => {
        setAnalytics(getAnalytics())
    }, [])

    return {
        trackClick: (elementId: string, metadata?: Record<string, any>) => {
            console.log("trackClick called:", elementId, metadata)
            if (analytics) {
                analytics.trackClick(elementId, metadata)
            } else {
                // Fallback: try to get analytics directly
                const a = getAnalytics()
                if (a) a.trackClick(elementId, metadata)
            }
        },
        trackScroll: (sectionId: string) => {
            const a = analytics || getAnalytics()
            a?.trackScroll(sectionId)
        },
        trackFormSubmit: (formId: string, metadata?: Record<string, any>) => {
            console.log("trackFormSubmit called:", formId, metadata)
            const a = analytics || getAnalytics()
            a?.trackFormSubmit(formId, metadata)
        },
        trackWidgetOpen: () => {
            const a = analytics || getAnalytics()
            a?.trackWidgetOpen()
        },
        trackWidgetClose: () => {
            const a = analytics || getAnalytics()
            a?.trackWidgetClose()
        },
        getVisitorId: () => {
            const a = analytics || getAnalytics()
            return a?.getVisitorId() || ""
        }
    }
}

