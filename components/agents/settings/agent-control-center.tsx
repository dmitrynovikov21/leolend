"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, Save, RefreshCw, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { getAgentSettings, updateAgentSettings } from "@/actions/agent-settings"

const AVAILABLE_MODELS = [
    { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku (Fast)" },
    { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
    { id: "claude-sonnet-4-5-20250929", name: "Claude 4.5 Sonnet (Latest)" },
]

interface AgentSettings {
    id: string
    systemInstruction: string | null
    modelId: string
    temperature: number
    maxTokens: number
    isActive: boolean
}

export function AgentControlCenter() {
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSaving, setIsSaving] = React.useState(false)
    const [settings, setSettings] = React.useState<AgentSettings | null>(null)

    // Form state
    const [systemInstruction, setSystemInstruction] = React.useState("")
    const [modelId, setModelId] = React.useState("claude-3-haiku-20240307")
    const [temperature, setTemperature] = React.useState(0.7)
    const [maxTokens, setMaxTokens] = React.useState(4096)
    const [isActive, setIsActive] = React.useState(true)

    // Load settings on mount
    React.useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        setIsLoading(true)
        try {
            const result = await getAgentSettings()
            if (result.success && result.data) {
                const data = result.data
                setSettings(data)
                setSystemInstruction(data.systemInstruction || "")
                setModelId(data.modelId)
                setTemperature(data.temperature)
                setMaxTokens(data.maxTokens)
                setIsActive(data.isActive)
            }
        } catch (error) {
            toast.error("Не удалось загрузить настройки агента")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const result = await updateAgentSettings({
                systemInstruction,
                modelId,
                temperature,
                maxTokens,
                isActive,
            })

            if (result.success) {
                toast.success("Настройки агента сохранены!")
            } else {
                throw new Error(result.error)
            }
        } catch (error) {
            toast.error("Не удалось сохранить настройки")
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-500" />
                        Центр управления агентом
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">
                        Настройте поведение AI-агента. Все изменения сохраняются в базу данных.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={loadSettings}
                        disabled={isLoading}
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Обновить
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {isSaving ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4 mr-2" />
                        )}
                        Сохранить
                    </Button>
                </div>
            </div>

            {/* Status Toggle */}
            <Card className="border border-zinc-200/50 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="font-medium text-zinc-900">Статус агента</Label>
                            <p className="text-sm text-zinc-500">
                                {isActive ? "Агент активен и обрабатывает запросы" : "Агент отключён"}
                            </p>
                        </div>
                        <Switch
                            checked={isActive}
                            onCheckedChange={setIsActive}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* System Instructions */}
            <Card className="border border-zinc-200/50 shadow-sm bg-white rounded-2xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-zinc-900">
                        Системные инструкции
                    </CardTitle>
                    <CardDescription>
                        Определите роль, тон и поведение агента
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    <Textarea
                        value={systemInstruction}
                        onChange={(e) => setSystemInstruction(e.target.value)}
                        placeholder="Опишите роль агента, его цели и поведение..."
                        className="min-h-[200px] rounded-xl border-zinc-200 focus:border-blue-300 focus:ring-blue-200"
                    />
                </CardContent>
            </Card>

            {/* Model Settings */}
            <Card className="border border-zinc-200/50 shadow-sm bg-white rounded-2xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-zinc-900">
                        Модель AI
                    </CardTitle>
                    <CardDescription>
                        Выберите модель и настройте параметры генерации
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                    {/* Model Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="model">Модель</Label>
                        <Select value={modelId} onValueChange={setModelId}>
                            <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Выберите модель" />
                            </SelectTrigger>
                            <SelectContent>
                                {AVAILABLE_MODELS.map((model) => (
                                    <SelectItem key={model.id} value={model.id}>
                                        {model.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Temperature */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Температура</Label>
                            <span className="text-sm text-zinc-500 font-mono">{temperature.toFixed(1)}</span>
                        </div>
                        <Slider
                            value={[temperature]}
                            onValueChange={([val]) => setTemperature(val)}
                            min={0}
                            max={1}
                            step={0.1}
                            className="w-full"
                        />
                        <p className="text-xs text-zinc-400">
                            Низкое значение = более точные ответы. Высокое = более креативные.
                        </p>
                    </div>

                    {/* Max Tokens */}
                    <div className="space-y-2">
                        <Label htmlFor="maxTokens">Макс. токенов</Label>
                        <Input
                            id="maxTokens"
                            type="number"
                            value={maxTokens}
                            onChange={(e) => setMaxTokens(parseInt(e.target.value) || 1000)}
                            min={100}
                            max={8192}
                            className="rounded-xl"
                        />
                        <p className="text-xs text-zinc-400">
                            Максимальная длина ответа агента (100-8192)
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
