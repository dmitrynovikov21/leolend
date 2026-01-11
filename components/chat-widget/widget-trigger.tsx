"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

interface WidgetTriggerProps {
    isOpen: boolean
    toggle: () => void
}

export function WidgetTrigger({ isOpen, toggle }: WidgetTriggerProps) {
    return (
        <button
            onClick={toggle}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0077FF] text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50"
            aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
        >
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <X className="h-6 w-6" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                    >
                        <MessageCircle className="h-7 w-7" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#27C93F] border-2 border-[#0077FF]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}
