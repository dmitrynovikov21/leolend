"use client"

import { motion } from "framer-motion"
import { MessageSquare, Clock, Calendar, UserCheck, Shield, Mic, ToggleRight, ArrowRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const settings = [
    {
        id: "active",
        label: "Активность",
        description: "Агент отвечает на сообщения",
        checked: true
    },
    {
        id: "schedule",
        label: "График работы",
        description: "Пн-Пт, 9:00 - 18:00",
        checked: true
    },
    {
        id: "human",
        label: "Перевод на оператора",
        description: "Если клиент попросил человека",
        checked: true
    }
]

export default function AdvancedSettings() {
    const [toggles, setToggles] = useState(settings)

    const toggle = (id: string) => {
        setToggles(toggles.map(t => t.id === id ? { ...t, checked: !t.checked } : t))
    }

    return (
        <section className="py-24 bg-white border-t border-zinc-100">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Left: Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-6">
                            Гибкие настройки поведения
                        </h2>
                        <p className="text-lg text-zinc-500 leading-relaxed mb-8">
                            Управляйте тем, как и когда агент общается с клиентами.
                            Настраивайте задержки, рабочее время и сценарии передачи диалога человеку.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { icon: Clock, text: "Задержка ответа" },
                                { icon: Shield, text: "Защита от спама" },
                                { icon: Mic, text: "Голосовые" },
                                { icon: Calendar, text: "Умный график" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                                    <item.icon className="size-5 text-zinc-900" />
                                    <span className="text-zinc-700 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Interactive UI Mockup */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-zinc-50 rounded-3xl -rotate-2 scale-[1.02] -z-10" />
                        <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
                            {/* Mock Header */}
                            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full bg-red-400" />
                                    <div className="size-3 rounded-full bg-yellow-400" />
                                    <div className="size-3 rounded-full bg-green-400" />
                                </div>
                                <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Settings</div>
                            </div>

                            {/* Mock Body */}
                            <div className="p-6 space-y-6">
                                {toggles.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between group cursor-pointer" onClick={() => toggle(item.id)}>
                                        <div>
                                            <div className="font-medium text-zinc-900">{item.label}</div>
                                            <div className="text-sm text-zinc-500">{item.description}</div>
                                        </div>
                                        <div className={cn(
                                            "w-12 h-7 rounded-full transition-colors duration-300 relative",
                                            item.checked ? "bg-zinc-900" : "bg-zinc-200"
                                        )}>
                                            <div className={cn(
                                                "absolute top-1 left-1 bg-white size-5 rounded-full shadow-sm transition-transform duration-300",
                                                item.checked ? "translate-x-5" : "translate-x-0"
                                            )} />
                                        </div>
                                    </div>
                                ))}

                                {/* Add slider mock */}
                                <div className="pt-4 border-t border-zinc-100">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium text-zinc-900">Температура (Креативность)</span>
                                        <span className="text-zinc-500">0.7</span>
                                    </div>
                                    <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[70%] bg-zinc-900 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
