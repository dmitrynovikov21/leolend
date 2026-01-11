"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export interface KnowledgeFile {
    id: string
    name: string
    content: string
    size: string
    active: boolean
    type: "file" | "note"
    mimeType?: string
}

export async function deleteKnowledgeFile(fileId: string) {
    try {
        const settings = await prisma.agentSettings.findUnique({ where: { id: "singleton" } })
        if (!settings) return { success: false, error: "Settings not found" }

        const currentFiles = (settings.ragFiles as any as KnowledgeFile[]) || []
        const updatedFiles = currentFiles.filter(f => f.id !== fileId)

        await prisma.agentSettings.update({
            where: { id: "singleton" },
            data: { ragFiles: updatedFiles as any }
        })

        revalidatePath("/adminlend/agent")
        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function toggleKnowledgeFile(fileId: string) {
    try {
        const settings = await prisma.agentSettings.findUnique({ where: { id: "singleton" } })
        if (!settings) return { success: false, error: "Settings not found" }

        const currentFiles = (settings.ragFiles as any as KnowledgeFile[]) || []
        const updatedFiles = currentFiles.map(f =>
            f.id === fileId ? { ...f, active: !f.active } : f
        )

        await prisma.agentSettings.update({
            where: { id: "singleton" },
            data: { ragFiles: updatedFiles as any }
        })

        revalidatePath("/adminlend/agent")
        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function updateKnowledgeFile(updatedFile: KnowledgeFile) {
    try {
        console.log("Updating knowledge file:", updatedFile.id)
        const settings = await prisma.agentSettings.findUnique({ where: { id: "singleton" } })

        let currentFiles: KnowledgeFile[] = []
        if (settings && settings.ragFiles) {
            currentFiles = settings.ragFiles as any as KnowledgeFile[]
        }

        // Check if file exists to decide update vs create
        const exists = currentFiles.find(f => f.id === updatedFile.id)

        let newFiles: KnowledgeFile[]
        if (exists) {
            newFiles = currentFiles.map(f => f.id === updatedFile.id ? updatedFile : f)
        } else {
            console.log("File not found, creating new:", updatedFile.id)
            newFiles = [...currentFiles, updatedFile]
        }

        // Ensure purely JSON compatible data
        const safeFiles = JSON.parse(JSON.stringify(newFiles))

        await prisma.agentSettings.upsert({
            where: { id: "singleton" },
            create: {
                ragFiles: safeFiles
            },
            update: {
                ragFiles: safeFiles
            }
        })

        revalidatePath("/adminlend/agent")
        return { success: true }
    } catch (error: any) {
        console.error("Update error:", error)
        return { success: false, error: error.message }
    }
}
