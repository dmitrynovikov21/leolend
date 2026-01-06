"use client"

import { motion } from "framer-motion"
import { FileSearch, Code2, MessageCircle } from "lucide-react"

const features = [
    {
        title: "RAG: База знаний на ваших данных",
        description: "Забудьте о галлюцинациях. Агент ищет ответы строго в ваших документах.",
        icon: FileSearch,
        size: "large",
        style: "light",
    },
    {
        title: "GPT / Claude / Grok",
        description: "Выбирайте модель. Настраивайте температуру.",
        code: "> SYSTEM: You are a sales manager...",
        icon: Code2,
        size: "small",
        style: "dark",
    },
    {
        title: "Омниканальность 360°",
        description: "Подключите WhatsApp, Telegram, Instagram в один клик.",
        icon: MessageCircle,
        size: "wide",
        style: "light",
    },
]

export default function BentoGrid() {
    return (
        <section className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
                            Больше, чем просто чат-бот
                        </h2>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1: Large White - RAG */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="md:row-span-2 bg-white rounded-3xl border border-zinc-200 shadow-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 group"
                        >
                            <div className="h-12 w-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-zinc-900">
                                <FileSearch className="size-6 text-zinc-900 transition-colors duration-300 group-hover:text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-zinc-900 mb-4">
                                {features[0].title}
                            </h3>
                            <p className="text-zinc-500 leading-relaxed">
                                {features[0].description}
                            </p>
                        </motion.div>

                        {/* Card 2: Dark - Models */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900 text-white rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-zinc-800"
                        >
                            <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 border border-zinc-700">
                                <Code2 className="size-6 text-zinc-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                {features[1].title}
                            </h3>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                {features[1].description}
                            </p>
                            <div className="bg-zinc-950 rounded-lg p-3 font-mono text-xs text-zinc-300 border border-zinc-800">
                                {features[1].code}
                            </div>
                        </motion.div>

                        {/* Card 3: Wide - Omnichannel */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="h-12 w-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-zinc-900">
                                        <MessageCircle className="size-6 text-zinc-900 transition-colors duration-300 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                                        {features[2].title}
                                    </h3>
                                    <p className="text-zinc-500 leading-relaxed">
                                        {features[2].description}
                                    </p>
                                </div>
                                <div className="flex gap-3 ml-6 self-center">
                                    {['💬', '📱', '📷'].map((emoji, i) => (
                                        <div key={i} className="size-10 rounded-full bg-zinc-100 flex items-center justify-center text-xl">
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
