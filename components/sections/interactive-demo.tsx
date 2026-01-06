"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import MaxWidthWrapper from "@/components/shared/max-width-wrapper"

export default function InteractiveDemo() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<Array<{ text: string, isBot: boolean }>>([])

    const handleSend = () => {
        if (!input.trim()) return
        setMessages([...messages,
        { text: input, isBot: false },
        { text: "Это демо-режим. Полнофункциональный агент доступен после регистрации.", isBot: true }
        ])
        setInput("")
    }

    return (
        <section id="demo" className="py-24 bg-neutral-50">
            <MaxWidthWrapper>
                <div className="text-center mb-12">
                    <h2 className="font-bold text-3xl sm:text-4xl text-black mb-4">
                        Проверьте прямо сейчас
                    </h2>
                    <p className="text-neutral-500">
                        Задайте вопрос нашему Leo-агенту по базе знаний этого сайта
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                        <div className="min-h-[200px] max-h-[300px] overflow-y-auto mb-4 space-y-3">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.isBot ? '' : 'justify-end'}`}>
                                    <div className={`rounded-2xl px-4 py-2 text-sm max-w-[80%] ${msg.isBot ? 'bg-neutral-100 text-black' : 'bg-black text-white'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Введите ваш вопрос..."
                                className="flex-1 rounded-full border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:border-neutral-400"
                            />
                            <button
                                onClick={handleSend}
                                className="flex items-center justify-center size-10 rounded-full bg-black text-white transition-transform active:scale-[0.98] hover:bg-neutral-800"
                            >
                                <Send className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}
