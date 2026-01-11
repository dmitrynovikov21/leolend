import { NextRequest, NextResponse } from "next/server"
import { trackEvent, getOrCreateVisitor } from "@/actions/analytics"
import { EventType } from "@prisma/client"

// Geolocation lookup via ipinfo.io (free tier: 50k/month)
async function getGeolocation(ip: string): Promise<{ country?: string; city?: string }> {
    if (!ip || ip === "unknown" || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.")) {
        return { country: "Local", city: "Development" }
    }

    try {
        const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN || ""}`, {
            next: { revalidate: 86400 } // Cache for 24 hours
        })
        if (response.ok) {
            const data = await response.json()
            return {
                country: data.country || undefined,
                city: data.city || undefined
            }
        }
    } catch (error) {
        console.error("Geolocation lookup failed:", error)
    }
    return {}
}

export async function POST(request: NextRequest) {
    try {
        // Get IP address
        const forwardedFor = request.headers.get("x-forwarded-for")
        const realIp = request.headers.get("x-real-ip")
        const ipAddress = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown"

        // Get geolocation
        const geo = await getGeolocation(ipAddress)

        const body = await request.json()

        const {
            visitorId,
            eventType,
            eventName,
            pageUrl,
            referrer,
            utmSource,
            utmMedium,
            utmCampaign,
            metadata,
            visitorData,
            sessionDuration,
            scrollDepth
        } = body

        // Validate required fields
        if (!visitorId || !eventType || !eventName || !pageUrl) {
            return NextResponse.json(
                { error: "Missing required fields: visitorId, eventType, eventName, pageUrl" },
                { status: 400 }
            )
        }

        // Validate event type
        const validEventTypes = Object.values(EventType)
        if (!validEventTypes.includes(eventType)) {
            return NextResponse.json(
                { error: `Invalid eventType. Must be one of: ${validEventTypes.join(", ")}` },
                { status: 400 }
            )
        }

        // If visitor data provided, update visitor info with geo
        if (visitorData || geo.country) {
            await getOrCreateVisitor(visitorId, {
                ...visitorData,
                country: geo.country,
                city: geo.city
            })
        }

        // Track the event with IP and geo
        const result = await trackEvent({
            visitorId,
            eventType: eventType as EventType,
            eventName,
            pageUrl,
            referrer,
            utmSource,
            utmMedium,
            utmCampaign,
            metadata,
            ipAddress,
            country: geo.country,
            city: geo.city,
            sessionDuration,
            scrollDepth
        })

        if (result.success) {
            return NextResponse.json({
                success: true,
                eventId: result.data?.id,
                telegramMsgId: result.data?.telegramMsgId
            })
        } else {
            return NextResponse.json({ error: result.error }, { status: 500 })
        }
    } catch (error) {
        console.error("Analytics API Error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

// Health check
export async function GET() {
    return NextResponse.json({ status: "ok", service: "analytics" })
}


