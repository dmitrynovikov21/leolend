"use client"

import * as React from "react"
import { Send, RotateCcw, MessageSquare, ThumbsUp, ThumbsDown, Bot, User } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
// Import EmojiAvatar for better visuals
import { EmojiAvatar } from "@/components/shared/emoji-avatar"
import { useUserPreferences } from "@/components/providers/user-preferences-provider"
import { toast } from "sonner" // For Like feedback

interface ManualTestInterfaceProps {
    onFeedbackSubmit: (text: string) => void
}

export function ManualTestInterface({ onFeedbackSubmit }: ManualTestInterfaceProps) {
    const t = useTranslations('Testing');
    const { avatar: userEmoji } = useUserPreferences(); // Get user's preferred emoji (mapped from avatar)

    const [messages, setMessages] = React.useState([
        {
            id: 1,
            role: 'assistant',
            text: "Привет! Я Олег. Чем я могу помочь вам сегодня?",
            feedback: null as 'like' | 'dislike' | null
        }
    ])
    const [input, setInput] = React.useState("")
    const [isTyping, setIsTyping] = React.useState(false)

    // Feedback Dialog State
    const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false)
    const [feedbackType, setFeedbackType] = React.useState<'like' | 'dislike'>('dislike')
    const [feedbackText, setFeedbackText] = React.useState("")
    const [activeMessageId, setActiveMessageId] = React.useState<number | null>(null)

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg = { id: Date.now(), role: 'user', text: input, feedback: null }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        // Simulate response delay
        setTimeout(() => {
            setIsTyping(false)
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                text: "Это симулированный ответ для тестирования. Попробуйте оценить его, чтобы проверить механизм обратной связи.",
                feedback: null
            }])
        }, 1000)
    }

    const openFeedbackDialog = (msgId: number, type: 'like' | 'dislike') => {
        setActiveMessageId(msgId)
        setFeedbackType(type)
        setFeedbackText("") // Clear text
        setIsFeedbackOpen(true)
    }

    const submitFeedback = () => {
        if (feedbackType === 'dislike' && feedbackText.trim()) {
            // Send to Queue
            onFeedbackSubmit(feedbackText)
        } else if (feedbackType === 'like') {
            // Just local visual feedback or toast
            if (feedbackText.trim()) {
                toast.success("Positive feedback recorded", { description: "Thank you for helping us improve!" })
            }
        }

        // Mark message status visually
        setMessages(prev => prev.map(msg =>
            msg.id === activeMessageId ? { ...msg, feedback: feedbackType } : msg
        ))

        setIsFeedbackOpen(false)
    }

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header - Minimalist */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-900">
                    <MessageSquare className="h-4 w-4 text-zinc-400" />
                    {t('manualSession')}
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors" onClick={() => setMessages([])}>
                    <RotateCcw className="mr-2 h-3 w-3" />
                    {t('newSession')}
                </Button>
            </div>

            {/* Chat Area - Clean */}
            <ScrollArea className="flex-1 p-6 bg-white">
                <div className="flex flex-col gap-6">
                    {messages.map((msg, i) => (
                        <div key={msg.id} className={`group flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar Logic */}
                            {msg.role === 'assistant' ? (
                                <div className="mt-1">
                                    <EmojiAvatar
                                        value="🤖"
                                        fallbackIcon={Bot}
                                        className="mt-1"
                                    />
                                </div>
                            ) : (
                                <div className="mt-1">
                                    <EmojiAvatar
                                        value={userEmoji || "😎"}
                                        fallbackIcon={User}
                                        className="mt-1"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col gap-1 max-w-[80%]">
                                <div className={cn(
                                    "px-4 py-3 text-[14px] leading-relaxed shadow-sm",
                                    msg.role === 'user'
                                        ? "bg-zinc-900 text-white rounded-[20px] rounded-tr-sm"
                                        : "bg-white border border-zinc-100 text-zinc-800 rounded-[20px] rounded-tl-sm"
                                )}>
                                    {msg.text}
                                </div>

                                {/* Feedback Actions (Only for Assistant) */}
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn("h-7 w-7 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-green-600 transition-colors", msg.feedback === 'like' && "text-green-600 bg-green-50")}
                                            onClick={() => openFeedbackDialog(msg.id, 'like')}
                                        >
                                            <ThumbsUp className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn("h-7 w-7 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-red-600 transition-colors", msg.feedback === 'dislike' && "text-red-600 bg-red-50")}
                                            onClick={() => openFeedbackDialog(msg.id, 'dislike')}
                                        >
                                            <ThumbsDown className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-4">
                            <EmojiAvatar
                                value="🤖"
                                className="mt-1"
                            />
                            <div className="bg-white border border-zinc-100 rounded-[20px] rounded-tl-sm p-4 shadow-sm w-20 flex items-center justify-center">
                                <span className="flex gap-1.5">
                                    <span className="animate-bounce delay-0 h-1.5 w-1.5 bg-zinc-300 rounded-full"></span>
                                    <span className="animate-bounce delay-150 h-1.5 w-1.5 bg-zinc-300 rounded-full"></span>
                                    <span className="animate-bounce delay-300 h-1.5 w-1.5 bg-zinc-300 rounded-full"></span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input Area - Carved Style */}
            <div className="p-4 bg-white">
                <div className="relative group">
                    <Textarea
                        placeholder={t('typeScenario')}
                        className="min-h-[56px] py-4 pl-4 pr-14 resize-none rounded-2xl bg-zinc-50 border-transparent focus:border-transparent ring-0 focus:ring-1 focus:ring-zinc-200 text-zinc-800 placeholder:text-zinc-400 transition-all font-medium text-sm shadow-inner"
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
                        variant="ghost"
                        className="absolute bottom-2.5 right-2.5 h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm text-zinc-400 hover:text-zinc-900 transition-all"
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Combined Feedback Dialog */}
            <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-2xl p-6 border-zinc-100 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-zinc-900">
                            {feedbackType === 'like' ? 'What did you like?' : 'What went wrong?'}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-500">
                            {feedbackType === 'like'
                                ? 'Let us know what the agent did well so we can reinforce this behavior.'
                                : 'Describe the issue (e.g., incorrect facts, tone, hallucination) to add it to the improvement queue.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="feedback-text" className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                {feedbackType === 'like' ? 'Feedback (Optional)' : 'Issue Description'}
                            </Label>
                            <Textarea
                                id="feedback-text"
                                placeholder={feedbackType === 'like' ? "Great tone, accurate answer..." : "Incorrect pricing, rude tone..."}
                                className="h-32 resize-none rounded-xl bg-zinc-50 border-zinc-200 focus:border-zinc-300 focus:ring-0"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsFeedbackOpen(false)} className="rounded-xl border-zinc-200 h-10 font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900">Cancel</Button>
                        <Button onClick={submitFeedback} className="rounded-xl h-10 bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm font-medium">
                            {feedbackType === 'like' ? 'Send Praise' : 'Report Issue'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
