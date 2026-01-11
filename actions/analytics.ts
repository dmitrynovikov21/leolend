"use server"

import { prisma } from "@/lib/db"
import { EventType } from "@prisma/client"

// Types
interface TrackEventData {
    visitorId: string
    eventType: EventType
    eventName: string
    pageUrl: string
    referrer?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    metadata?: any
    ipAddress?: string
    country?: string
    city?: string
    sessionDuration?: number
    scrollDepth?: string
}

interface VisitorData {
    fingerprint?: string
    deviceType?: string
    browser?: string
    os?: string
    country?: string
    city?: string
}

// Get or create visitor
// Get or create visitor
export async function getOrCreateVisitor(visitorId: string, data?: VisitorData) {
    try {
        const visitor = await prisma.visitor.upsert({
            where: { id: visitorId },
            update: {
                lastVisitAt: new Date(),
                totalVisits: { increment: 1 },
                ...(data?.deviceType && { deviceType: data.deviceType }),
                ...(data?.browser && { browser: data.browser }),
                ...(data?.os && { os: data.os }),
                ...(data?.country && { country: data.country }),
                ...(data?.city && { city: data.city }),
            },
            create: {
                id: visitorId,
                fingerprint: data?.fingerprint,
                deviceType: data?.deviceType,
                browser: data?.browser,
                os: data?.os,
                country: data?.country,
                city: data?.city,
            }
        })

        return { success: true, data: visitor }
    } catch (error) {
        console.error("Error getting/creating visitor:", error)
        return { success: false, error: "Failed to get/create visitor" }
    }
}

// Track event
export async function trackEvent(eventData: TrackEventData) {
    try {
        // Ensure visitor exists
        await getOrCreateVisitor(eventData.visitorId)

        const event = await prisma.analyticsEvent.create({
            data: {
                visitorId: eventData.visitorId,
                eventType: eventData.eventType,
                eventName: eventData.eventName,
                pageUrl: eventData.pageUrl,
                referrer: eventData.referrer,
                utmSource: eventData.utmSource,
                utmMedium: eventData.utmMedium,
                utmCampaign: eventData.utmCampaign,
                metadata: eventData.metadata,
                ipAddress: eventData.ipAddress,
                country: eventData.country,
                city: eventData.city,
                sessionDuration: eventData.sessionDuration,
                scrollDepth: eventData.scrollDepth,
            }
        })

        // Send Telegram notification for important events
        await sendAnalyticsTelegramNotification(eventData)

        return { success: true, data: event }
    } catch (error) {
        console.error("Error tracking event:", error)
        return { success: false, error: "Failed to track event" }
    }
}

// Get analytics data (for admin panel)
export async function getAnalyticsEvents(filters?: {
    eventType?: EventType
    startDate?: Date
    endDate?: Date
    limit?: number
}) {
    try {
        const events = await prisma.analyticsEvent.findMany({
            where: {
                ...(filters?.eventType && { eventType: filters.eventType }),
                ...(filters?.startDate && {
                    createdAt: {
                        gte: filters.startDate,
                        ...(filters?.endDate && { lte: filters.endDate })
                    }
                })
            },
            include: {
                visitor: true
            },
            orderBy: { createdAt: "desc" },
            take: filters?.limit || 100
        })

        return { success: true, data: events }
    } catch (error) {
        console.error("Error fetching analytics:", error)
        return { success: false, error: "Failed to fetch analytics" }
    }
}

// Get visitor stats
export async function getVisitorStats() {
    try {
        const totalVisitors = await prisma.visitor.count()
        const todayVisitors = await prisma.visitor.count({
            where: {
                lastVisitAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0))
                }
            }
        })
        const totalEvents = await prisma.analyticsEvent.count()

        return {
            success: true,
            data: {
                totalVisitors,
                todayVisitors,
                totalEvents
            }
        }
    } catch (error) {
        console.error("Error fetching visitor stats:", error)
        return { success: false, error: "Failed to fetch stats" }
    }
}

// Telegram notification with topic support
async function sendAnalyticsTelegramNotification(eventData: TrackEventData) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
        // console.log("Telegram credentials not configured, skipping notification") 
        return
    }

    // Determine topic ID based on event type
    let topicId: string | undefined

    switch (eventData.eventType) {
        case "PAGE_VIEW":
        case "SESSION_START":
            topicId = process.env.TELEGRAM_TOPIC_VISITS
            break
        case "CLICK":
        case "WIDGET_OPEN":
        case "WIDGET_CLOSE":
            topicId = process.env.TELEGRAM_TOPIC_CLICKS
            break
        case "FORM_SUBMIT":
            topicId = process.env.TELEGRAM_TOPIC_LEADS
            break
        default:
            topicId = process.env.TELEGRAM_TOPIC_VISITS
    }

    // --- Message Construction ---

    // 1. Header (Action)
    let header = ""
    switch (eventData.eventType) {
        case "PAGE_VIEW": header = "👀 Просмотр страницы"; break;
        case "SESSION_START": header = "🚀 Новая сессия"; break;
        case "CLICK": header = `👆 Клик: "${eventData.eventName}"`; break;
        case "FORM_SUBMIT": header = `📝 Новая заявка: "${eventData.eventName}"`; break;
        case "WIDGET_OPEN": header = "💬 Открыт виджет"; break;
        case "WIDGET_CLOSE": header = "✖️ Закрыт виджет"; break;
        default: header = `🔔 Событие: ${eventData.eventName}`;
    }

    // 2. User Info (ID + IP + Location)
    const ip = eventData.ipAddress || "No IP"
    const locationParts = []
    if (eventData.city) locationParts.push(eventData.city)
    if (eventData.country) locationParts.push(eventData.country)

    const locationStr = locationParts.length > 0 ? ` • ${locationParts.join(", ")}` : ""
    const userInfo = `👤 \`[${eventData.visitorId.slice(0, 6)}...]\` • \`${ip}\`${locationStr}`

    // 3. Technical Details (Device, Source)
    let techInfo = ""
    if (eventData.metadata?.browser) techInfo += `📱 ${eventData.metadata.browser}`
    if (eventData.metadata?.os) techInfo += ` / ${eventData.metadata.os}`

    // 4. Content (Links, Data)
    let content = ""
    if (eventData.pageUrl) {
        content += `📄 ${eventData.pageUrl}`
    }

    // Add form data if available
    if (eventData.eventType === "FORM_SUBMIT" && eventData.metadata) {
        const formData = { ...eventData.metadata }
        delete formData.browser // Remove tech data from body
        delete formData.os
        delete formData.device

        if (Object.keys(formData).length > 0) {
            content += "\n\n**Данные:**"
            Object.entries(formData).forEach(([key, value]) => {
                if (value) content += `\n- ${key}: ${value}`
            })
        }
    }

    // Combine Message
    let message = `**${header}**\n${userInfo}\n`
    if (techInfo) message += `${techInfo}\n`
    message += `\n${content}`

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message.trim(),
                parse_mode: "Markdown", // Use Markdown for bold/code
                disable_web_page_preview: true,
                ...(topicId && { message_thread_id: parseInt(topicId) })
            })
        })
    } catch (error) {
        console.error("Failed to send Telegram notification:", error)
    }
}

