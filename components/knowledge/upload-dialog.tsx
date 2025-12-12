"use client"

import * as React from "react"
import { UploadCloud, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface UploadDialogProps {
    trigger?: React.ReactNode
}

export function UploadDialog({ trigger }: UploadDialogProps) {
    const [open, setOpen] = React.useState(false)
    const [isDragging, setIsDragging] = React.useState(false)
    const [isUploaded, setIsUploaded] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setIsUploaded(true)
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsUploaded(true)
        }
    }

    React.useEffect(() => {
        if (open) {
            setIsUploaded(false)
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {!isUploaded ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Загрузка знаний</DialogTitle>
                            <DialogDescription>
                                Добавьте документы в базу знаний. Поддерживаются PDF, TXT, DOCX.
                            </DialogDescription>
                        </DialogHeader>
                        <div
                            className={cn(
                                "border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer",
                                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileInput}
                                multiple
                            />
                            <div className="p-4 rounded-full bg-muted/50">
                                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="text-center space-y-1">
                                <p className="text-sm font-medium">Перетащите файлы сюда</p>
                                <p className="text-xs text-muted-foreground">или нажмите для выбора</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center py-10 space-y-4">
                            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="font-semibold text-lg">Файл загружен!</h3>
                                <p className="text-sm text-muted-foreground">
                                    Система уже обрабатывает и индексирует документ.
                                </p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setOpen(false)} className="w-full">
                                Готово
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
