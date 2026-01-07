"use client"

import { useEffect, useRef, useState } from "react"
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
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeftState, setScrollLeftState] = useState(0)

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        let animationId: number

        const scroll = () => {
            if (!isPaused && !isDragging) {
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0
                } else {
                    container.scrollLeft += 0.5
                }
            }
            animationId = requestAnimationFrame(scroll)
        }

        animationId = requestAnimationFrame(scroll)

        return () => cancelAnimationFrame(animationId)
    }, [isPaused, isDragging])

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return
        setIsDragging(true)
        setIsPaused(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeftState(scrollRef.current.scrollLeft)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        setIsPaused(false)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return
        e.preventDefault()
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = (x - startX) * 2 // Scroll speed multiplier
        scrollRef.current.scrollLeft = scrollLeftState - walk
    }

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl font-bold text-zinc-900">
                    Отзывы клиентов
                </h2>
            </div>

            <div
                className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
                ref={scrollRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => {
                    setIsPaused(false)
                    setIsDragging(false)
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <div className="flex gap-6 px-6">
                    {/* Double the array for seamless loop */}
                    {[...testimonials, ...testimonials, ...testimonials].map((item, i) => (
                        <div
                            key={i}
                            className="w-[350px] shrink-0 p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-shadow select-none"
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
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    )
}
