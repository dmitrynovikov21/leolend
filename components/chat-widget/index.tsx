"use client"

import { useState, useEffect } from "react"
import { WidgetTrigger } from "./widget-trigger"
import { ChatWindow } from "./chat-window"

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleOpenEvent = () => setIsOpen(true)
        window.addEventListener('open-chat-widget', handleOpenEvent)
        return () => window.removeEventListener('open-chat-widget', handleOpenEvent)
    }, [])

    const toggle = () => setIsOpen(prev => !prev)

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <ChatWindow
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="mt-4">
                <WidgetTrigger
                    isOpen={isOpen}
                    toggle={toggle}
                />
            </div>
        </div>
    )
}
