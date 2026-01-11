"use client"

import { useState } from "react"
import { Send, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface SubscribeModalProps {
    isOpen: boolean
    onClose: () => void
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSuccess(true)
            setTimeout(() => {
                onClose()
                setIsSuccess(false)
                setEmail("")
            }, 2000)
        }, 1000)
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            >
                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <Image
                                src="/leoold.png"
                                alt="Leo"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain"
                            />
                        </div>

                        {isSuccess ? (
                            <div className="py-8">
                                <h3 className="text-2xl font-bold text-[#3d4f6f] mb-2">Спасибо!</h3>
                                <p className="text-[#6b7a90]">
                                    Мы сообщим вам о запуске и новых функциях.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-[#3d4f6f] mb-3">
                                    Будьте в курсе обновлений
                                </h3>
                                <p className="text-[#6b7a90] mb-8 leading-relaxed">
                                    Оставьте свой email, чтобы первыми узнать о новых возможностях платформы и получить доступ к ранним функциям.
                                </p>

                                <form onSubmit={handleSubmit} className="w-full space-y-4">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Введите ваш email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-[#3d4f6f] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077FF]/20 focus:border-[#0077FF] transition-all"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 bg-[#0077FF] hover:bg-[#0060cc] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <span>Подписаться</span>
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                                <p className="mt-4 text-xs text-gray-400">
                                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                                </p>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
