"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Channel colors
import { TrafficSourceData } from "@/lib/data/types"

// Channel colors
const COLORS: Record<string, string> = {
    whatsapp: "#25D366",
    telegram: "#0088cc",
    web: "#6366f1",
    // Fallback colors for other sources
    other: "#a1a1aa"
}

// Helper to normalize name to key
const getColor = (name: string) => {
    const key = name.toLowerCase().includes('whatsapp') ? 'whatsapp' :
        name.toLowerCase().includes('telegram') ? 'telegram' :
            name.toLowerCase().includes('web') ? 'web' : 'other'
    return COLORS[key]
}

interface TrafficSourceChartProps {
    data?: TrafficSourceData[]
}

export function TrafficSourceChart({ data = [] }: TrafficSourceChartProps) {
    const t = useTranslations('Dashboard')

    // Add color to data
    const chartData = data.map(item => ({
        ...item,
        color: getColor(item.name)
    }))

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
                                data={chartData}
                                cx="50%"
                                cy="45%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
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
