"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { MessageSquare, AlertCircle, DollarSign, CheckCircle2, Upload, UserPlus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Activity types
const activityIcons = {
    message: MessageSquare,
    error: AlertCircle,
    sale: DollarSign,
    success: CheckCircle2,
    upload: Upload,
    user: UserPlus,
}

// Mock live activity data
const mockActivity = [
    {
        id: "1",
        type: "success" as const,
        event: "Oleg HR закрыл обращение #402",
        time: "2 мин назад",
    },
    {
        id: "2",
        type: "upload" as const,
        event: "\"Pricing_Q4.pdf\" завершил обработку",
        time: "5 мин назад",
    },
    {
        id: "3",
        type: "error" as const,
        event: "Высокая задержка в WhatsApp (4.5s)",
        time: "1 час назад",
    },
    {
        id: "4",
        type: "user" as const,
        event: "Создан новый агент \"HR Assistant\"",
        time: "3 часа назад",
    },
    {
        id: "5",
        type: "message" as const,
        event: "Alice Support квалифицировала лид",
        time: "4 часа назад",
    },
    {
        id: "6",
        type: "sale" as const,
        event: "Bob Sales закрыл сделку на ₽45,000",
        time: "5 часов назад",
    },
]

export function LiveActivityFeed() {
    const t = useTranslations('Dashboard')

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>{t('liveActivity')}</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                        {mockActivity.map((activity, index) => {
                            const Icon = activityIcons[activity.type]
                            const isLast = index === mockActivity.length - 1

                            return (
                                <div key={activity.id} className="flex gap-3 relative">
                                    {/* Timeline connector */}
                                    {!isLast && (
                                        <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={cn(
                                            "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-background",
                                            activity.type === "success" && "bg-emerald-500",
                                            activity.type === "error" && "bg-red-500",
                                            activity.type === "message" && "bg-blue-500",
                                            activity.type === "sale" && "bg-green-500",
                                            activity.type === "upload" && "bg-purple-500",
                                            activity.type === "user" && "bg-amber-500"
                                        )}
                                    >
                                        <Icon className="h-3 w-3 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-1 pt-0.5">
                                        <p className="text-sm leading-snug">{activity.event}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
