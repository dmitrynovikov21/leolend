"use client"

import * as React from "react"
import { FileText, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface FileEditorDialogProps {
    file: any // using any for now to be flexible with Document type
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (fileId: string | number, newContent: string) => void
}

export function FileEditorDialog({
    file,
    open,
    onOpenChange,
    onSave
}: FileEditorDialogProps) {
    // Mock content based on file name if no content provided
    const [content, setContent] = React.useState("")

    React.useEffect(() => {
        if (open && file) {
            // In a real app, this would fetch content.
            // For now, we seed it with dummy text or existing content.
            setContent(file.content || `[System]: Content for ${file.name}\n\nThis is a placeholder for the file content chunks. User can edit this text area.\n\nChunk 1:\nKey policies regarding remote work...\n\nChunk 2:\nSecurity protocols for VPN access...`)
        }
    }, [open, file])

    const handleSave = () => {
        if (file) {
            onSave(file.id, content)
            onOpenChange(false)
        }
    }

    if (!file) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Редактирование: {file.name}</DialogTitle>
                </DialogHeader>
                <div className="flex-1 py-4">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="h-full font-mono text-sm resize-none"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Отмена
                    </Button>
                    <Button onClick={() => onSave(file.id, content)}>
                        Сохранить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
