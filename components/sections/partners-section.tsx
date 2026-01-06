"use client"

import { motion } from "framer-motion"
import { ArrowRight, TrendingUp } from "lucide-react"

export default function PartnersSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="rounded-[2.5rem] bg-gradient-to-r from-violet-50 to-blue-50 border border-blue-100 p-8 md:p-12 overflow-hidden relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        {/* Text Content */}
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold uppercase tracking-wider mb-6">
                                Партнерская программа
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                                Зарабатывайте с LeoAgent
                            </h2>
                            <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                                Рекомендуйте нас и получайте <strong className="text-blue-600">30% пожизненно</strong> с каждого платежа приглашенного клиента. Выплаты автоматически каждый месяц.
                            </p>
                            <button className="h-12 px-8 rounded-xl bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-colors inline-flex items-center gap-2">
                                Стать партнером
                                <ArrowRight className="size-4" />
                            </button>
                        </div>

                        {/* Visual - Abstract Dashboard */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-6 md:p-8 max-w-md mx-auto relative z-10"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="text-sm text-zinc-500 mb-1">Доход за месяц</div>
                                        <div className="text-3xl font-bold text-zinc-900">154 000 ₽</div>
                                    </div>
                                    <div className="size-10 rounded-full bg-green-50 flex items-center justify-center">
                                        <TrendingUp className="size-5 text-green-600" />
                                    </div>
                                </div>

                                {/* Fake Graph */}
                                <div className="h-32 flex items-end justify-between gap-2 overflow-hidden">
                                    {[40, 65, 45, 80, 55, 90, 100].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.1, duration: 0.5 }}
                                            className="w-full bg-blue-500/10 rounded-t-sm relative group"
                                        >
                                            <div className="absolute bottom-0 left-0 right-0 top-2 bg-blue-500 rounded-t-sm opacity-20 group-hover:opacity-100 transition-opacity" />
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 text-xs text-zinc-400 font-mono">
                                    <span>01.05</span>
                                    <span>15.05</span>
                                    <span>31.05</span>
                                </div>
                            </motion.div>

                            {/* Decor Elements */}
                            <div className="absolute -top-10 -right-10 size-64 bg-violet-400/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 size-64 bg-blue-400/20 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
