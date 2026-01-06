"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Tag, Rocket, Lightbulb, DollarSign } from "lucide-react"

const features = [
    {
        icon: Tag,
        title: "Скидка 30%",
        description: "Пожизненная скидка для первых 100 клиентов.",
    },
    {
        icon: Rocket,
        title: "Приоритетная поддержка",
        description: "Быстрые ответы и ранний доступ к функциям.",
    },
    {
        icon: Lightbulb,
        title: "Влияние на продукт",
        description: "Голосуйте за фичи в Roadmap.",
    },
    {
        icon: DollarSign,
        title: "Реферальная программа",
        description: "30% от платежей приглашённых клиентов.",
    },
]

export default function ReferralSection() {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Email submitted:", email)
    }

    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="rounded-[2.5rem] overflow-hidden bg-zinc-900 relative isolate"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 lg:p-16">
                        {/* Left Column: Text + Form */}
                        <div className="flex flex-col justify-center gap-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                                    Станьте первыми
                                </h2>
                                <p className="text-xl text-zinc-400 leading-relaxed font-light">
                                    Первые 100 клиентов получат особые условия и пожизненную скидку 30%
                                </p>
                            </div>

                            {/* Email Form */}
                            <form onSubmit={handleSubmit} className="flex gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Ваш email"
                                    required
                                    className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-zinc-900 hover:bg-zinc-200 transition-colors"
                                >
                                    Забронировать
                                    <ArrowRight className="size-5" />
                                </button>
                            </form>
                        </div>

                        {/* Right Column: Benefits Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {features.map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors"
                                    >
                                        <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                                            <Icon className="size-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
