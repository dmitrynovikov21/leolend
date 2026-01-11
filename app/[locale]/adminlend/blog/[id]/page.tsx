"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Wand2, Image as ImageIcon, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { TelegraphEditor } from "@/components/editor/telegraph-editor"
import { type Editor as TiptapEditor } from "@tiptap/core"
import { getArticle, updateArticle } from "@/actions/article"

export default function EditArticlePage() {
    const params = useParams()
    const router = useRouter()
    const articleId = params.id as string

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState<any>(null)
    const [category, setCategory] = useState("BLOG")
    const [status, setStatus] = useState("DRAFT")
    const [isFeatured, setIsFeatured] = useState(false)
    const [coverImage, setCoverImage] = useState("")

    // AI Image Generation
    const [imagePrompt, setImagePrompt] = useState("")
    const [generatedImages, setGeneratedImages] = useState<string[]>([])
    const [isGenerating, setIsGenerating] = useState(false)

    // UI State
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [editorRef, setEditorRef] = useState<TiptapEditor | null>(null)

    // Load article data from database
    useEffect(() => {
        const loadArticle = async () => {
            try {
                const result = await getArticle(articleId)
                if (result.success && result.data) {
                    const article = result.data
                    setTitle(article.title)
                    setSlug(article.slug)
                    setDescription(article.description || "")
                    const contentData = article.contentJson as any
                    setContent(contentData?.html ?? contentData)
                    setCategory(article.category)
                    setStatus(article.status)
                    setIsFeatured(article.isFeaturedOnHome)
                    setCoverImage(article.coverImageUrl || "")
                } else {
                    toast.error("Статья не найдена")
                }
            } catch (error) {
                console.error("Failed to load article:", error)
                toast.error("Ошибка загрузки статьи")
            } finally {
                setIsLoading(false)
            }
        }
        loadArticle()
    }, [articleId])

    const handleTitleChange = (value: string) => {
        setTitle(value)
        const newSlug = value
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[-\s]+/g, "-")
            .trim()
        setSlug(newSlug)
    }

    const handleGenerateImages = async () => {
        if (!imagePrompt.trim()) {
            toast.error("Введите промпт для генерации изображения")
            return
        }

        setIsGenerating(true)
        await new Promise((r) => setTimeout(r, 1500))
        setGeneratedImages([
            "https://placehold.co/800x600/0077FF/ffffff?text=AI+Image+1",
            "https://placehold.co/800x600/0077FF/ffffff?text=AI+Image+2",
            "https://placehold.co/800x600/0077FF/ffffff?text=AI+Image+3",
        ])
        setIsGenerating(false)
        toast.success("Изображения сгенерированы!")
    }

    const handleSetCover = (url: string) => {
        setCoverImage(url)
        toast.success("Обложка установлена")
    }

    const handleInsertImage = (url: string) => {
        if (editorRef) {
            editorRef.chain().focus().setImage({ src: url }).run()
            toast.success("Изображение вставлено в статью")
        }
    }

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error("Заголовок обязателен")
            return
        }

        const finalContent = editorRef ? { html: editorRef.getHTML() } : content

        setIsSaving(true)
        try {
            const result = await updateArticle(articleId, {
                title,
                slug,
                description,
                contentJson: finalContent,
                category: category as "GUIDE" | "BLOG" | "CASE" | "NEWS",
                status: status as "DRAFT" | "PUBLISHED",
                isFeaturedOnHome: isFeatured,
                coverImageUrl: coverImage,
            })

            if (result.success) {
                toast.success("Статья сохранена!")
            } else {
                throw new Error(result.error || "Ошибка сохранения")
            }
        } catch (error: any) {
            toast.error(error.message || "Ошибка сохранения")
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-zinc-500">Загрузка...</p>
            </div>
        )
    }

    return (
        <div className="flex h-[calc(100vh-64px)]">
            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-white">
                    <div className="flex items-center gap-4">
                        <Link href="/ru/adminlend/blog">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div className="flex-1">
                            <Input
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="Заголовок статьи..."
                                className="text-xl font-bold border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DRAFT">Черновик</SelectItem>
                                <SelectItem value="PUBLISHED">Опубликовано</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Сохранить
                        </Button>
                    </div>
                </div>

                {/* Cover Image */}
                {coverImage && (
                    <div className="relative h-48 bg-zinc-100 border-b border-zinc-200">
                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => setCoverImage("")}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                )}

                {/* Telegraph Editor */}
                <div className="flex-1 overflow-hidden border border-zinc-200 rounded-lg m-4">
                    <TelegraphEditor
                        initialValue={content}
                        onChange={setContent}
                        onEditorReady={setEditorRef}
                    />
                </div>
            </div>

            {/* Right Sidebar - Settings & AI */}
            <div className="w-80 border-l border-zinc-200 bg-white overflow-auto">
                {/* Article Settings */}
                <div className="p-4 border-b border-zinc-200">
                    <h3 className="font-semibold text-zinc-900 mb-4">Настройки</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs text-zinc-500">URL (slug)</Label>
                            <Input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="url-stati"
                                className="text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-zinc-500">Описание (SEO)</Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Краткое описание..."
                                rows={2}
                                className="text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-zinc-500">Категория</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GUIDE">Гайд</SelectItem>
                                    <SelectItem value="BLOG">Блог</SelectItem>
                                    <SelectItem value="CASE">Кейс</SelectItem>
                                    <SelectItem value="NEWS">Новости</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <Label className="text-sm">На главной</Label>
                            <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                        </div>
                    </div>
                </div>

                {/* AI Image Generator */}
                <div className="p-4">
                    <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                        <Wand2 className="w-4 h-4" />
                        AI Изображения
                    </h3>

                    <div className="space-y-4">
                        <Textarea
                            value={imagePrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                            placeholder="Опишите изображение..."
                            rows={2}
                            className="text-sm"
                        />
                        <Button
                            onClick={handleGenerateImages}
                            disabled={isGenerating}
                            className="w-full gap-2"
                            size="sm"
                        >
                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                            {isGenerating ? "Генерация..." : "Сгенерировать"}
                        </Button>
                    </div>

                    {/* Generated Images */}
                    {generatedImages.length > 0 && (
                        <div className="mt-4">
                            <p className="text-xs text-zinc-500 mb-2">Перетащите в редактор или нажмите:</p>
                            <div className="space-y-2">
                                {generatedImages.map((url, i) => (
                                    <div
                                        key={i}
                                        className="relative group rounded-lg overflow-hidden border border-zinc-200 cursor-grab active:cursor-grabbing"
                                        draggable="true"
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData('text/image-url', url)
                                            e.dataTransfer.effectAllowed = 'copy'
                                        }}
                                    >
                                        <img src={url} alt={`Generated ${i + 1}`} className="w-full h-24 object-cover pointer-events-none" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleInsertImage(url)}
                                                className="text-xs h-7"
                                            >
                                                Вставить
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleSetCover(url)}
                                                className="text-xs h-7"
                                            >
                                                Обложка
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
