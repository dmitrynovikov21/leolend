"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User } from "lucide-react"
import { getFeaturedArticles } from "@/actions/article"
import { useEffect, useState } from "react"

const categoryLabels: Record<string, string> = {
    GUIDE: "Гайды",
    BLOG: "Блог",
    CASE: "Кейсы",
    NEWS: "Новости",
}

// Fallback static posts when DB is empty
const fallbackPosts = [
    {
        id: "1",
        slug: "kak-leoagent-ekonomit-150k",
        title: "Как LeoAgent экономит 150 000 рублей в месяц на поддержке",
        description: "Реальный кейс автоматизации первой линии поддержки с помощью ИИ-агента. Узнайте, как сократить расходы и повысить качество сервиса.",
        createdAt: new Date("2024-01-10"),
        coverImageUrl: "/_static/blog/blog-post-1.png",
        category: "CASE"
    },
    {
        id: "2",
        slug: "kak-vnedrityai-agenta-za-10-minut",
        title: "Как внедрить ИИ-агента за 10 минут без программистов",
        description: "Пошаговая инструкция по настройке LeoAgent для вашего бизнеса. От загрузки базы знаний до подключения в Telegram.",
        createdAt: new Date("2024-01-15"),
        coverImageUrl: "/_static/blog/blog-post-2.png",
        category: "GUIDE"
    },
    {
        id: "3",
        slug: "vash-ai-agent-v-telegram",
        title: "Ваш ИИ-агент в Telegram: от настройки до первой продажи",
        description: "Как перенести поддержку клиентов в мессенджеры и повысить лояльность. Пошаговая интеграция с LeoAgent.",
        createdAt: new Date("2024-12-25"),
        coverImageUrl: "/_static/blog/blog-post-3.png",
        category: "GUIDE"
    }
]

export function BlogSection() {
    const [posts, setPosts] = useState<any[]>(fallbackPosts)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await getFeaturedArticles()
                if (result.success && result.data && result.data.length > 0) {
                    setPosts(result.data)
                }
            } catch (e) {
                console.error("Failed to fetch featured articles:", e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPosts()
    }, [])

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    }

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-indigo-50/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
                            Блог и полезные материалы
                        </h2>
                        <p className="text-lg text-zinc-500">
                            Делимся опытом внедрения ИИ, кейсами клиентов и новостями платформы.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/ru/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm group"
                        >
                            Читать все статьи
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <Link
                            href={`/ru/blog/${post.slug}`}
                            key={post.id}
                            className="block"
                        >
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
                                            {categoryLabels[post.category] || post.category}
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
                                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                                        <span className="flex items-center gap-1">
                                            <User className="w-3.5 h-3.5" />
                                            LeoAgent
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-zinc-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                        Читать статью
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
