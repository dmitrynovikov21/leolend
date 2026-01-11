"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User, Briefcase } from "lucide-react"
import { getFeaturedCases } from "@/actions/article"
import { useEffect, useState } from "react"

const categoryLabels: Record<string, string> = {
    GUIDE: "Гайды",
    BLOG: "Блог",
    CASE: "Кейсы",
    NEWS: "Новости",
}

// Fallback static posts when DB is empty - REMOVED to prevent 404s
// const fallbackCases = [] 

export function CasesSection() {
    const [cases, setCases] = useState<any[]>([]) // Start empty
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const result = await getFeaturedCases()
                if (result.success && result.data && result.data.length > 0) {
                    setCases(result.data)
                }
            } catch (e) {
                console.error("Failed to fetch featured cases:", e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCases()
    }, [])


    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    }

    // Don't render section if no real cases and finished loading (optional logic, kept simple for now)

    return (
        <section className="py-24 bg-zinc-50 relative overflow-hidden">
            {/* Background Decoration - slightly different colors */}
            <div className="absolute top-0 left-0 -ml-20 -mt-20 w-[400px] h-[400px] bg-purple-50/50 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <Briefcase className="w-5 h-5" />
                            </span>
                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                                Практика
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
                            Кейсы и истории успеха
                        </h2>
                        <p className="text-lg text-zinc-500">
                            Реальные примеры внедрения AI-агентов. Результаты в цифрах, сроки и отзывы клиентов.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/ru/cases"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm group"
                        >
                            Все кейсы
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cases.map((post, i) => (
                        <Link href={`/ru/blog/${post.slug}`} key={post.id} className="block">
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex flex-col h-full bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-200 transition-all duration-300 overflow-hidden"
                            >
                                {/* Image Wrapper */}
                                <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
                                    <Image
                                        src={post.coverImageUrl || "/_static/blog/blog-post-1.png"}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-zinc-800 border border-zinc-100 shadow-sm">
                                            КЕЙС
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex items-center gap-3 text-xs text-zinc-400 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(post.createdAt)}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-zinc-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                        Читать кейс
                                        <ArrowRight className="w-4 h-4 ml-1.5" />
                                    </div>
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
