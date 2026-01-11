"use client"

import { RoistatHeader } from "@/components/roistat/header"
import { RoistatFooter } from "@/components/roistat/footer"
import { motion } from "framer-motion"
import { Handshake, TrendingUp, Users, Zap, ArrowRight, CheckCircle2 } from "lucide-react"

export default function PartnersPage() {
    const benefits = [
        {
            icon: TrendingUp,
            title: "Дополнительный доход",
            desc: "Получайте комиссию за каждого приведённого клиента"
        },
        {
            icon: Users,
            title: "Поддержка партнёров",
            desc: "Персональный менеджер и материалы для продвижения"
        },
        {
            icon: Zap,
            title: "Быстрый старт",
            desc: "Начните зарабатывать уже через неделю после регистрации"
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
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Handshake className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#3d4f6f] mb-4">
                            Партнёрская программа
                        </h1>
                        <p className="text-lg text-[#6b7a90] max-w-2xl mx-auto">
                            Зарабатывайте вместе с LeoAgent. Рекомендуйте платформу клиентам и получайте вознаграждение.
                        </p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {benefits.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="p-8 bg-zinc-50 rounded-2xl border border-zinc-100"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-[#3d4f6f] mb-2">{item.title}</h3>
                                <p className="text-[#6b7a90]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Готовы стать партнёром?
                        </h2>
                        <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                            Оставьте заявку и мы свяжемся с вами для обсуждения условий сотрудничества
                        </p>
                        <a
                            href="mailto:partners@leoagent.ru"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                        >
                            Стать партнёром
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </main>

            <RoistatFooter />
        </div>
    )
}
