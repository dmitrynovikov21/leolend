"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Minimize2, Paperclip, ImageIcon, ChevronDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
// Import useChat from Vercel AI SDK
import { useChat } from "ai/react"

interface ChatWindowProps {
    isOpen: boolean
    onClose: () => void
}

const SUGGESTIONS = [
    "Как начать?",
    "Цены",
    "Поддержка",
    "Демо",
    "Контакты"
]

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
    // UI State for file handling & suggestions
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(true)

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Vercel AI SDK Hook
    const { messages, input, setInput, append, isLoading } = useChat({
        api: "/api/chat",
        initialMessages: [
            {
                id: "welcome",
                role: "assistant",
                content: "Привет! 👋 Опишите задачу — покажу, как LeoAgent решит её.",
                createdAt: new Date(),
            }
        ],
        onError: (e) => {
            console.error("Chat Error:", e)
        }
    })

    // Scroll to bottom when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    // Send logic
    const handleSend = async (text: string = input || "") => {
        if (!text.trim() && !selectedFile) return

        // In a real app we'd upload the file and send the URL or base64.
        // For this MVP we just trigger the text chat.
        // If we wanted to send the image to Claude, we'd add experimental_attachments.

        await append({
            role: "user",
            content: text,
        })

        setSelectedFile(null)
        // setInput is handled by append? No, we might need to clear it if we passed specific text (like suggestion)
        // But if we used 'input' state, useChat clears it on submit usually? 
        // Note: append() does NOT automatically clear 'input' state if we passed a custom message.
        // But if we call it with the current input value... let's just clear it to be safe.
        // Actually useChat's handleSubmit handles this, but we are building a custom UI.
        // So we manual clear:
        if (text === input) {
            setInput("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    // File Handlers
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            if (file.type.startsWith('image/')) {
                setSelectedFile(file)
            }
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl border border-zinc-100 flex flex-col overflow-hidden z-40 font-sans"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-white text-[#3d4f6f] border-b border-zinc-100">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-10 w-10 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="/leoold.png"
                                        alt="LeoAgent"
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover rounded-full"
                                    />
                                </div>
                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#27C93F] border-2 border-white rounded-full" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[16px] leading-tight">LeoAgent AI</h3>
                                <p className="text-xs text-[#0077FF] opacity-90 font-medium">Онлайн</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={onClose}
                                className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400 hover:text-zinc-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 scrollbar-thin scrollbar-thumb-zinc-200">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex w-full",
                                    msg.role === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                <div className={cn(
                                    "flex flex-col gap-1 max-w-[85%]",
                                    msg.role === "user" ? "items-end" : "items-start"
                                )}>
                                    <div
                                        className={cn(
                                            "p-3.5 text-[14px] leading-relaxed shadow-sm whitespace-pre-wrap",
                                            msg.role === "user"
                                                ? "bg-[#0077FF] text-white rounded-2xl rounded-tr-sm"
                                                : "bg-white text-zinc-800 border border-zinc-100 rounded-2xl rounded-tl-sm"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                    <span className="text-[10px] text-zinc-400 px-1 opacity-70">
                                        {msg.createdAt
                                            ? msg.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        }
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-[#0077FF] rounded-2xl rounded-tl-sm p-4 shadow-sm opacity-80">
                                    <div className="flex gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer / Input */}
                    <div
                        className={cn(
                            "p-4 bg-white border-t border-zinc-100 transition-colors",
                            isDragOver && "bg-blue-50 border-blue-200 border-dashed"
                        )}
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                    >
                        {/* Suggestions Toggle */}
                        {messages.length < 5 && (
                            <div className="mb-3">
                                <button
                                    onClick={() => setShowSuggestions(!showSuggestions)}
                                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 mb-2 transition-colors font-medium ml-1"
                                >
                                    {showSuggestions ? "Скрыть подсказки" : "Показать подсказки"}
                                    <ChevronDown className={cn("w-3 h-3 transition-transform", showSuggestions ? "rotate-0" : "-rotate-90")} />
                                </button>

                                <AnimatePresence>
                                    {showSuggestions && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="flex flex-wrap gap-2 overflow-hidden"
                                        >
                                            {SUGGESTIONS.map((sug) => (
                                                <button
                                                    key={sug}
                                                    onClick={() => handleSend(sug)}
                                                    className="px-3 py-1.5 bg-[#1e293b] text-white text-[13px] rounded-2xl hover:bg-[#334155] transition-colors border border-[#334155] shadow-sm"
                                                >
                                                    {sug}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Selected File Preview - Visual Only */}
                        {selectedFile && (
                            <div className="flex items-center gap-2 mb-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center text-blue-500">
                                    <ImageIcon className="w-4 h-4" />
                                </div>
                                <span className="text-xs text-blue-700 font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                                <button onClick={() => setSelectedFile(null)} className="ml-auto text-blue-400 hover:text-blue-600">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <div className="relative flex items-center bg-[#1e293b]/5 border border-zinc-200 rounded-[20px] px-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={isDragOver ? "Отпустите файл..." : "Напишите сообщение..."}
                                    className="flex-1 bg-transparent h-12 px-3 text-sm text-zinc-800 placeholder:text-zinc-500 focus:outline-none"
                                />
                                <div className="flex items-center gap-1 pr-1">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 text-zinc-400 hover:text-[#0077FF] transition-colors rounded-full hover:bg-white"
                                        title="Прикрепить файл"
                                    >
                                        <Paperclip className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={(!(input || "").trim() && !selectedFile) || isLoading}
                                        className="p-2 bg-[#0077FF] text-white rounded-full hover:bg-[#0060cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm w-9 h-9 flex items-center justify-center"
                                    >
                                        <Send className="h-4 w-4 ml-0.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-center mt-1">
                                <span className="text-[10px] text-zinc-400 font-medium">
                                    Работает на базе <span className="text-blue-500">LeoAgent AI</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
