"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
// @ts-ignore
import pdf from "pdf-parse"
import mammoth from "mammoth"
import { KnowledgeFile } from "./knowledge-core"

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export async function uploadKnowledgeFile(formData: FormData) {
    try {
        const file = formData.get("file") as File
        if (!file) throw new Error("No file provided")

        const buffer = Buffer.from(await file.arrayBuffer())
        let textContent = ""

        if (file.type === "application/pdf") {
            const data = await pdf(buffer)
            textContent = data.text
        } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const result = await mammoth.extractRawText({ buffer })
            textContent = result.value
        } else if (file.type === "text/plain" || file.type === "application/json" || file.type === "text/markdown") {
            textContent = buffer.toString("utf-8")
        } else {
            // Fallback for other types
            textContent = buffer.toString("utf-8")
        }

        const newFile: KnowledgeFile = {
            id: crypto.randomUUID(),
            name: file.name,
            content: textContent,
            size: formatBytes(file.size),
            active: true,
            type: "file",
            mimeType: file.type
        }

        const settings = await prisma.agentSettings.findUnique({
            where: { id: "singleton" }
        })

        const currentFiles = (settings?.ragFiles as any as KnowledgeFile[]) || []
        const updatedFiles = [...currentFiles, newFile]

        await prisma.agentSettings.upsert({
            where: { id: "singleton" },
            create: {
                ragFiles: updatedFiles as any
            },
            update: {
                ragFiles: updatedFiles as any
            }
        })

        revalidatePath("/adminlend/agent")
        return { success: true, data: newFile }

    } catch (error: any) {
        console.error("Upload error:", error)
        return { success: false, error: error.message }
    }
}
