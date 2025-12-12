"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowDownRight, ArrowUpRight, MessageSquare, Clock, ThumbsUp, Wallet, Activity, FileText, Zap, DollarSign, UserPlus, Lock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock Data for Chart
const data = [
    { name: "Mon", conversations: 120, engagement: 240 },
    { name: "Tue", conversations: 132, engagement: 139 },
    { name: "Wed", conversations: 101, engagement: 980 },
    { name: "Thu", conversations: 134, engagement: 390 },
    { name: "Fri", conversations: 190, engagement: 480 },
    { name: "Sat", conversations: 230, engagement: 380 },
    { name: "Sun", conversations: 100, engagement: 430 },
]

export function AnalyticsDashboard() {
    const t = useTranslations('Agents.detail');

    return (
        <Tabs defaultValue="overview" className="flex-1 space-y-6">
            {/* Header: Title + Controls */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">{t('operationsCenter')}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="h-8 rounded-xl text-zinc-500 hover:text-zinc-900 gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">Отчеты</span>
                    </Button>
                </div>
            </div>

            <TabsContent value="overview" className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-900">
                                Всего диалогов
                            </CardTitle>
                            <div className="h-8 w-8 flex items-center justify-center">
                                <span className="text-xl">🤖</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-zinc-900">1,284</div>
                            <p className="text-xs text-zinc-500 font-medium flex items-center mt-1">
                                <span className="text-zinc-900 flex items-center mr-1">
                                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                                    +12.5%
                                </span>
                                {t('fromLastMonth')}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-900">
                                Диалоги сегодня
                            </CardTitle>
                            <div className="h-8 w-8 flex items-center justify-center">
                                <span className="text-xl">💬</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-zinc-900">42</div>
                            <p className="text-xs text-zinc-500 font-medium flex items-center mt-1">
                                <span className="text-zinc-900 flex items-center mr-1">
                                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                                    +5
                                </span>
                                к вчерашнему
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-900">
                                Всего токенов
                            </CardTitle>
                            <div className="h-8 w-8 flex items-center justify-center">
                                <span className="text-xl">🎟️</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-zinc-900">142.5k</div>
                            <p className="text-xs text-zinc-500 font-medium flex items-center mt-1">
                                <span className="text-zinc-900 flex items-center mr-1">
                                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                                    +8.2%
                                </span>
                                за месяц
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-900">
                                {t('avgResponseTime')}
                            </CardTitle>
                            <div className="h-8 w-8 flex items-center justify-center">
                                <span className="text-xl">⚡</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-zinc-900">1.2s</div>
                            <p className="text-xs text-zinc-500 font-medium flex items-center mt-1">
                                <span className="text-zinc-900 flex items-center mr-1">
                                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                                    -0.3s
                                </span>
                                {t('fasterThanAvg')}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* CHARTS ROW */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4 border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-zinc-900">{t('activityOverview')}</CardTitle>
                            <CardDescription className="text-zinc-500 font-medium">
                                {t('activityDesc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-0 pr-2 pt-6">
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#18181b" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="name"
                                            stroke="#a1a1aa"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                        />
                                        <YAxis
                                            stroke="#a1a1aa"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                            dx={-10}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                            itemStyle={{ color: '#18181b', fontWeight: 600 }}
                                            cursor={{ stroke: '#e4e4e7', strokeWidth: 1 }}
                                        />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                        <Area type="monotone" dataKey="conversations" stroke="#18181b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorConv)" />
                                        <Area type="monotone" dataKey="engagement" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorEng)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RECENT ACTIVITY / ALERTS */}
                    <Card className="col-span-3 border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-bold text-zinc-900">{t('recentActivity')}</CardTitle>
                            <CardDescription className="text-zinc-500 font-medium">
                                {t('recentActivityDesc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-start group">
                                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 mr-4">
                                        <UserPlus className="h-4 w-4 text-emerald-600" />
                                        <span className="absolute top-0 right-0 -mr-1 -mt-1 flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white"></span>
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-zinc-900 leading-none group-hover:text-emerald-600 transition-colors">New Lead Qualified</p>
                                        <p className="text-xs text-zinc-500">
                                            Agent Oleg qualified a lead from Telegram.
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-zinc-400">Just now</div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 mr-4">
                                        <FileText className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-zinc-900 leading-none group-hover:text-blue-600 transition-colors">Knowledge Base Updated</p>
                                        <p className="text-xs text-zinc-500">
                                            "Pricing_Q4.pdf" finish processing.
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-zinc-400">2m ago</div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-50 border border-rose-100 mr-4">
                                        <Activity className="h-4 w-4 text-rose-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-zinc-900 leading-none group-hover:text-rose-600 transition-colors">High Latency Alert</p>
                                        <p className="text-xs text-zinc-500">
                                            Response time spiked to 4.5s on Whatsapp.
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-zinc-400">1h ago</div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 mr-4">
                                        <Zap className="h-4 w-4 text-zinc-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-zinc-900 leading-none group-hover:text-zinc-700 transition-colors">New Agent Created</p>
                                        <p className="text-xs text-zinc-500">
                                            User created "HR Assistant" agent.
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-zinc-400">3h ago</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    )
}
