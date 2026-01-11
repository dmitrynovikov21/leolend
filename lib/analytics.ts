// Client-side analytics service
// Tracks user events and sends them to the backend

type EventType =
    | "PAGE_VIEW"
    | "CLICK"
    | "SCROLL"
    | "FORM_SUBMIT"
    | "WIDGET_OPEN"
    | "WIDGET_CLOSE"
    | "SESSION_START"
    | "SESSION_END"

interface TrackOptions {
    eventName: string
    metadata?: Record<string, any>
}

interface VisitorData {
    deviceType?: string
    browser?: string
    os?: string
}

class Analytics {
    private visitorId: string | null = null
    private sessionStarted = false
    private apiEndpoint = "/api/analytics/track"

    constructor() {
        if (typeof window !== "undefined") {
            this.initVisitor()
        }
    }

    // Generate or retrieve visitor ID from localStorage
    private initVisitor(): void {
        const storedId = localStorage.getItem("leo_visitor_id")
        if (storedId) {
            this.visitorId = storedId
        } else {
            this.visitorId = this.generateUUID()
            localStorage.setItem("leo_visitor_id", this.visitorId)
        }
    }

    private generateUUID(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0
            const v = c === "x" ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    }

    // Get visitor info from browser
    private getVisitorData(): VisitorData {
        const ua = navigator.userAgent
        let deviceType = "desktop"
        if (/Mobi|Android/i.test(ua)) deviceType = "mobile"
        else if (/Tablet|iPad/i.test(ua)) deviceType = "tablet"

        let browser = "unknown"
        if (ua.includes("Chrome")) browser = "Chrome"
        else if (ua.includes("Firefox")) browser = "Firefox"
        else if (ua.includes("Safari")) browser = "Safari"
        else if (ua.includes("Edge")) browser = "Edge"

        let os = "unknown"
        if (ua.includes("Windows")) os = "Windows"
        else if (ua.includes("Mac")) os = "macOS"
        else if (ua.includes("Linux")) os = "Linux"
        else if (ua.includes("Android")) os = "Android"
        else if (ua.includes("iOS") || ua.includes("iPhone")) os = "iOS"

        return { deviceType, browser, os }
    }

    // Get UTM params from URL
    private getUTMParams(): Record<string, string | undefined> {
        if (typeof window === "undefined") return {}
        const params = new URLSearchParams(window.location.search)
        return {
            utmSource: params.get("utm_source") || undefined,
            utmMedium: params.get("utm_medium") || undefined,
            utmCampaign: params.get("utm_campaign") || undefined,
        }
    }

    // Get visitor ID (public method)
    getVisitorId(): string {
        if (!this.visitorId && typeof window !== "undefined") {
            this.initVisitor()
        }
        return this.visitorId || ""
    }

    // Core track method
    async track(eventType: EventType, options: TrackOptions): Promise<void> {
        if (typeof window === "undefined" || !this.visitorId) return

        const utm = this.getUTMParams()
        const visitorData = this.getVisitorData()

        try {
            await fetch(this.apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    visitorId: this.visitorId,
                    eventType,
                    eventName: options.eventName,
                    pageUrl: window.location.pathname,
                    referrer: document.referrer || undefined,
                    ...utm,
                    metadata: options.metadata,
                    visitorData
                })
            })
        } catch (error) {
            console.error("Analytics tracking error:", error)
        }
    }

    // Convenient wrapper methods
    trackPageView(pageName?: string): void {
        this.track("PAGE_VIEW", {
            eventName: pageName || window.location.pathname
        })
    }

    trackClick(elementId: string, metadata?: Record<string, any>): void {
        this.track("CLICK", {
            eventName: elementId,
            metadata
        })
    }

    trackScroll(sectionId: string): void {
        this.track("SCROLL", {
            eventName: sectionId,
            metadata: { sectionId }
        })
    }

    trackFormSubmit(formId: string, metadata?: Record<string, any>): void {
        this.track("FORM_SUBMIT", {
            eventName: formId,
            metadata
        })
    }

    trackWidgetOpen(): void {
        this.track("WIDGET_OPEN", {
            eventName: "chat_widget"
        })
    }

    trackWidgetClose(): void {
        this.track("WIDGET_CLOSE", {
            eventName: "chat_widget"
        })
    }

    // Session tracking
    startSession(): void {
        if (!this.sessionStarted) {
            this.sessionStarted = true
            this.track("SESSION_START", {
                eventName: "session_start"
            })
        }
    }

    endSession(): void {
        if (this.sessionStarted) {
            this.track("SESSION_END", {
                eventName: "session_end"
            })
            this.sessionStarted = false
        }
    }
}

// Singleton instance
export const analytics = typeof window !== "undefined" ? new Analytics() : null

// Export for use in components
export default analytics
