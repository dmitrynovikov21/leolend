"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Sparkles, ImagePlus, Trash2, GripVertical, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface MediaItem {
    id: string
    url: string
    promptUsed: string | null
    createdAt: string
}

interface MediaGalleryProps {
    onImageSelect?: (url: string) => void
}

export function MediaGallery({ onImageSelect }: MediaGalleryProps) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [images, setImages] = React.useState<MediaItem[]>([])
    const [prompt, setPrompt] = React.useState("")
    const [draggedImage, setDraggedImage] = React.useState<string | null>(null)

    // Load images on mount
    React.useEffect(() => {
        loadImages()
    }, [])

    const loadImages = async () => {
        setIsLoading(true)
        try {
            // Try to fetch from backend API
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/media`)
            if (response.ok) {
                const data = await response.json()
                setImages(data)
            }
        } catch (error) {
            console.log("Could not fetch images from backend, using empty state")
            // Use placeholder images for demo
            setImages([
                {
                    id: "demo-1",
                    url: "https://placehold.co/400x300/0077FF/ffffff?text=AI+Image+1",
                    promptUsed: "Demo image 1",
                    createdAt: new Date().toISOString()
                },
                {
                    id: "demo-2",
                    url: "https://placehold.co/400x300/00CC66/ffffff?text=AI+Image+2",
                    promptUsed: "Demo image 2",
                    createdAt: new Date().toISOString()
                }
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const generateImage = async () => {
        if (!prompt.trim()) {
            toast.error("Введите описание изображения")
            return
        }

        setIsGenerating(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/media/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt })
            })

            if (!response.ok) {
                throw new Error("Failed to generate images")
            }

            const data = await response.json()
            setImages(prev => [...data.images, ...prev])
            setPrompt("")
            toast.success("Изображения сгенерированы!")
        } catch (error) {
            // Fallback: add placeholder image
            const newImage: MediaItem = {
                id: `gen-${Date.now()}`,
                url: `https://placehold.co/400x300/FF6600/ffffff?text=${encodeURIComponent(prompt.slice(0, 20))}`,
                promptUsed: prompt,
                createdAt: new Date().toISOString()
            }
            setImages(prev => [newImage, ...prev])
            setPrompt("")
            toast.info("Добавлено placeholder изображение (backend не доступен)")
        } finally {
            setIsGenerating(false)
        }
    }

    const deleteImage = async (id: string) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/media/${id}`, {
                method: "DELETE"
            })
        } catch (error) {
            // Continue anyway for local state
        }
        setImages(prev => prev.filter(img => img.id !== id))
        toast.success("Изображение удалено")
    }

    // Drag and drop handlers
    const handleDragStart = (e: React.DragEvent, url: string) => {
        e.dataTransfer.setData("text/plain", url)
        e.dataTransfer.setData("image/url", url)
        setDraggedImage(url)
    }

    const handleDragEnd = () => {
        setDraggedImage(null)
    }

    return (
        <Card className="border border-zinc-200/50 shadow-sm bg-white rounded-2xl">
            <CardHeader>
                <CardTitle className="text-base font-semibold text-zinc-900 flex items-center gap-2">
                    <ImagePlus className="h-5 w-5 text-purple-500" />
                    Галерея изображений
                </CardTitle>
                <CardDescription>
                    Генерируйте изображения и перетаскивайте их в редактор статей
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Generate Form */}
                <div className="flex gap-2">
                    <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Опишите изображение..."
                        className="flex-1 rounded-xl"
                        onKeyDown={(e) => e.key === "Enter" && generateImage()}
                    />
                    <Button
                        onClick={generateImage}
                        disabled={isGenerating}
                        className="bg-purple-600 hover:bg-purple-700 rounded-xl"
                    >
                        {isGenerating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                {/* Images Grid */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-8 text-zinc-400">
                        <ImagePlus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Нет изображений</p>
                        <p className="text-sm">Сгенерируйте первое изображение выше</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, image.url)}
                                onDragEnd={handleDragEnd}
                                onClick={() => onImageSelect?.(image.url)}
                                className={`relative group cursor-grab active:cursor-grabbing rounded-xl overflow-hidden border-2 transition-all duration-200 ${draggedImage === image.url
                                        ? "border-purple-500 opacity-50"
                                        : "border-transparent hover:border-purple-300"
                                    }`}
                            >
                                <div className="aspect-video relative bg-zinc-100">
                                    <img
                                        src={image.url}
                                        alt={image.promptUsed || "Generated image"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Overlay with actions */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <div className="text-white text-xs bg-black/30 px-2 py-1 rounded flex items-center gap-1">
                                        <GripVertical className="h-3 w-3" />
                                        Перетащите
                                    </div>
                                </div>

                                {/* Delete button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteImage(image.id)
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                    <X className="h-3 w-3" />
                                </button>

                                {/* Prompt tooltip */}
                                {image.promptUsed && (
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                                        <p className="text-white text-xs truncate">
                                            {image.promptUsed}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
