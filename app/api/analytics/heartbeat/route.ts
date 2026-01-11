import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// In-memory session storage (for production, use Redis)
const activeSessions = new Map<string, {
    visitorId: string
    startTime: number
    lastHeartbeat: number
    telegramMsgId?: number
    pageUrl: string
    scrolledSections: string[]
    ipAddress: string
}>()

// Heartbeat endpoint - called every 30 seconds by client
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { visitorId, scrolledSections } = body

        // Get IP
        const forwardedFor = request.headers.get("x-forwarded-for")
        const realIp = request.headers.get("x-real-ip")
        const ipAddress = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown"

        const session = activeSessions.get(visitorId)

        if (session) {
            // Update existing session
            session.lastHeartbeat = Date.now()
            if (scrolledSections) {
                session.scrolledSections = scrolledSections
            }

            const duration = Math.floor((Date.now() - session.startTime) / 1000)
            return NextResponse.json({
                success: true,
                duration,
                message: "Heartbeat received"
            })
        } else {
            // Start new session
            activeSessions.set(visitorId, {
                visitorId,
                startTime: Date.now(),
                lastHeartbeat: Date.now(),
                pageUrl: body.pageUrl || "/",
                scrolledSections: scrolledSections || [],
                ipAddress
            })

            return NextResponse.json({
                success: true,
                duration: 0,
                message: "Session started"
            })
        }
    } catch (error) {
        console.error("Heartbeat error:", error)
        return NextResponse.json({ error: "Heartbeat failed" }, { status: 500 })
    }
}

// Get session info
export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const visitorId = url.searchParams.get("visitorId")

    if (!visitorId) {
        return NextResponse.json({ error: "visitorId required" }, { status: 400 })
    }

    const session = activeSessions.get(visitorId)
    if (session) {
        const duration = Math.floor((Date.now() - session.startTime) / 1000)
        return NextResponse.json({
            success: true,
            duration,
            scrolledSections: session.scrolledSections
        })
    }

    return NextResponse.json({ success: false, message: "No active session" })
}

// Export for use in cron/cleanup
export { activeSessions }
