"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
    {
        question: "Когда будет доступна платформа?",
        answer: "Запускаем ранний доступ в феврале 2026. Первые пользователи получат скидку 30%.",
    },
    {
        question: "Сколько стоит?",
        answer: "От 0₽ на старте. Первые 100 клиентов получают скидку 30% навсегда.",
    },
    {
        question: "Нужны технические знания?",
        answer: "Нет. Достаточно загрузить документы и указать роль. Любой менеджер справится за 5 минут.",
    },
    {
        question: "Как гарантируется точность?",
        answer: "Используем RAG-технологию — агент отвечает строго по базе знаний.",
    },
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
                            Вопросы
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 transition-colors"
                                >
                                    <span className="font-semibold text-lg text-zinc-900 pr-8">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`size-6 text-zinc-400 shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: "auto" }}
                                            exit={{ height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-zinc-500 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
