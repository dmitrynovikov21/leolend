"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { MessageSquare, Send, Globe, Settings } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock channels data
const mockChannels = [
    {
        id: "whatsapp",
        name: "WhatsApp Business",
        icon: MessageSquare,
        status: "connected" as const,
        lastActivity: "2 мин назад",
        color: "#25D366",
    },
    {
        id: "telegram",
        name: "Telegram Bot",
        icon: Send,
        status: "connected" as const,
        lastActivity: "5 мин назад",
        color: "#0088cc",
    },
    {
        id: "web",
        name: "Web Chat Widget",
        icon: Globe,
        status: "connected" as const,
        lastActivity: "1 час назад",
        color: "#6366f1",
    },
]

export function ActiveChannels() {
    const t = useTranslations('Dashboard')

    return (
        <Card className="bg-white border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-zinc-900">{t('activeChannels')}</CardTitle>
                    <Button variant="default" size="sm" className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl h-9 px-4 shadow-none">
                        <Settings className="h-4 w-4 mr-2" />
                        {t('manageChannels')}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {mockChannels.map((channel) => {
                        const Icon = channel.icon
                        return (
                            <div
                                key={channel.id}
                                className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            >
                                {/* Icon with channel color */}
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                                    style={{ backgroundColor: `${channel.color}15`, color: channel.color }}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                {/* Channel info */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm">{channel.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {t('lastActivity')}: {channel.lastActivity}
                                    </div>
                                </div>

                                {/* Status indicator */}
                                <div className="flex items-center gap-2">
                                    {channel.status === "connected" ? (
                                        <>
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800">
                                                {t('connected')}
                                            </Badge>
                                        </>
                                    ) : (
                                        <>
                                            <div className="h-2 w-2 rounded-full bg-red-500" />
                                            <Badge variant="destructive">
                                                Disconnected
                                            </Badge>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
