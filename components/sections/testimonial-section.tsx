"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export default function TestimonialSection() {
    return (
        <section className="py-24 bg-white border-t border-zinc-100">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative bg-zinc-50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden text-center"
                >
                    {/* Decorative Quote Icon */}
                    <div className="absolute top-8 left-8 text-zinc-200">
                        <Quote className="size-12 fill-zinc-200 opacity-50" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Avatar Placeholder */}
                        <div className="size-16 rounded-full bg-zinc-200 mb-6 flex items-center justify-center text-2xl">
                            👷‍♂️
                        </div>

                        <blockquote className="text-xl md:text-2xl font-medium text-zinc-900 leading-relaxed mb-8 max-w-2xl">
                            "Разработчики помогли создать бота для профсоюза. Мы загрузили базу, и теперь агент отвечает круглосуточно, экономя нам огромное количество времени."
                        </blockquote>

                        <div className="text-center">
                            <div className="font-bold text-zinc-900">Илья Смирнов</div>
                            <div className="text-sm text-zinc-500">Профсоюз Нефть и Газ</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
