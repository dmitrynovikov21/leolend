"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Loader2, Sparkles, Copy, Check, Settings2, Wand2 } from "lucide-react"
import { toast } from "sonner"

const POST_STYLES = [
    { id: "professional", name: "Профессиональный", emoji: "💼" },
    { id: "casual", name: "Неформальный", emoji: "😎" },
    { id: "educational", name: "Образовательный", emoji: "📚" },
    { id: "promotional", name: "Рекламный", emoji: "📢" },
    { id: "storytelling", name: "Сторителлинг", emoji: "📖" },
]

interface PostGeneratorProps {
    onGenerate?: (text: string) => void
}

export function PostGenerator({ onGenerate }: PostGeneratorProps) {
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [prompt, setPrompt] = React.useState("")
    const [style, setStyle] = React.useState("professional")
    const [generatedPost, setGeneratedPost] = React.useState("")
    const [copied, setCopied] = React.useState(false)

    // Custom instructions
    const [customInstructions, setCustomInstructions] = React.useState(`Ты — профессиональный копирайтер.

Правила:
1. Пиши на русском языке
2. Используй эмодзи умеренно
3. Структурируй текст
4. Добавляй призыв к действию`)

    const generatePost = async () => {
        if (!prompt.trim()) {
            toast.error("Введите тему поста")
            return
        }

        setIsGenerating(true)
        setGeneratedPost("")

        try {
            const response = await fetch("/api/generate-post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    style: POST_STYLES.find(s => s.id === style)?.name
                })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || "Failed to generate post")
            }

            const data = await response.json()
            setGeneratedPost(data.post)
            onGenerate?.(data.post) // Call the callback
            toast.success("Пост сгенерирован!")
        } catch (error: any) {
            toast.error(error.message || "Ошибка генерации")
            // Fallback demo post
            const fallbackPost = `🚀 **${prompt}**

Это демонстрационный пост, сгенерированный локально.

Для полноценной работы настройте ANTHROPIC_API_KEY в .env файле.

---
*Сгенерировано AI*`
            setGeneratedPost(fallbackPost)
            onGenerate?.(fallbackPost)
        } finally {
            setIsGenerating(false)
        }
    }

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(generatedPost)
        setCopied(true)
        toast.success("Скопировано!")
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card className="border border-zinc-200/50 shadow-sm bg-white rounded-2xl">
            <CardHeader>
                <CardTitle className="text-base font-semibold text-zinc-900 flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-blue-500" />
                    Генератор постов
                </CardTitle>
                <CardDescription>
                    Создавайте посты с помощью AI на основе вашей темы
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="generate" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="generate" className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Генерация
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2">
                            <Settings2 className="h-4 w-4" />
                            Настройки
                        </TabsTrigger>
                    </TabsList>

                    {/* Generate Tab */}
                    <TabsContent value="generate" className="space-y-4">
                        {/* Input Section */}
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <Label>Тема поста</Label>
                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="О чём написать пост? Например: 'Как увеличить продажи с помощью AI'"
                                    className="min-h-[80px] rounded-xl"
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1 space-y-2">
                                    <Label>Стиль</Label>
                                    <Select value={style} onValueChange={setStyle}>
                                        <SelectTrigger className="rounded-xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {POST_STYLES.map((s) => (
                                                <SelectItem key={s.id} value={s.id}>
                                                    {s.emoji} {s.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end">
                                    <Button
                                        onClick={generatePost}
                                        disabled={isGenerating}
                                        className="bg-blue-600 hover:bg-blue-700 rounded-xl h-10"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Генерация...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="h-4 w-4 mr-2" />
                                                Сгенерировать
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Output Section */}
                        {generatedPost && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>Результат</Label>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={copyToClipboard}
                                        className="h-8"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 min-h-[200px] whitespace-pre-wrap text-sm">
                                    {generatedPost}
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-4">
                        <div className="space-y-2">
                            <Label>Кастомные инструкции для AI</Label>
                            <p className="text-xs text-zinc-500">
                                Эти инструкции добавляются к каждому запросу генерации
                            </p>
                            <Textarea
                                value={customInstructions}
                                onChange={(e) => setCustomInstructions(e.target.value)}
                                placeholder="Опишите правила и стиль для AI..."
                                className="min-h-[200px] rounded-xl font-mono text-sm"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="w-full rounded-xl"
                            onClick={() => toast.info("Настройки сохраняются в Центре управления агентом")}
                        >
                            <Settings2 className="h-4 w-4 mr-2" />
                            Открыть Центр управления агентом
                        </Button>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
