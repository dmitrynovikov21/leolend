"use client"

import { RoistatHeader } from "@/components/roistat/header"
import { RoistatFooter } from "@/components/roistat/footer"
import { motion } from "framer-motion"
import { BookOpen, FileText, Code, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
    const sections = [
        {
            icon: Zap,
            title: "Быстрый старт",
            desc: "Создайте своего первого ИИ-агента за 10 минут",
            href: "/ru/docs/quickstart"
        },
        {
            icon: FileText,
            title: "Загрузка документов",
            desc: "Как добавить базу знаний для обучения агента",
            href: "/ru/docs/documents"
        },
        {
            icon: Code,
            title: "API и интеграции",
            desc: "Подключение агента к сайту, Telegram и CRM",
            href: "/ru/docs/integrations"
        },
        {
            icon: BookOpen,
            title: "Руководства",
            desc: "Пошаговые инструкции для разных сценариев",
            href: "/ru/guides"
        },
    ]

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <RoistatHeader />

            <main className="flex-1 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#3d4f6f] mb-4">
                            Документация
                        </h1>
                        <p className="text-lg text-[#6b7a90] max-w-2xl mx-auto">
                            Всё, что нужно для настройки и использования LeoAgent
                        </p>
                    </motion.div>

                    {/* Sections Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {sections.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    className="block p-8 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-blue-200 hover:shadow-lg transition-all group"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                                        <item.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#3d4f6f] mb-2 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#6b7a90] mb-4">{item.desc}</p>
                                    <span className="inline-flex items-center text-blue-600 font-semibold text-sm">
                                        Перейти
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Help CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-zinc-50 rounded-2xl p-8 text-center border border-zinc-100"
                    >
                        <h2 className="text-2xl font-bold text-[#3d4f6f] mb-2">
                            Не нашли ответ?
                        </h2>
                        <p className="text-[#6b7a90] mb-6">
                            Напишите нам и мы поможем разобраться
                        </p>
                        <a
                            href="mailto:support@leoagent.ru"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Написать в поддержку
                        </a>
                    </motion.div>
                </div>
            </main>

            <RoistatFooter />
        </div>
    )
}
