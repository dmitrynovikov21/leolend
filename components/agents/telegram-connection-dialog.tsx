"use client"

import { useState } from "react"
import { Send, CheckCircle2, Shield, Bot as BotIcon, Key, Loader2, Copy } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface TelegramConnectionDialogProps {
    children: React.ReactNode
}

export function TelegramConnectionDialog({ children }: TelegramConnectionDialogProps) {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("")
    const [step, setStep] = useState<"input" | "success">("input")

    const handleConnect = async () => {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            setStep("success")
        }, 1500)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden gap-0 rounded-2xl bg-white border-zinc-200 shadow-2xl">
                <div className="grid md:grid-cols-5 h-full">
                    {/* Left Side: Bot Preview / Info */}
                    <div className="md:col-span-2 bg-zinc-50 border-r border-zinc-100 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-8 w-8 rounded-lg bg-[#0088cc] flex items-center justify-center shadow-sm shadow-blue-200">
                                    <Send className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-bold text-zinc-900 tracking-tight">Telegram Bot</span>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center">
                                            <BotIcon className="h-5 w-5 text-zinc-400" />
                                        </div>
                                        <div>
                                            <div className="h-3 w-24 bg-zinc-100 rounded mb-1.5" />
                                            <div className="h-2 w-16 bg-zinc-50 rounded" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-zinc-50 rounded" />
                                        <div className="h-2 w-3/4 bg-zinc-50 rounded" />
                                    </div>
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    Подключите вашего агента к Telegram, чтобы автоматически отвечать на сообщения пользователей 24/7.
                                </p>
                            </div>
                        </div>

                        <div className="text-[10px] text-zinc-400 font-medium">
                            <div className="flex items-center gap-1 mb-1">
                                <Shield className="h-3 w-3" />
                                Безопасное соединение
                            </div>
                            End-to-end encryption via Telegram API
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="md:col-span-3 p-6 flex flex-col">
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-xl font-bold text-zinc-900">Настройка подключения</DialogTitle>
                            <DialogDescription className="text-zinc-500">
                                Введите токен вашего бота для активации.
                            </DialogDescription>
                        </DialogHeader>

                        {step === "input" ? (
                            <div className="space-y-6 flex-1">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="token" className="text-sm font-semibold text-zinc-900">Bot Token</Label>
                                        <div className="relative">
                                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                            <Input
                                                id="token"
                                                placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                                                className="pl-9 font-mono text-sm h-11 bg-zinc-50 border-zinc-200 focus:bg-white focus:ring-zinc-200 rounded-xl transition-all"
                                                value={token}
                                                onChange={(e) => setToken(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-[11px] text-zinc-400 px-1">
                                            Этот токен можно получить у <a href="#" className="underline decoration-zinc-300 hover:text-zinc-600">@BotFather</a> в Telegram.
                                        </p>
                                    </div>

                                    <Card className="p-3 bg-blue-50/50 border-blue-100 rounded-xl space-y-2">
                                        <h4 className="text-xs font-semibold text-blue-900">Как получить токен?</h4>
                                        <ol className="list-decimal list-inside text-[11px] text-blue-700 space-y-1">
                                            <li>Откройте @BotFather в Telegram</li>
                                            <li>Отправьте команду /newbot</li>
                                            <li>Скопируйте полученный API Token</li>
                                        </ol>
                                    </Card>
                                </div>

                                <div className="mt-auto pt-4 flex justify-end gap-2">
                                    <Button variant="ghost" className="rounded-xl hover:bg-zinc-100 text-zinc-600">Отмена</Button>
                                    <Button
                                        className="rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white shadow-sm shadow-blue-200"
                                        onClick={handleConnect}
                                        disabled={!token || loading}
                                    >
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {loading ? "Подключение..." : "Подключить Telegram"}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center flex-1 py-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900">Успешно подключено!</h3>
                                    <p className="text-sm text-zinc-500 max-w-[250px] mx-auto mt-1">
                                        Ваш агент теперь отвечает в Telegram. Вы можете настроить поведение в соседней вкладке.
                                    </p>
                                </div>
                                <div className="w-full bg-zinc-50 p-4 rounded-xl border border-zinc-100 flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-200" />
                                        <div className="text-left">
                                            <div className="text-sm font-semibold text-zinc-900">MySupportBot</div>
                                            <div className="text-[10px] text-zinc-500">@mysupport_bot</div>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 h-6 px-2 text-[10px] font-bold tracking-wide rounded-lg">ACTIVE</Badge>
                                </div>

                                <Button className="w-full rounded-xl mt-4" onClick={() => setStep("input")}>
                                    Закрыть
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
