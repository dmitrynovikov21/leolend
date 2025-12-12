"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { User, Shield, Plus, X, Wand2, Save, FileText } from "lucide-react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Schema
const behaviorSchema = z.object({
    name: z.string().min(2),
    model: z.string(),
    creativity: z.number().min(0).max(1),
    roleDefinition: z.string(),
    tone: z.array(z.string()),
    guardrails: z.array(z.object({ rule: z.string() })),
})

type BehaviorFormData = z.infer<typeof behaviorSchema>

export function BehaviorEditor({ agentId }: { agentId: string }) {
    const t = useTranslations('Behavior');
    const tCommon = useTranslations('Common');

    const toneOptions = [
        { value: "friendly", label: t('friendly') },
        { value: "professional", label: t('professional') },
        { value: "concise", label: t('concise') },
        { value: "humorous", label: t('humorous') },
        { value: "empathetic", label: t('empathetic') },
        { value: "formal", label: t('formal') },
    ]

    const [isSaving, setIsSaving] = React.useState(false)

    // Mock initial data fetch
    const defaultValues: BehaviorFormData = {
        name: "Alex Support",
        model: "gpt-4o",
        creativity: 0.5,
        roleDefinition: "You are Alex, a senior support specialist. Your goal is to help users resolve technical issues efficiently while maintaining a calm and reassuring demeanor.",
        tone: ["friendly", "concise"],
        guardrails: [
            { rule: "Never promise features that are not on the roadmap." },
            { rule: "If unsure, escalate to a human agent." },
        ],
    }

    const form = useForm<BehaviorFormData>({
        resolver: zodResolver(behaviorSchema),
        defaultValues,
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "guardrails",
    })

    const handleSave = async (data: BehaviorFormData) => {
        setIsSaving(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        setIsSaving(false)
        toast.success(t('saveChanges'), { description: t('behaviorUpdated') })
    }

    // Auto-save on blur logic could go here, or manual save for now

    return (
        <div className="max-w-4xl">
            {/* Config Form */}
            <div className="space-y-8 pb-20">
                <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">

                    {/* Header with Save */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
                            <p className="text-muted-foreground">{t('description')}</p>
                        </div>
                        <Button type="submit" disabled={isSaving} size="lg">
                            {isSaving ? t('savingChanges') : <><Save className="mr-2 h-4 w-4" /> {t('saveChanges')}</>}
                        </Button>
                    </div>

                    <Separator />

                    {/* 1. Identity Block */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <User className="h-5 w-5" /> {t('identity')}
                        </h3>
                        <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm bg-zinc-50 text-2xl hover:bg-zinc-100 hover:shadow-md transition-all duration-200 border border-zinc-100"
                                        onClick={() => {
                                            // TODO: Open emoji picker
                                            console.log('Open emoji picker')
                                        }}
                                    >
                                        😊
                                    </button>
                                    <div className="flex-1">
                                        <Label className="sr-only">{t('displayName')}</Label>
                                        <Input
                                            {...form.register("name")}
                                            placeholder={t('displayName')}
                                            className="h-10 rounded-xl border-transparent bg-zinc-100/50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all font-medium text-zinc-900 placeholder:text-zinc-400"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* 2. Parameters */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Wand2 className="h-5 w-5" /> {t('cognitiveSettings')}
                        </h3>
                        <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                            <CardContent className="pt-6 pb-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-zinc-900 font-medium">{t('creativity')}</Label>
                                        <Badge variant="outline" className="text-xs font-mono rounded-lg border-zinc-200 bg-zinc-50 text-zinc-600">
                                            {form.watch("creativity")}
                                        </Badge>
                                    </div>
                                    <Slider
                                        defaultValue={[defaultValues.creativity]}
                                        max={1}
                                        step={0.1}
                                        onValueChange={(val) => form.setValue("creativity", val[0])}
                                        className="cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-zinc-400 px-1 font-medium">
                                        <span>{t('strict')} (0.0)</span>
                                        <span>{t('balanced')} (0.5)</span>
                                        <span>{t('creative')} (1.0)</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* 3. System Instructions */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FileText className="h-5 w-5" /> {t('systemInstructions')}
                        </h3>

                        {/* Role Definition */}
                        <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <CardTitle className="text-base text-zinc-900">{t('roleDefinition')}</CardTitle>
                                    <CardDescription className="text-zinc-500">{t('roleDefinitionDesc')}</CardDescription>
                                </div>
                                <Select defaultValue="v1.2">
                                    <SelectTrigger className="w-[140px] h-9 text-xs border-transparent bg-zinc-100/50 hover:bg-zinc-100 transition-all rounded-xl focus:ring-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="v1.2">
                                            <span className="flex items-center gap-2">
                                                <span>v1.2</span>
                                                <Badge variant="secondary" className="text-[10px] h-4 px-1 py-0 border-0 bg-green-500/10 text-green-600 rounded-md">Current</Badge>
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="v1.1">
                                            <span className="text-muted-foreground">v1.1 (Yesterday)</span>
                                        </SelectItem>
                                        <SelectItem value="v1.0">
                                            <span className="text-muted-foreground">v1.0 (Dec 10)</span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <Textarea
                                    className="min-h-[150px] font-mono text-sm leading-relaxed border-transparent bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all rounded-xl resize-none text-zinc-800"
                                    {...form.register("roleDefinition")}
                                />
                            </CardContent>
                        </Card>

                        {/* Tone of Voice */}
                        <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base text-zinc-900">{t('toneOfVoice')}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <div className="flex flex-wrap gap-2">
                                    {toneOptions.map((tone) => {
                                        const currentTones = form.watch("tone")
                                        const isSelected = currentTones.includes(tone.value)
                                        return (
                                            <button
                                                key={tone.value}
                                                type="button"
                                                className={cn(
                                                    "px-4 py-2 rounded-xl border transition-all duration-200 text-sm font-medium",
                                                    isSelected
                                                        ? "border-zinc-900 bg-zinc-900 text-white shadow-md hover:bg-zinc-800"
                                                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                                                )}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        form.setValue("tone", currentTones.filter(t => t !== tone.value))
                                                    } else {
                                                        form.setValue("tone", [...currentTones, tone.value])
                                                    }
                                                }}
                                            >
                                                {tone.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Guardrails */}
                        <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base text-zinc-900 flex items-center justify-between">
                                    <span>{t('guardrails')}</span>
                                    <Badge variant="secondary" className="font-normal text-xs text-zinc-500 bg-zinc-100 border-0 rounded-lg px-2 shadow-none">
                                        {fields.length} {t('activeRules')}
                                    </Badge>
                                </CardTitle>
                                <CardDescription className="text-zinc-500">{t('guardrailsDesc')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 pb-6">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-center gap-2">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100">
                                            <Shield className="h-4 w-4" />
                                        </div>
                                        <Input
                                            {...form.register(`guardrails.${index}.rule` as const)}
                                            className="flex-1 border-transparent bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all rounded-xl text-zinc-900"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            className="text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-full mt-2 border-zinc-200/50 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-600 rounded-xl shadow-none h-10 border-dashed"
                                    onClick={() => append({ rule: t('newGuardrailRule') })}
                                >
                                    <Plus className="h-4 w-4 mr-2" /> {t('addGuardrail')}
                                </Button>
                            </CardContent>
                        </Card>
                    </section>
                </form>
            </div>
        </div>
    )
}
