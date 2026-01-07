"use client"

import { motion } from "framer-motion"
import { Check, GraduationCap } from "lucide-react"

export default function AudienceSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
                        Кому подходит LeoAgent
                    </h2>
                    <p className="text-zinc-500 mt-3">
                        Автоматизация для тех, кто ценит время
                    </p>
                </motion.div>

                {/* Bento Grid Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: Founders (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 group relative overflow-hidden bg-zinc-50 rounded-3xl border border-zinc-200 p-8 hover:bg-white hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold tracking-tight mb-2 text-zinc-900">Фаундеры и малый бизнес</h3>
                            <p className="text-sm text-zinc-500 max-w-[80%] leading-relaxed">
                                Уберите рутину. Ваш ИИ-сотрудник работает 24/7, не просит отпуск и больничный.
                            </p>
                        </div>
                        {/* Abstract Visual: Profit Graph */}
                        <div className="absolute bottom-6 right-8 flex items-end gap-2 h-24 opacity-80 group-hover:scale-105 transition-transform duration-500">
                            <div className="w-4 bg-zinc-300 rounded-t-sm h-[40%]" />
                            <div className="w-4 bg-zinc-300 rounded-t-sm h-[60%]" />
                            <div className="w-4 bg-zinc-300 rounded-t-sm h-[30%]" />
                            <div className="w-4 bg-zinc-300 rounded-t-sm h-[50%]" />
                            <div className="w-4 bg-zinc-300 rounded-t-sm h-[70%]" />
                            <div className="w-4 bg-green-500 rounded-t-sm h-[90%] shadow-lg shadow-green-500/20" />
                        </div>
                    </motion.div>

                    {/* Card 2: Online Schools (Short) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="group relative overflow-hidden bg-zinc-50 rounded-3xl border border-zinc-200 p-8 hover:bg-white hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold tracking-tight mb-2 text-zinc-900">Онлайн-школы</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Авто-ответы студентам. Снижение нагрузки на кураторов.
                            </p>
                        </div>
                        {/* Abstract Visual: Graduation Cap */}
                        <GraduationCap className="absolute -bottom-4 -right-4 size-32 text-zinc-200 -rotate-12 group-hover:rotate-0 transition-transform duration-500 opacity-50" />
                    </motion.div>

                    {/* Card 3: IT & HR (Short) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="group relative overflow-hidden bg-zinc-50 rounded-3xl border border-zinc-200 p-8 hover:bg-white hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold tracking-tight mb-2 text-zinc-900">HR и IT</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Мгновенные ответы на "Где мой отпуск?" и "Как настроить VPN?".
                            </p>
                        </div>
                        {/* Abstract Visual: Checklist */}
                        <div className="absolute bottom-6 right-6 p-3 bg-white rounded-lg border border-zinc-100 shadow-sm rotate-3 group-hover:rotate-0 transition-transform duration-300 w-32">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="size-4 rounded-full bg-green-100 flex items-center justify-center"><Check className="size-2.5 text-green-600" /></div>
                                    <div className="h-2 w-16 bg-zinc-100 rounded-full" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-4 rounded-full bg-green-100 flex items-center justify-center"><Check className="size-2.5 text-green-600" /></div>
                                    <div className="h-2 w-12 bg-zinc-100 rounded-full" />
                                </div>
                                <div className="flex items-center gap-2 opacity-50">
                                    <div className="size-4 rounded-full bg-zinc-100" />
                                    <div className="h-2 w-14 bg-zinc-100 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4: Marketers (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 group relative overflow-hidden bg-zinc-50 rounded-3xl border border-zinc-200 p-8 hover:bg-white hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative z-10 w-[60%]">
                            <h3 className="text-xl font-bold tracking-tight mb-2 text-zinc-900">Маркетологи и Продажи</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Лидогенерация 24/7. Агент квалифицирует лида и передает теплый контакт в CRM.
                            </p>
                        </div>
                        {/* Abstract Visual: Chat Sequence */}
                        <div className="absolute bottom-8 right-8 flex flex-col gap-3 w-48 opacity-90 group-hover:-translate-y-1 transition-transform duration-500">
                            {/* Bot Bubble */}
                            <div className="self-start px-4 py-2 bg-white border border-zinc-200 rounded-2xl rounded-tl-sm text-xs text-zinc-400 shadow-sm">
                                Чем могу помочь?
                            </div>
                            {/* User Bubble */}
                            <div className="self-end px-4 py-2 bg-zinc-900 text-zinc-50 rounded-2xl rounded-tr-sm text-xs shadow-md">
                                Хочу купить тариф
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
