"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Settings2, UploadCloud, Zap, Table as TableIcon, Sparkles, Filter, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SpaceSelector } from "@/components/knowledge/space-selector"
import { DocumentsTable } from "@/components/knowledge/documents-table"
import { UploadDialog } from "@/components/knowledge/upload-dialog"
import { NoteEditorDialog } from "@/components/knowledge/note-editor-dialog"
import { FileEditorDialog } from "@/components/knowledge/file-editor-dialog"

export default function KnowledgePage({ params }: { params: { agentId: string } }) {
    const t = useTranslations('Knowledge')

    // State for Notes
    const [notes, setNotes] = React.useState([
        {
            id: 1,
            title: "WiFi и Безопасность",
            content: "Пароль от офисной сети 'SecurePass2025'. VPN требуется для внешнего доступа.",
        },
        {
            id: 2,
            title: "Миссия Компании",
            content: "Ускорить переход мира к устойчивой энергетике через широкое внедрение.",
        },
        {
            id: 3,
            title: "Экстренные Контакты",
            content: "IT Поддержка: +1-555-0123. HR Горячая линия: +1-555-0199. Офис-менеджер: Сара Дж.",
        },
    ])

    const [editingNote, setEditingNote] = React.useState<any>(null)
    const [editingFile, setEditingFile] = React.useState<any>(null)
    const [isCreateOpen, setIsCreateOpen] = React.useState(false)

    const handleCreate = (newNote: any) => {
        setNotes([...notes, { ...newNote, id: Date.now() }])
    }

    const handleUpdate = (updatedNote: any) => {
        setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n))
    }

    const handleDelete = (id: any) => {
        setNotes(notes.filter(n => n.id !== id))
    }

    return (
        <div className="h-full flex flex-col space-y-6">
            {/* 1. Header: Space Context */}
            <div className="flex flex-col gap-2 border-b pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SpaceSelector />
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                            <UploadCloud className="mr-2 h-4 w-4" /> Новое пространство
                        </Button>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                    <span>15 Файлов</span>
                    <span>•</span>
                    <span>3 Важные заметки</span>
                    <span>•</span>
                    <span>Синхронизировано 2м назад</span>
                </div>
            </div>

            {/* 2. Actions */}
            <div className="flex items-center gap-2">
                <UploadDialog
                    trigger={
                        <Button className="shadow-sm">
                            <UploadCloud className="mr-2 h-4 w-4" />
                            Загрузить файлы
                        </Button>
                    }
                />

                <NoteEditorDialog
                    mode="create"
                    open={isCreateOpen}
                    onOpenChange={setIsCreateOpen}
                    onSave={handleCreate}
                    trigger={
                        <Button variant="secondary" className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 border border-yellow-500/20 shadow-sm">
                            <Zap className="mr-2 h-4 w-4" />
                            Создать заметку
                        </Button>
                    }
                />

                <Button variant="outline" className="text-muted-foreground">
                    <TableIcon className="mr-2 h-4 w-4" />
                    Подключить таблицу
                </Button>
            </div>

            {/* 3. High Priority Zone - Core Notes */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Zap size={14} className="text-yellow-600" />
                    ВАЖНЫЕ ЗАМЕТКИ (Высокий приоритет)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {notes.map((note) => (
                        <div key={note.id} onClick={() => setEditingNote(note)} className="block group cursor-pointer">
                            <Card className="h-full border-l-4 border-l-yellow-400 bg-white hover:bg-zinc-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl border-zinc-200/50">
                                <CardHeader className="py-4 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-sm font-semibold text-zinc-900">
                                            {note.title}
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="text-xs line-clamp-3 text-zinc-500 leading-relaxed">
                                        {note.content}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Note Editor Dialog (Controlled by State) */}
            <NoteEditorDialog
                mode="edit"
                open={!!editingNote}
                onOpenChange={(open) => !open && setEditingNote(null)}
                note={editingNote}
                onSave={handleUpdate}
                onDelete={handleDelete}
            />

            {/* 4. Main Index - Knowledge Assets */}
            <div className="space-y-4 pt-2 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Все ресурсы</h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Input
                                placeholder="Поиск файлов..."
                                className="h-9 w-[240px] border-0 shadow-sm bg-muted/20 focus-visible:bg-muted/30 pl-3"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="h-9 border-0 shadow-sm bg-muted/20 hover:bg-muted/30 text-muted-foreground">
                            <Filter size={14} className="mr-2" /> Фильтр
                        </Button>
                    </div>
                </div>

                {/* Scrollable Table Area */}
                <div className="rounded-md border-0 bg-background/50 flex-1 overflow-hidden">
                    <DocumentsTable
                        onRowClick={(doc) => setEditingFile(doc)}
                        onInspect={(doc) => setEditingFile(doc)}
                    />
                </div>
            </div>

            {/* File Editor Dialog */}
            <FileEditorDialog
                open={!!editingFile}
                onOpenChange={(open) => !open && setEditingFile(null)}
                file={editingFile}
                onSave={(id, content) => {
                    console.log(`Saving content for file ${id}:`, content)
                    setEditingFile(null)
                    // In real app, update file content via API
                }}
            />
        </div>
    )
}

