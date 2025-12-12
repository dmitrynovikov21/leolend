"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Wand2, Upload, FileText, CheckCircle2, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Schema
const agentSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    role: z.string().min(1, "Please select a role"),
    description: z.string().min(10, "Description needs to be at least 10 characters"),
    systemPrompt: z.string(),
})

type AgentFormData = z.infer<typeof agentSchema>

const steps = [
    { id: 0, title: "Mode Selection" },
    { id: 1, title: "Basics" },
    { id: 2, title: "Persona" },
    { id: 3, title: "Knowledge" },
    { id: 4, title: "Review" },
]

export function AgentWizardDialog() {
    const t = useTranslations('Agents.wizard');
    const tCommon = useTranslations('Common');

    const [open, setOpen] = React.useState(false)
    const [step, setStep] = React.useState(0)
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([])

    const form = useForm<AgentFormData>({
        resolver: zodResolver(agentSchema),
        defaultValues: {
            name: "",
            role: "",
            description: "",
            systemPrompt: "",
        },
    })

    const resetWizard = () => {
        setStep(0)
        form.reset()
        setUploadedFiles([])
        setOpen(false)
    }

    const nextStep = async () => {
        if (step === 1) {
            const result = await form.trigger(["name", "role", "description"])
            if (!result) return
        }
        setStep((prev) => Math.min(prev + 1, steps.length - 1))
    }

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 0))
    }

    const handleGeneratePersona = async () => {
        const desc = form.getValues("description")
        if (!desc) {
            toast.error(tCommon('error'), { description: t('enterDescFirst') })
            return
        }

        setIsGenerating(true)
        // Simulate API streaming
        const prompt = `You are a helpful AI assistant specialized in ${form.getValues("role") || "support"}. 
Your goal is to assist users with ${desc}. 
Maintain a professional and friendly tone. 
Always verify information before answering.`

        let currentText = ""
        const words = prompt.split(" ")

        for (let i = 0; i < words.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50))
            currentText += words[i] + " "
            form.setValue("systemPrompt", currentText)
        }

        setIsGenerating(false)
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setUploadedFiles(prev => [...prev, file.name])
            toast.success(t('fileUploaded'), { description: t('addedToKnowledge', { filename: file.name }) })
        }
    }

    const handleDeploy = () => {
        const agentName = form.getValues("name")
        toast.success(t('agentDeployed'), {
            description: t('agentReady', { name: agentName }),
        })
        resetWizard()
    }

    const WizardSelectionCard = ({
        icon: Icon,
        title,
        desc,
        onClick
    }: { icon: any, title: string, desc: string, onClick: () => void }) => (
        <div
            onClick={onClick}
            className="group relative flex cursor-pointer flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
        </div>
    )

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="shadow-md hover:shadow-lg transition-all">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t('hireNewAgent')}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl overflow-hidden sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{t('createNew')}</DialogTitle>
                    <DialogDescription>
                        {t('configureIdentity')}
                    </DialogDescription>
                </DialogHeader>

                {/* Progress Bar (Skip for Step 0) */}
                {step > 0 && (
                    <div className="mb-4 space-y-2">
                        <div className="flex justify-between text-xs font-medium text-muted-foreground">
                            <span>{t('stepOf', { step: step })}</span>
                            <span>{t('progress', { percent: Math.round((step / 4) * 100) })}</span>
                        </div>
                        <Progress value={(step / 4) * 100} className="h-2" />
                    </div>
                )}

                <div className="min-h-[400px] overflow-y-auto px-1 py-4">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid gap-6 md:grid-cols-2 pt-8"
                            >
                                <WizardSelectionCard
                                    icon={Bot}
                                    title={t('expertMode')}
                                    desc={t('expertModeDesc')}
                                    onClick={() => {
                                        toast.info(t('openingExpertMode'))
                                        setOpen(false)
                                    }}
                                />
                                <WizardSelectionCard
                                    icon={Wand2}
                                    title={t('guidedWizard')}
                                    desc={t('guidedWizardDesc')}
                                    onClick={() => setStep(1)}
                                />
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">{t('agentNameLabel')}</Label>
                                        <Input
                                            id="name"
                                            placeholder={t('agentNamePlaceholder')}
                                            {...form.register("name")}
                                        />
                                        {form.formState.errors.name && (
                                            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="role">{t('roleLabel')}</Label>
                                        <Select
                                            onValueChange={(val) => form.setValue("role", val)}
                                            defaultValue={form.getValues("role")}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('selectRole')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="support">{t('customerSupport')}</SelectItem>
                                                <SelectItem value="sales">{t('salesRep')}</SelectItem>
                                                <SelectItem value="hr">{t('hrAssistant')}</SelectItem>
                                                <SelectItem value="analyst">{t('dataAnalyst')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {form.formState.errors.role && (
                                            <p className="text-sm text-destructive">{form.formState.errors.role.message}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="desc">{t('descriptionLabel')}</Label>
                                        <Textarea
                                            id="desc"
                                            placeholder={t('descriptionPlaceholder')}
                                            className="min-h-[100px]"
                                            {...form.register("description")}
                                        />
                                        {form.formState.errors.description && (
                                            <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="rounded-lg border bg-muted/50 p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <Label className="text-base">{t('systemPersona')}</Label>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleGeneratePersona}
                                            disabled={isGenerating}
                                        >
                                            {isGenerating ? (
                                                <>{t('generating')}</>
                                            ) : (
                                                <><Wand2 className="mr-2 h-4 w-4" /> {t('autoGenerate')}</>
                                            )}
                                        </Button>
                                    </div>
                                    <Textarea
                                        value={form.watch("systemPrompt")}
                                        onChange={(e) => form.setValue("systemPrompt", e.target.value)}
                                        placeholder={t('personaPlaceholder')}
                                        className="min-h-[250px] font-mono text-sm leading-relaxed"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="rounded-lg border border-dashed p-10 text-center hover:bg-muted/50 transition-colors">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="rounded-full bg-primary/10 p-4">
                                            <Upload className="h-8 w-8 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{t('uploadKnowledgeBase')}</h3>
                                            <p className="text-sm text-muted-foreground">{t('dragDropFiles')}</p>
                                        </div>
                                        <Input
                                            type="file"
                                            className="max-w-xs cursor-pointer"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                </div>

                                {uploadedFiles.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>{t('uploadedFiles')}</Label>
                                        <div className="grid gap-2">
                                            {uploadedFiles.map((file, i) => (
                                                <div key={i} className="flex items-center gap-3 rounded-md border p-3">
                                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                                    <span className="text-sm flex-1 truncate">{file}</span>
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-6 rounded-lg border p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold">{t('agentSummary')}</h3>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-1">
                                            <Label className="text-muted-foreground">{t('name')}</Label>
                                            <div className="flex items-center gap-2 font-medium">
                                                <Bot className="h-4 w-4" />
                                                {form.getValues("name")}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-muted-foreground">{t('roleLabel')}</Label>
                                            <div className="font-medium capitalize">{form.getValues("role")}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-muted-foreground">{t('descriptionField')}</Label>
                                        <p className="text-sm">{form.getValues("description")}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-muted-foreground">{t('knowledgeBase')}</Label>
                                        <div className="flex gap-2">
                                            {uploadedFiles.length > 0 ? (
                                                uploadedFiles.map((f, i) => (
                                                    <Badge key={i} variant="secondary">{f}</Badge>
                                                ))
                                            ) : (
                                                <span className="text-sm text-muted-foreground italic">{t('noFilesUploaded')}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-muted-foreground">{t('systemPersonaField')}</Label>
                                        <div className="rounded-md bg-muted p-3 text-xs font-mono text-muted-foreground line-clamp-3">
                                            {form.getValues("systemPrompt")}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <DialogFooter className="flex items-center justify-between sm:justify-between px-1">
                    {step > 0 ? (
                        <div className="flex w-full justify-between">
                            <Button variant="ghost" onClick={prevStep}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                {t('back')}
                            </Button>
                            {step < 4 ? (
                                <Button onClick={nextStep}>
                                    {t('next')}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button onClick={handleDeploy} className="bg-emerald-600 hover:bg-emerald-700">
                                    {t('deployAgent')}
                                    <Wand2 className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="flex w-full justify-end">
                            <Button variant="ghost" onClick={() => setOpen(false)}>{t('cancel')}</Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
