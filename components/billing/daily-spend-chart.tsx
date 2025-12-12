"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDailySpend } from '@/mocks/billing'

export function DailySpendChart() {
    const lastWeek = mockDailySpend.slice(-7)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Spend</CardTitle>
                <CardDescription>AI usage costs over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={lastWeek}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                                className="text-xs"
                            />
                            <YAxis className="text-xs" />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (!active || !payload?.length) return null
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-md">
                                            <div className="font-medium">₽ {payload[0].value}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {new Date(payload[0].payload.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
