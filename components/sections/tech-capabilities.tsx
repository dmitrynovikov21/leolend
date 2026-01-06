"use client"

import { motion } from "framer-motion"
import { FileText, Zap, BarChart3, Globe } from "lucide-react"

const capabilities = [
    {
        icon: FileText,
        title: "Мультиформатность",
        description: "PDF, Word, Excel, PowerPoint, текстовые файлы.",
    },
    {
        icon: Zap,
        title: "Интеграции",
        description: "Telegram, WhatsApp, Bitrix24, AmoCRM, API.",
    },
    {
        icon: BarChart3,
        title: "Аналитика",
        description: "Логи диалогов и оценка качества ответов.",
    },
    {
        icon: Globe,
        title: "Экспорт",
        description: "Готовый виджет для вашего сайта.",
    },
]

export default function TechCapabilities() {
    return (
        <section className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                        Возможности
                    </h2>
                </div>

                {/* Bento Grid 2x2 */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {capabilities.map((capability, index) => {
                        const Icon = capability.icon
                        return (
                            <motion.div
                                key={capability.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-b from-white to-zinc-50 rounded-3xl border border-zinc-200 shadow-sm p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="h-12 w-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6">
                                    <Icon className="size-6 text-zinc-700" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-3">
                                    {capability.title}
                                </h3>
                                <p className="text-zinc-500 leading-relaxed">
                                    {capability.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
