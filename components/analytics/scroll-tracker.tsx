"use client"

import { useEffect, useRef } from "react"
import { useAnalytics } from "./analytics-provider"

interface ScrollTrackerProps {
    sectionId: string
    children: React.ReactNode
    threshold?: number
}

// Component that tracks when a section becomes visible
export function ScrollTracker({ sectionId, children, threshold = 0.5 }: ScrollTrackerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const hasTracked = useRef(false)
    const { trackScroll } = useAnalytics()

    useEffect(() => {
        const element = ref.current
        if (!element || typeof window === "undefined") return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTracked.current) {
                        hasTracked.current = true
                        console.log("Section reached:", sectionId)
                        trackScroll(sectionId)
                    }
                })
            },
            { threshold }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [sectionId, threshold, trackScroll])

    return <div ref={ref}>{children}</div>
}

// Hook to track multiple sections at once
export function useScrollTracking(sectionIds: string[]) {
    const trackedSections = useRef<Set<string>>(new Set())
    const { trackScroll } = useAnalytics()

    useEffect(() => {
        if (typeof window === "undefined") return

        const observers: IntersectionObserver[] = []

        sectionIds.forEach((id) => {
            const element = document.getElementById(id)
            if (!element) return

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !trackedSections.current.has(id)) {
                            trackedSections.current.add(id)
                            console.log("Section scrolled to:", id)
                            trackScroll(id)
                        }
                    })
                },
                { threshold: 0.3 }
            )

            observer.observe(element)
            observers.push(observer)
        })

        return () => {
            observers.forEach((o) => o.disconnect())
        }
    }, [sectionIds, trackScroll])

    return trackedSections.current
}
