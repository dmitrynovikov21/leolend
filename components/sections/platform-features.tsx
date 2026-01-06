"use client"

import { motion } from "framer-motion"
import { Layers, Database, Code, MessageSquare, BarChart3, RefreshCw, FileText, File, Globe, Layout } from "lucide-react"

export default function PlatformFeatures() {
    return (
        <section className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
                        Мощная платформа для бизнеса
                    </h2>
                    <p className="text-zinc-500 mt-4 text-lg">
                        Всё необходимое для создания, управления и масштабирования ИИ-агентов
                    </p>
                </motion.div>

                <div className="space-y-24">
                    {/* Block 1: Работает с любыми данными */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <div className="inline-flex h-12 w-12 rounded-xl bg-zinc-100 text-zinc-900 items-center justify-center mb-6 border border-zinc-200">
                                <Database className="size-6" />
                            </div>
                            <h3 className="text-3xl font-semibold text-zinc-900 mb-4">
                                Работает с любыми данными
                            </h3>
                            <p className="text-lg text-zinc-500 leading-relaxed mb-8">
                                Загружайте документы разных форматов, добавляйте ссылки на базы знаний и обновляйте их в любой момент.
                                Обучение происходит автоматически за секунды.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="size-6 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                                        <RefreshCw className="size-3.5" />
                                    </div>
                                    <span className="text-zinc-700">Обновление базы в 1 клик</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="size-6 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                                        <Layers className="size-3.5" />
                                    </div>
                                    <span className="text-zinc-700">Готовые шаблоны ролей</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative aspect-video rounded-2xl bg-white border border-zinc-200 shadow-xl overflow-hidden flex items-center justify-center p-8">
                            {/* Abstract Visual for Data */}
                            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                                {/* DOCX */}
                                <div className="flex flex-col items-center justify-center aspect-square bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-[#1354FC] hover:shadow-md group transition-all duration-300 cursor-default">
                                    <FileText className="h-8 w-8 stroke-[1.5px] text-zinc-600 group-hover:text-[#1354FC]" />
                                    <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mt-3">WORD / DOCX</span>
                                </div>
                                {/* PDF */}
                                <div className="flex flex-col items-center justify-center aspect-square bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-[#1354FC] hover:shadow-md group transition-all duration-300 cursor-default">
                                    <File className="h-8 w-8 stroke-[1.5px] text-zinc-600 group-hover:text-[#1354FC]" />
                                    <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mt-3">PDF</span>
                                </div>
                                {/* Link */}
                                <div className="flex flex-col items-center justify-center aspect-square bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-[#1354FC] hover:shadow-md group transition-all duration-300 cursor-default">
                                    <Globe className="h-8 w-8 stroke-[1.5px] text-zinc-600 group-hover:text-[#1354FC]" />
                                    <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mt-3">WEB / LINKS</span>
                                </div>
                                {/* Notion */}
                                <div className="flex flex-col items-center justify-center aspect-square bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-[#1354FC] hover:shadow-md group transition-all duration-300 cursor-default">
                                    <Layout className="h-8 w-8 stroke-[1.5px] text-zinc-600 group-hover:text-[#1354FC]" />
                                    <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mt-3">NOTION / KB</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Block 2: Интеграция в контур бизнеса (Image Left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <div className="order-2 lg:order-1 relative aspect-video rounded-2xl bg-zinc-900 shadow-2xl overflow-hidden flex items-center justify-center p-8">
                            {/* Abstract Visual for Integration */}
                            <div className="text-zinc-400 font-mono text-sm leading-relaxed p-6 w-full">
                                &gt; Connecting to Telegram... <span className="text-green-400">OK</span><br />
                                &gt; Connecting to WhatsApp... <span className="text-green-400">OK</span><br />
                                &gt; CRM Handshake... <span className="text-blue-400">Processing</span><br />
                                &gt; Widget Embed Code Generated.<br />
                                <br />
                                <div className="p-3 bg-zinc-800 rounded border border-zinc-700 text-zinc-300 mt-2">
                                    &lt;script src="leo-agent.js"&gt;&lt;/script&gt;
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex h-12 w-12 rounded-xl bg-zinc-100 text-zinc-900 items-center justify-center mb-6 border border-zinc-200">
                                <Code className="size-6" />
                            </div>
                            <h3 className="text-3xl font-semibold text-zinc-900 mb-4">
                                Интеграция в контур бизнеса
                            </h3>
                            <p className="text-lg text-zinc-500 leading-relaxed mb-8">
                                Встраивайте агента в корпоративный портал, сайт, LMS или базу знаний одной строкой кода.
                                Подключайте мессенджеры и CRM.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="size-6 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                                        <MessageSquare className="size-3.5" />
                                    </div>
                                    <span className="text-zinc-700">Telegram, WhatsApp, CRM</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="size-6 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                                        <Code className="size-3.5" />
                                    </div>
                                    <span className="text-zinc-700">Embed Widget</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Block 3: Полный контроль */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <div className="inline-flex h-12 w-12 rounded-xl bg-zinc-100 text-zinc-900 items-center justify-center mb-6 border border-zinc-200">
                                <BarChart3 className="size-6" />
                            </div>
                            <h3 className="text-3xl font-semibold text-zinc-900 mb-4">
                                Полный контроль и аналитика
                            </h3>
                            <p className="text-lg text-zinc-500 leading-relaxed mb-8">
                                Отслеживайте вопросы, оценивайте эффективность ответов и улучшайте базу знаний на основе реальных диалогов.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="size-6 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                                        <BarChart3 className="size-3.5" />
                                    </div>
                                    <span className="text-zinc-700">Логи диалогов</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative aspect-video rounded-2xl bg-white border border-zinc-200 shadow-xl overflow-hidden flex items-end justify-center px-8 pt-8 pb-0">
                            {/* Abstract Chart */}
                            <div className="flex gap-4 items-end h-32 w-full max-w-sm mb-0">
                                <div className="flex-1 bg-zinc-100 rounded-t-sm h-[40%]"></div>
                                <div className="flex-1 bg-zinc-200 rounded-t-sm h-[60%]"></div>
                                <div className="flex-1 bg-zinc-300 rounded-t-sm h-[50%]"></div>
                                <div className="flex-1 bg-zinc-800 rounded-t-sm h-[85%] relative group">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-100">
                                        +145%
                                    </div>
                                </div>
                                <div className="flex-1 bg-zinc-100 rounded-t-sm h-[55%]"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
