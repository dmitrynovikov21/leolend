"use client"

import { motion } from "framer-motion"

import MaxWidthWrapper from "@/components/shared/max-width-wrapper"

const problems = [
    {
        number: "01",
        title: "Хаос в поддержке",
        description: "Операторы отвечают на одни и те же вопросы 80% времени.",
    },
    {
        number: "02",
        title: "Сложный онбординг",
        description: "Новички долго вникают в регламенты и отвлекают коллег.",
    },
    {
        number: "03",
        title: "Потеря знаний",
        description: "При увольнении экспертиза уходит вместе с сотрудником.",
    },
]

export default function ProblemsSection() {
    return (
        <section className="py-24">
            <MaxWidthWrapper>
                <div className="text-center mb-16">
                    <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-4">
                        Проблемы
                    </p>
                    <h2 className="font-bold text-3xl sm:text-4xl text-black">
                        Знакомые ситуации?
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={problem.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group rounded-3xl border border-neutral-200 bg-white p-8 transition-colors hover:border-neutral-300"
                        >
                            <span className="text-xs font-mono text-neutral-300">{problem.number}</span>
                            <h3 className="mt-4 text-xl font-medium text-black">
                                {problem.title}
                            </h3>
                            <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    )
}
