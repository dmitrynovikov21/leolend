"use client"

import { Send, Plus, Settings2, MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TelegramConnectionDialog } from "@/components/agents/telegram-connection-dialog"

export default function SourcesPage({ params }: { params: { agentId: string } }) {
    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-1xl font-bold tracking-tight text-zinc-900">Источники</h2>
                    <p className="text-sm text-zinc-500 mt-1">Управляйте подключенными каналами и источниками</p>
                </div>
                <Button variant="outline" size="sm" className="h-9 rounded-xl border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 shadow-sm">
                    <Plus className="mr-2 h-4 w-4" /> Добавить
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Telegram Card - Soft UI */}
                <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white hover:border-zinc-300/50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-200 group cursor-pointer rounded-2xl">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-[#0088cc]/10 group-hover:bg-[#0088cc]/20 transition-colors">
                                    <Send className="h-5 w-5" style={{ color: '#0088cc' }} />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-bold text-zinc-900">Telegram</CardTitle>
                                    <CardDescription className="text-xs font-medium text-zinc-500">Мессенджер</CardDescription>
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border border-emerald-100/50 rounded-lg font-bold text-[10px] px-2 h-6">
                                АКТИВЕН
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100/50">
                                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Bot Token</span>
                                <p className="font-mono text-xs truncate opacity-70 text-zinc-900">123456:ABC-DEF...</p>
                            </div>
                            <TelegramConnectionDialog>
                                <Button variant="ghost" size="sm" className="w-full h-9 rounded-xl text-xs font-medium text-zinc-600 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100">
                                    <Settings2 className="h-3 w-3 mr-2" /> Настроить
                                </Button>
                            </TelegramConnectionDialog>
                        </div>
                    </CardContent>
                </Card>

                {/* WhatsApp Card - Coming Soon */}
                <Card className="border border-zinc-100 shadow-none bg-zinc-50/30 rounded-2xl opacity-80 hover:opacity-100 transition-opacity">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-zinc-100 grayscale opacity-70">
                                    <MessageCircle className="h-5 w-5 text-zinc-500" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-bold text-zinc-500">WhatsApp</CardTitle>
                                    <CardDescription className="text-xs font-medium text-zinc-400">Business API</CardDescription>
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-zinc-100 text-zinc-500 border border-zinc-200 rounded-lg font-bold text-[10px] px-2 h-6">
                                СКОРО
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 rounded-xl bg-transparent border border-dashed border-zinc-200 text-center py-4">
                                <p className="text-xs text-zinc-400">Coming Soon</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
