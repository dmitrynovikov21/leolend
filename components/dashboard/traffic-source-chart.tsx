"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Channel colors
const COLORS = {
    whatsapp: "#25D366",
    telegram: "#0088cc",
    web: "#6366f1",
}

// Mock data
const mockTrafficData = [
    { name: "WhatsApp", value: 45, color: COLORS.whatsapp },
    { name: "Telegram", value: 35, color: COLORS.telegram },
    { name: "Web Widget", value: 20, color: COLORS.web },
]

export function TrafficSourceChart() {
    const t = useTranslations('Dashboard')

    return (
        <Card className="bg-white border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-zinc-900">{t('trafficSource')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={mockTrafficData}
                                cx="50%"
                                cy="45%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {mockTrafficData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderRadius: '8px',
                                    border: '1px solid hsl(var(--border))',
                                }}
                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                                formatter={(value: number) => `${value}%`}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                formatter={(value, entry: any) => (
                                    <span className="text-sm">
                                        {value}: <span className="font-mono tabular-nums">{entry.payload.value}%</span>
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
