"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { UploadCloud, Zap, Table as TableIcon, Sparkles, Filter, Lock, ChevronLeft, Check } from "lucide-react"

import { mockDocuments } from "@/mocks/documents"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmojiAvatar } from "@/components/shared/emoji-avatar"
import { SpaceSelector } from "@/components/knowledge/space-selector"
import { DocumentsTable } from "@/components/knowledge/documents-table"
import { UploadDialog } from "@/components/knowledge/upload-dialog"
import { NoteEditorDialog } from "@/components/knowledge/note-editor-dialog"
import { FileEditorDialog } from "@/components/knowledge/file-editor-dialog"
import { TableEditorDialog } from "@/components/knowledge/table-editor-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function GlobalKnowledgeView() {
    const t = useTranslations('Knowledge');

    // State for Notes
    const [notes, setNotes] = React.useState([
        {
            id: 1,
            title: "Глобальная HR Политика",
            content: "Стандартная политика отпусков обновлена на 2025 год. 28 дней ежегодного отпуска.",
        },
        {
            id: 2,
            title: "Бренд-бук",
            content: "Используйте hex #FF5500 для основных действий. Логотип должен иметь отступ 20px.",
        },
        {
            id: 3,
            title: "API Ключи",
            content: "Продакшн ключи ротируются ежемесячно. Свяжитесь с DevOps для доступа.",
        },
    ])

    const [editingNote, setEditingNote] = React.useState<any>(null)
    const [editingFile, setEditingFile] = React.useState<any>(null)
    const [editingTable, setEditingTable] = React.useState<any>(null)
    const [isCreateOpen, setIsCreateOpen] = React.useState(false)
    const [isCreateSpaceOpen, setIsCreateSpaceOpen] = React.useState(false)
    const [newSpaceEmoji, setNewSpaceEmoji] = React.useState("📁")

    const handleCreate = (newNote: any) => {
        setNotes([...notes, { ...newNote, id: Date.now() }])
    }

    const handleUpdate = (updatedNote: any) => {
        setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n))
    }

    const handleDelete = (id: any) => {
        setNotes(notes.filter(n => n.id !== id))
    }

    const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null)
    const [filterType, setFilterType] = React.useState<'all' | 'folder' | 'document' | 'spreadsheet' | 'note'>('all')

    // Filter documents based on current folder
    // In a real app this would be a server action or API call
    const currentDocuments = mockDocuments.filter(doc => doc.parentId === currentFolderId)
    // const currentDocuments = mockDocuments // Show all docs for MVP
    const currentFolder = mockDocuments.find(d => d.id === currentFolderId)

    // Apply type filter
    const filteredDocuments = currentDocuments.filter(doc => {
        if (filterType === 'all') return true
        if (filterType === 'document') return ['pdf', 'docx', 'txt'].includes(doc.type)
        if (filterType === 'note') return ['md'].includes(doc.type)
        return doc.type === filterType
    })

    const handleFileClick = (doc: any) => {
        if (doc.type === 'folder') {
            setCurrentFolderId(doc.id)
            return
        }

        if (doc.type === 'spreadsheet') {
            setEditingTable(doc)
        } else {
            setEditingFile(doc)
        }
    }

    const handleBack = () => {
        setCurrentFolderId(null)
    }

    return (
        <div className="h-full flex flex-col space-y-6 p-6">
            {/* 1. Header: Space Context */}
            <div className="flex flex-col gap-2 border-b border-zinc-200/50 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Show specific folder title as the "Space" if deep inside, or default selector */}
                        {currentFolderId && currentFolder ? (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8 -ml-2">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-lg font-semibold">{currentFolder.name}</span>
                            </div>
                        ) : (
                            <SpaceSelector
                                value={currentFolderId || 'desktop'}
                                onValueChange={(val) => {
                                    if (val === 'desktop') setCurrentFolderId(null)
                                    else setCurrentFolderId(val)
                                }}
                            />
                        )}

                        {!currentFolderId && (
                            <Dialog open={isCreateSpaceOpen} onOpenChange={setIsCreateSpaceOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 rounded-xl bg-white border-dashed border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 shadow-sm">
                                        <Sparkles className="mr-2 h-4 w-4 text-zinc-500" /> Создать пространство
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Создать пространство</DialogTitle>
                                        <DialogDescription>
                                            Создайте новое пространство для организации базы знаний.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="flex items-center gap-4">
                                            <EmojiAvatar
                                                value={newSpaceEmoji}
                                                onChange={setNewSpaceEmoji}
                                                editable
                                                size="lg"
                                                className="h-16 w-16 text-3xl border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40"
                                            />
                                            <div className="grid gap-2 flex-1">
                                                <Label htmlFor="space-name">Название</Label>
                                                <Input id="space-name" placeholder="например, HR" />
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={() => setIsCreateSpaceOpen(false)}>Создать</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                    <span>{filteredDocuments.length} Файлов</span>
                    <span>•</span>
                    <span>12 Заметок</span>
                    <span>•</span>
                    <span>{currentFolderId ? currentFolder?.name : 'Рабочий стол'}</span>
                </div>
            </div>

            {/* ... Actions and Notes remain same ... */}

            {/* 4. Main Index - Knowledge Assets */}
            <div className="space-y-4 pt-2 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Все ресурсы</h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Input
                                placeholder="Поиск файлов..."
                                className="h-9 w-[240px] rounded-xl border-transparent bg-zinc-100/50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all font-medium text-zinc-900 pl-3 shadow-none placeholder:text-zinc-400"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-9 rounded-xl border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 shadow-sm">
                                    <Filter size={14} className="mr-2" /> Фильтр
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px]">
                                <DropdownMenuLabel>Тип содержимого</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setFilterType('all')}>
                                    <Check className={cn("mr-2 h-4 w-4", filterType === 'all' ? "opacity-100" : "opacity-0")} />
                                    Все
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterType('folder')}>
                                    <Check className={cn("mr-2 h-4 w-4", filterType === 'folder' ? "opacity-100" : "opacity-0")} />
                                    Папки
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterType('document')}>
                                    <Check className={cn("mr-2 h-4 w-4", filterType === 'document' ? "opacity-100" : "opacity-0")} />
                                    Документы
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterType('spreadsheet')}>
                                    <Check className={cn("mr-2 h-4 w-4", filterType === 'spreadsheet' ? "opacity-100" : "opacity-0")} />
                                    Таблицы
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterType('note')}>
                                    <Check className={cn("mr-2 h-4 w-4", filterType === 'note' ? "opacity-100" : "opacity-0")} />
                                    Заметки
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="rounded-md border-0 flex-1 overflow-hidden">
                    <DocumentsTable
                        docs={filteredDocuments} // Pass filtered docs
                        onRowClick={handleFileClick}
                        onInspect={handleFileClick}
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
                }}
            />

            {/* Table Editor Dialog */}
            <TableEditorDialog
                open={!!editingTable}
                onOpenChange={(open) => !open && setEditingTable(null)}
                file={editingTable}
                onSave={(id, data) => {
                    console.log(`Saving table for file ${id}:`, data)
                    setEditingTable(null)
                }}
            />
        </div>
    )
}
