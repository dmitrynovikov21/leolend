"use client"

import { RoistatHeader } from "@/components/roistat/header"
import { RoistatFooter } from "@/components/roistat/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import { getFeaturedArticles, getArticles } from "@/actions/article"
import { useEffect, useState } from "react"

const categoryLabels: Record<string, string> = {
  GUIDE: "Гайды",
  BLOG: "Блог",
  CASE: "Кейсы",
  NEWS: "Новости",
}

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getArticles()
        if (result.success && result.data) {
          // Filter only published articles
          const published = result.data.filter((a: any) => a.status === "PUBLISHED")
          setPosts(published)
        }
      } catch (e) {
        console.error("Failed to fetch articles:", e)
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
    <div className="min-h-screen bg-white flex flex-col">
      <RoistatHeader />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#3d4f6f] mb-4">
              Блог LeoAgent
            </h1>
            <p className="text-lg text-[#6b7a90] max-w-2xl mx-auto">
              Статьи, кейсы и руководства по внедрению ИИ-агентов в бизнес
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#6b7a90] text-lg">Статьи скоро появятся</p>
            </div>
          )}

          {/* Blog Grid */}
          {!isLoading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-200 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
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

                    <h2 className="text-xl font-bold text-zinc-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      <Link href={`/ru/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                      {post.description}
                    </p>

                    <Link
                      href={`/ru/blog/${post.slug}`}
                      className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform"
                    >
                      Читать статью
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <RoistatFooter />
    </div>
  )
}
