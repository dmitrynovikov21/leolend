"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { MessageCircle, AlertTriangle, CheckCircle2, Upload, UserPlus, Bot } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Event types with small icons
const eventIcons = {
    message: MessageCircle,
    warning: AlertTriangle,
    success: CheckCircle2,
    upload: Upload,
    user: UserPlus,
    bot: Bot,
}

// Mock compact events
const mockEvents = [
    {
        id: "1",
        type: "success" as const,
        text: "New lead qualified via WhatsApp",
        time: "2m ago",
    },
    {
        id: "2",
        type: "upload" as const,
        text: "Document \"Pricing.pdf\" processed",
        time: "5m ago",
    },
    {
        id: "3",
        type: "warning" as const,
        text: "High latency detected on Telegram",
        time: "1h ago",
    },
    {
        id: "4",
        type: "bot" as const,
        text: "New agent \"Sales Bot\" deployed",
        time: "3h ago",
    },
    {
        id: "5",
        type: "message" as const,
        text: "Alice Support handled 45 chats",
        time: "4h ago",
    },
    {
        id: "6",
        type: "success" as const,
        text: "Integration with CRM connected",
        time: "5h ago",
    },
]

export function SystemEventsLog() {
    const t = useTranslations('Dashboard')

    return (
        <Card className="h-full bg-white border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-zinc-900">{t('systemEvents')}</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[420px] pr-3">
                    <div className="space-y-2">
                        {mockEvents.map((event) => {
                            const Icon = eventIcons[event.type]

                            return (
                                <div key={event.id} className="flex items-start gap-2 py-1.5">
                                    {/* Small icon (16x16) */}
                                    <Icon
                                        className={cn(
                                            "h-4 w-4 shrink-0 mt-0.5",
                                            event.type === "success" && "text-emerald-500",
                                            event.type === "warning" && "text-amber-500",
                                            event.type === "message" && "text-blue-500",
                                            event.type === "upload" && "text-purple-500",
                                            event.type === "user" && "text-indigo-500",
                                            event.type === "bot" && "text-cyan-500"
                                        )}
                                    />

                                    {/* Event text */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm leading-snug">{event.text}</p>
                                    </div>

                                    {/* Time */}
                                    <span className="text-xs text-muted-foreground tabular-nums font-mono shrink-0">
                                        {event.time}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
