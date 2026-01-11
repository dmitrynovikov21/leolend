// Client-side heartbeat service for session tracking
// Sends heartbeat every 30 seconds to track active sessions

class HeartbeatService {
    private intervalId: NodeJS.Timeout | null = null
    private visitorId: string = ""
    private sessionStartTime: number = 0
    private scrolledSections: Set<string> = new Set()
    private isActive: boolean = false

    start(visitorId: string) {
        if (this.isActive) return

        this.visitorId = visitorId
        this.sessionStartTime = Date.now()
        this.isActive = true

        // Initial heartbeat
        this.sendHeartbeat()

        // Send heartbeat every 30 seconds
        this.intervalId = setInterval(() => {
            this.sendHeartbeat()
        }, 30000)

        // Listen for visibility change
        document.addEventListener("visibilitychange", this.handleVisibilityChange)

        // Listen for page unload
        window.addEventListener("beforeunload", this.handleUnload)

        console.log("Heartbeat started for visitor:", visitorId)
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }

        document.removeEventListener("visibilitychange", this.handleVisibilityChange)
        window.removeEventListener("beforeunload", this.handleUnload)

        this.isActive = false
    }

    addScrolledSection(sectionId: string) {
        this.scrolledSections.add(sectionId)
    }

    private async sendHeartbeat() {
        if (!this.visitorId) return

        try {
            const duration = Math.floor((Date.now() - this.sessionStartTime) / 1000)

            await fetch("/api/analytics/heartbeat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    visitorId: this.visitorId,
                    pageUrl: window.location.pathname,
                    scrolledSections: Array.from(this.scrolledSections),
                    duration
                })
            })
        } catch (error) {
            console.error("Heartbeat failed:", error)
        }
    }

    private handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
            // Page is hidden (minimized, tab switched) - send final heartbeat
            this.sendEndSession()
        } else {
            // Page is visible again - send heartbeat
            this.sendHeartbeat()
        }
    }

    private handleUnload = () => {
        // Try to send final heartbeat using sendBeacon
        this.sendEndSession()
    }

    private sendEndSession() {
        if (!this.visitorId) return

        const duration = Math.floor((Date.now() - this.sessionStartTime) / 1000)
        const data = JSON.stringify({
            visitorId: this.visitorId,
            pageUrl: window.location.pathname,
            scrolledSections: Array.from(this.scrolledSections),
            duration,
            isEnd: true
        })

        // Use sendBeacon for reliability on page close
        if (navigator.sendBeacon) {
            navigator.sendBeacon("/api/analytics/session-end", data)
        } else {
            // Fallback for older browsers
            fetch("/api/analytics/session-end", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
                keepalive: true
            })
        }
    }

    getSessionDuration(): number {
        return Math.floor((Date.now() - this.sessionStartTime) / 1000)
    }

    getScrolledSections(): string[] {
        return Array.from(this.scrolledSections)
    }
}

// Singleton instance
export const heartbeat = typeof window !== "undefined" ? new HeartbeatService() : null
