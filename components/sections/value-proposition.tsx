"use client"

import { motion } from "framer-motion"

import MaxWidthWrapper from "@/components/shared/max-width-wrapper"

const values = [
    {
        label: "Экономия",
        title: "Заменяет первую линию поддержки",
        metric: "-70%",
        description: "затрат на ФОТ",
    },
    {
        label: "Скорость",
        title: "Отвечает мгновенно, 24/7",
        metric: "0 сек",
        description: "задержка ответа",
    },
    {
        label: "Точность",
        title: "Никакой «отсебятины». RAG-технология",
        metric: "100%",
        description: "по документам",
    },
]

export default function ValueProposition() {
    return (
        <section className="py-20">
            <MaxWidthWrapper>
                <div className="grid gap-4 lg:grid-cols-3">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-sm transition-shadow"
                        >
                            <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                                {value.label}
                            </span>
                            <h3 className="mt-3 text-lg font-medium text-black leading-snug">
                                {value.title}
                            </h3>
                            <div className="mt-5 flex items-baseline gap-2">
                                <span className="font-bold text-4xl text-black">{value.metric}</span>
                                <span className="text-sm text-neutral-400">{value.description}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    )
}
