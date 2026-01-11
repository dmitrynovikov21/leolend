"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

interface AgentSettingsData {
    systemInstruction?: string
    modelId?: string
    temperature?: number
    maxTokens?: number
    isActive?: boolean
}

export async function getAgentSettings() {
    try {
        let settings = await prisma.agentSettings.findUnique({
            where: { id: "singleton" }
        })

        // Create default settings if none exist
        if (!settings) {
            settings = await prisma.agentSettings.create({
                data: {
                    id: "singleton",
                    systemInstruction: `Ты — Leo, продвинутый AI-ассистент для платформы LeoAgent.
Твоя цель — помогать пользователям и отвечать на их вопросы.
Тон: Дружелюбный, профессиональный.`,
                    modelId: "claude-3-haiku-20240307",
                    temperature: 0.7,
                    maxTokens: 4096,
                    isActive: true,
                }
            })
        }

        return { success: true, data: settings }
    } catch (error) {
        console.error("Error fetching agent settings:", error)
        return { success: false, error: "Failed to fetch settings" }
    }
}

export async function updateAgentSettings(data: AgentSettingsData) {
    try {
        const settings = await prisma.agentSettings.upsert({
            where: { id: "singleton" },
            update: data,
            create: {
                id: "singleton",
                ...data,
            }
        })

        revalidatePath("/dashboard/agents")
        revalidatePath("/adminlend/agent")
        return { success: true, data: settings }
    } catch (error) {
        console.error("Error updating agent settings:", error)
        return { success: false, error: "Failed to update settings" }
    }
}
