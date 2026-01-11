import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { activeSessions } from "../heartbeat/route"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
const TELEGRAM_TOPIC_VISITS = process.env.TELEGRAM_TOPIC_VISITS

// Edit Telegram message to add session summary
async function editTelegramMessage(messageId: number, newText: string) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || !messageId) return false

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                message_id: messageId,
                text: newText,
                ...(TELEGRAM_TOPIC_VISITS && { message_thread_id: parseInt(TELEGRAM_TOPIC_VISITS) })
            })
        })
        return response.ok
    } catch (error) {
        console.error("Failed to edit Telegram message:", error)
        return false
    }
}

// Send session end notification
async function sendSessionEndNotification(session: {
    visitorId: string
    duration: number
    scrolledSections: string[]
    ipAddress: string
    pageUrl: string
}) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return

    const durationStr = formatDuration(session.duration)
    const sectionsStr = session.scrolledSections.length > 0
        ? session.scrolledSections.join(", ")
        : "нет"

    const message = `👋 Сессия завершена
${session.pageUrl}
🌐 ${session.ipAddress}
⏱️ ${durationStr}
📜 Секции: ${sectionsStr}`

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                ...(TELEGRAM_TOPIC_VISITS && { message_thread_id: parseInt(TELEGRAM_TOPIC_VISITS) })
            })
        })
    } catch (error) {
        console.error("Failed to send session end notification:", error)
    }
}

function formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds} сек`
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}м ${secs}с`
}

// Session end endpoint - called via sendBeacon on page close
export async function POST(request: NextRequest) {
    try {
        // Parse body - sendBeacon sends as text
        const text = await request.text()
        const body = JSON.parse(text)

        const { visitorId, duration, scrolledSections, isEnd } = body

        if (!visitorId) {
            return NextResponse.json({ error: "visitorId required" }, { status: 400 })
        }

        // Get session from memory
        const session = activeSessions.get(visitorId)

        if (session) {
            // Calculate final duration
            const finalDuration = duration || Math.floor((Date.now() - session.startTime) / 1000)

            // Send session end notification
            await sendSessionEndNotification({
                visitorId,
                duration: finalDuration,
                scrolledSections: scrolledSections || session.scrolledSections,
                ipAddress: session.ipAddress,
                pageUrl: session.pageUrl
            })

            // Remove session from memory
            activeSessions.delete(visitorId)

            // Save session to database
            try {
                await prisma.analyticsEvent.create({
                    data: {
                        visitorId,
                        eventType: "SESSION_END",
                        eventName: "session_end",
                        pageUrl: session.pageUrl,
                        ipAddress: session.ipAddress,
                        sessionDuration: finalDuration,
                        scrollDepth: (scrolledSections || session.scrolledSections).join(",")
                    }
                })
            } catch (dbError) {
                console.error("Failed to save session to DB:", dbError)
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Session end error:", error)
        return NextResponse.json({ error: "Failed to end session" }, { status: 500 })
    }
}
