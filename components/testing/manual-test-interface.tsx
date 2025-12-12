"use client"

import * as React from "react"
import { Send, RotateCcw, MessageSquare } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatFeedback } from "@/components/agents/testing/chat-feedback"

export function ManualTestInterface() {
    const t = useTranslations('Testing');
    const [messages, setMessages] = React.useState([
        {
            id: 1,
            role: 'assistant',
            text: "Привет! Я Олег. Чем я могу помочь вам сегодня?",
            status: null as 'pass' | 'fail' | null
        }
    ])
    const [input, setInput] = React.useState("")
    const [isTyping, setIsTyping] = React.useState(false)

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg = { id: Date.now(), role: 'user', text: input, status: null }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        // Simulate response delay
        setTimeout(() => {
            setIsTyping(false)
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                text: "Это симулированный ответ для тестирования.",
                status: null
            }])
        }, 1000)
    }

    const markStatus = (msgIndex: number, status: 'pass' | 'fail') => {
        setMessages(prev => prev.map((msg, idx) => {
            if (idx === msgIndex) {
                return { ...msg, status }
            }
            return msg
        }))
    }

    return (
        <div className="flex flex-col h-full bg-white border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b bg-zinc-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-900">
                    <MessageSquare className="h-4 w-4 text-zinc-500" />
                    {t('manualSession')}
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-zinc-500" onClick={() => setMessages([])}>
                    <RotateCcw className="mr-2 h-3 w-3" />
                    {t('newSession')}
                </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4 bg-zinc-50/30">
                <div className="flex flex-col gap-6">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="h-8 w-8 mt-1 border">
                                {msg.role === 'assistant' ? (
                                    <AvatarImage src="/avatars/oleg.jpg" />
                                ) : (
                                    <AvatarFallback className="bg-zinc-900 text-white">Q</AvatarFallback>
                                )}
                                <AvatarFallback>{msg.role === 'assistant' ? 'AI' : 'Q'}</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col gap-1 max-w-[80%]">
                                <div className={`rounded-2xl p-3 text-sm ${msg.role === 'user'
                                    ? 'bg-zinc-900 text-white'
                                    : 'bg-white border shadow-sm text-zinc-900 group'
                                    }`}>
                                    {msg.text}
                                </div>

                                {/* QA Controls for AI responses */}
                                {msg.role === 'assistant' && (
                                    <div className="mt-1">
                                        <ChatFeedback messageId={msg.id.toString()} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
                <div className="relative">
                    <Textarea
                        placeholder={t('typeScenario')}
                        className="min-h-[80px] pr-12 resize-none rounded-xl border-zinc-200 bg-zinc-50 focus:bg-white"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSend()
                            }
                        }}
                    />
                    <Button
                        size="icon"
                        className="absolute bottom-2 right-2 h-8 w-8 rounded-lg bg-zinc-900 hover:bg-zinc-800"
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
