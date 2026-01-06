"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Message {
    id: number
    text: string
    isBot: boolean
    delay: number
}

const messages: Message[] = [
    { id: 1, text: "Как оформить отпуск?", isBot: false, delay: 500 },
    { id: 2, text: "Заполните форму Т-6. Скачать можно здесь →", isBot: true, delay: 2000 },
    { id: 3, text: "А сколько дней осталось?", isBot: false, delay: 4000 },
    { id: 4, text: "У вас 14 дней. Планируете на август?", isBot: true, delay: 5500 },
    { id: 5, text: "Да, с 1-го числа.", isBot: false, delay: 7000 },
    { id: 6, text: "Отлично! Заявление сформировано. Отправить HR?", isBot: true, delay: 8500 },
]

export function ChatDemo() {
    const [visibleMessages, setVisibleMessages] = useState<number[]>([])
    const [isTyping, setIsTyping] = useState(false)
    const [typingIsBot, setTypingIsBot] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = []

        messages.forEach((msg) => {
            // Start typing 1s before message appears (if delay is long enough)
            if (msg.delay > 800) {
                const typingTimeout = setTimeout(() => {
                    setIsTyping(true)
                    setTypingIsBot(msg.isBot)
                }, msg.delay - 1000)
                timeouts.push(typingTimeout)
            }

            // Show message
            const msgTimeout = setTimeout(() => {
                setIsTyping(false)
                setVisibleMessages((prev) => [...prev, msg.id])
            }, msg.delay)
            timeouts.push(msgTimeout)
        })

        return () => timeouts.forEach(clearTimeout)
    }, [])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [visibleMessages, isTyping])

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-zinc-200">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
                <div className="flex items-center justify-center">
                    <span className="text-2xl">🤑</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-zinc-900">Leo Agent</p>
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-xs text-zinc-500 font-medium">онлайн</p>
                    </div>
                </div>
            </div>

            {/* Messages Container - Fixed Height */}
            <div
                ref={scrollRef}
                className="p-6 h-[440px] overflow-y-auto space-y-4 scroll-smooth bg-white"
            >
                <AnimatePresence mode="popLayout">
                    {messages.filter(m => visibleMessages.includes(m.id)).map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            layout
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                        >
                            <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-[13px] leading-relaxed shadow-sm ${msg.isBot
                                ? 'bg-zinc-100 text-zinc-800 rounded-tl-sm'
                                : 'bg-zinc-900 text-white rounded-tr-sm'
                                }`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`flex ${typingIsBot ? 'justify-start' : 'justify-end'}`}
                        >
                            <div className={`rounded-2xl px-4 py-3 flex gap-1 items-center shadow-sm ${typingIsBot
                                ? 'bg-zinc-50 border border-zinc-100 rounded-tl-sm'
                                : 'bg-zinc-900 rounded-tr-sm'
                                }`}>
                                <span className={`size-1.5 rounded-full animate-bounce ${typingIsBot ? 'bg-zinc-400' : 'bg-zinc-500'}`} style={{ animationDelay: '0s' }} />
                                <span className={`size-1.5 rounded-full animate-bounce ${typingIsBot ? 'bg-zinc-400' : 'bg-zinc-500'}`} style={{ animationDelay: '0.15s' }} />
                                <span className={`size-1.5 rounded-full animate-bounce ${typingIsBot ? 'bg-zinc-400' : 'bg-zinc-500'}`} style={{ animationDelay: '0.3s' }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
