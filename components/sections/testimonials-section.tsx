"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
    {
        name: "Ilya Smirnov",
        role: "Union Oil & Gas",
        text: "Разгрузили 3 операторов. Бот отвечает на 90% вопросов по регламентам."
    },
    {
        name: "Elena V.",
        role: "EdTech School",
        text: "Кураторы теперь спят ночью. Студенты получают ответы мгновенно."
    },
    {
        name: "Mark D.",
        role: "E-commerce",
        text: "Внедрение заняло 10 минут. Просто загрузили PDF с условиями доставки."
    },
    {
        name: "Alexey K.",
        role: "Founder",
        text: "Лучшая инвестиция года. Экономим 150к рублей в месяц на ФОТ."
    },
    {
        name: "Olga S.",
        role: "HR Director",
        text: "Новички адаптируются за 3 дня вместо 2 недель. База знаний работает."
    },
    {
        name: "Dmitry P.",
        role: "IT Lead",
        text: "Наконец-то сотрудники перестали дергать меня по мелочам. Бот знает всё."
    },
]

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl font-bold text-zinc-900">
                    Отзывы клиентов
                </h2>
            </div>

            {/* Gradient Masks */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex overflow-hidden">
                <div
                    className="flex gap-6 animate-marquee hover:[animation-play-state:paused]"
                    style={{ animationDuration: '40s' }}
                >
                    {[...testimonials, ...testimonials].map((item, i) => (
                        <div
                            key={i}
                            className="w-[350px] shrink-0 p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col gap-4 h-full">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="size-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>

                                <blockquote className="text-zinc-700 leading-relaxed flex-1">
                                    "{item.text}"
                                </blockquote>

                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-100">
                                    <div className="size-10 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-bold text-zinc-500">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-zinc-900 text-sm">
                                            {item.name}
                                        </div>
                                        <div className="text-xs text-zinc-500">
                                            {item.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
