"use client"

import { motion } from "framer-motion"
import { FileText, Check, ChevronDown, CheckCircle2, Bot, MessageCircle, Globe, Database, Shield } from "lucide-react"

export default function HowItWorks() {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
                            4 шага до запуска
                        </h2>
                    </div>

                    {/* Animated Beam Background */}
                    <div className="hidden lg:block absolute top-[40%] left-0 right-0 h-[1px] bg-zinc-100 -z-10 overflow-hidden">
                        <motion.div
                            className="w-1/2 h-full bg-gradient-to-r from-transparent via-zinc-400 to-transparent blur-[1px]"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        {/* Step 1: Define Role (Select Mockup) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative h-80 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-500 overflow-hidden flex flex-col"
                        >
                            <div className="h-40 shrink-0 bg-zinc-50/50 flex items-center justify-center relative border-b border-zinc-100 overflow-hidden">
                                <div className="flex flex-col gap-3 w-48 group-hover:scale-105 transition-transform duration-500">
                                    {/* Inactive Item */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-white border border-zinc-200/60 rounded-xl opacity-60">
                                        <span className="text-sm font-medium text-zinc-400">HR-ассистент</span>
                                    </div>
                                    {/* Active Item */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-white border border-zinc-900 rounded-xl shadow-sm relative">
                                        <span className="text-sm font-medium text-zinc-900">Техподдержка</span>
                                        <div className="size-5 rounded-full bg-zinc-900 flex items-center justify-center">
                                            <Check className="size-3 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 pt-5">
                                <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md mb-3">Шаг 01</span>
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">Определите роль</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">Выберите шаблон: поддержка, HR, продажи или создайте своего.</p>
                            </div>
                        </motion.div>

                        {/* Step 2: Upload Docs (File Card) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative h-80 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-500 overflow-hidden flex flex-col"
                        >
                            <div className="h-40 shrink-0 bg-zinc-50/50 flex flex-col items-center justify-center relative border-b border-zinc-100">
                                <div className="w-56 bg-white rounded-xl border border-zinc-200 p-4 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-zinc-50 rounded-lg border border-zinc-100">
                                            <FileText className="size-6 text-zinc-400" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-zinc-700">база_знаний.pdf</div>
                                            <div className="text-[10px] text-zinc-400 font-mono">2.4 MB</div>
                                        </div>
                                    </div>
                                    {/* Progress */}
                                    <div className="space-y-1.5">
                                        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-zinc-900"
                                                initial={{ width: "10%" }}
                                                whileInView={{ width: "98%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                                            <span>обработка...</span>
                                            <span>98%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 pt-5">
                                <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md mb-3">Шаг 02</span>
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">Загрузите документы</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">PDF, Word, Excel. Агент обучится на них за минуту.</p>
                            </div>
                        </motion.div>

                        {/* Step 3: Verify Quality (Shield) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group relative h-80 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-500 overflow-hidden flex flex-col"
                        >
                            <div className="h-40 shrink-0 bg-zinc-50/50 flex flex-col items-center justify-center relative border-b border-zinc-100 px-4">
                                <div className="flex flex-col items-center gap-3 group-hover:scale-110 transition-transform duration-500">
                                    <div className="relative">
                                        <Shield className="size-12 text-zinc-200 stroke-[1.5]" />
                                        <div className="absolute inset-0 flex items-center justify-center pt-1">
                                            <Check className="size-5 text-zinc-900 stroke-[3]" />
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-white rounded-full border border-zinc-200 shadow-sm">
                                        <span className="text-xs font-mono font-medium text-zinc-600">ОЦЕНКА: 100%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 pt-5">
                                <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md mb-3">Шаг 03</span>
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">Проверьте качество</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">Агент найдет противоречия и уточнит детали. Вы только подтверждаете.</p>
                            </div>
                        </motion.div>

                        {/* Step 4: Integrations (Hub & Spoke) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative h-80 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-500 overflow-hidden flex flex-col"
                        >
                            <div className="h-40 shrink-0 bg-zinc-50/50 flex items-center justify-center relative border-b border-zinc-100 px-4 overflow-hidden">
                                <div className="relative flex items-center justify-center size-48 group-hover:scale-105 transition-transform duration-500">
                                    {/* Lines */}
                                    <svg className="absolute inset-0 size-full pointer-events-none stroke-zinc-300" style={{ strokeWidth: 1 }}>
                                        <line x1="50%" y1="50%" x2="20%" y2="30%" />
                                        <line x1="50%" y1="50%" x2="80%" y2="30%" />
                                        <line x1="50%" y1="50%" x2="50%" y2="80%" />
                                    </svg>

                                    {/* Center Hub */}
                                    <div className="relative z-10 size-12 rounded-full bg-zinc-900 flex items-center justify-center shadow-lg ring-4 ring-white">
                                        <Bot className="size-6 text-white" />
                                    </div>

                                    {/* Nodes */}
                                    <div className="absolute top-[20%] left-[10%] bg-white p-2.5 rounded-full border border-zinc-200 shadow-sm text-zinc-400 group-hover:text-zinc-900 group-hover:border-zinc-900 transition-colors duration-300">
                                        <MessageCircle className="size-5" />
                                    </div>
                                    <div className="absolute top-[20%] right-[10%] bg-white p-2.5 rounded-full border border-zinc-200 shadow-sm text-zinc-400 group-hover:text-zinc-900 group-hover:border-zinc-900 transition-colors duration-300">
                                        <Globe className="size-5" />
                                    </div>
                                    <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 bg-white p-2.5 rounded-full border border-zinc-200 shadow-sm text-zinc-400 group-hover:text-zinc-900 group-hover:border-zinc-900 transition-colors duration-300">
                                        <Database className="size-5" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 pt-5">
                                <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md mb-3">Шаг 04</span>
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">Подключите интеграции</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">Виджет на сайт, Telegram, WhatsApp, Bitrix24, AmoCRM.</p>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    )
}
