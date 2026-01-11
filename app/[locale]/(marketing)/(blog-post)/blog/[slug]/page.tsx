"use client"

import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { RoistatHeader } from "@/components/roistat/header"
import { RoistatFooter } from "@/components/roistat/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { getArticleBySlug } from "@/actions/article"

const categoryLabels: Record<string, string> = {
  GUIDE: "Гайды",
  BLOG: "Блог",
  CASE: "Кейсы",
  NEWS: "Новости",
}

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const result = await getArticleBySlug(params.slug)
        if (result.success && result.data) {
          setArticle(result.data)
        } else {
          setNotFoundState(true)
        }
      } catch (e) {
        console.error("Failed to fetch article:", e)
        setNotFoundState(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticle()
  }, [params.slug])

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <RoistatHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </main>
        <RoistatFooter />
      </div>
    )
  }

  if (notFoundState || !article) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <RoistatHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#3d4f6f] mb-4">Статья не найдена</h1>
            <Link href="/ru/blog" className="text-blue-600 hover:underline">
              ← Вернуться в блог
            </Link>
          </div>
        </main>
        <RoistatFooter />
      </div>
    )
  }

  // Parse content - handle both string and object formats
  let contentHtml = ""
  if (article.content) {
    if (typeof article.content === "string") {
      contentHtml = article.content
    } else if (article.content.html) {
      contentHtml = article.content.html
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RoistatHeader />

      <main className="flex-1 pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/ru/blog"
            className="inline-flex items-center gap-2 text-[#6b7a90] hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Блог
          </Link>

          {/* Category & Date */}
          <div className="flex items-center gap-4 text-sm text-[#6b7a90] mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              {categoryLabels[article.category] || article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3d4f6f] mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Description */}
          {article.description && (
            <p className="text-xl text-[#6b7a90] mb-8 leading-relaxed">
              {article.description}
            </p>
          )}

          {/* Author */}
          <div className="flex items-center gap-3 pb-8 border-b border-zinc-200 mb-8">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-[#3d4f6f]">LeoAgent Team</div>
              <div className="text-sm text-[#6b7a90]">@leoagent</div>
            </div>
          </div>

          {/* Cover Image */}
          {article.coverImageUrl && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <Image
                src={article.coverImageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-[#3d4f6f] prose-p:text-[#6b7a90] prose-a:text-blue-600 prose-strong:text-[#3d4f6f]"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </main>

      <RoistatFooter />
    </div>
  )
}
