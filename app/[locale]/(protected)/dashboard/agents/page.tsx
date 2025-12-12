"use client"

import { Bot } from "lucide-react"
import { AgentWizardDialog } from "@/components/agents/agent-wizard-dialog"
import { AgentCard } from "@/components/agents/agent-card"
import { mockAgents } from "@/mocks/agents"

import { useTranslations } from "next-intl"

export default function AgentsPage() {
    const t = useTranslations('Agents');
    const hasAgents = mockAgents.length > 0

    return (
        <div className="flex flex-1 flex-col gap-8 p-6">

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{t('title')}</h1>
                    <p className="text-sm text-muted-foreground">
                        {t('description')}
                    </p>
                </div>
                <AgentWizardDialog />
            </div>

            {/* Agents Grid */}
            {hasAgents ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockAgents.map((agent) => (
                        <AgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-6 text-center p-10">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <Bot className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="max-w-md space-y-2">
                            <h3 className="text-xl font-bold">{t('noAgents')}</h3>
                            <p className="text-sm text-muted-foreground">
                                {t('noAgentsDesc')}
                            </p>
                        </div>
                        <AgentWizardDialog />
                    </div>
                </div>
            )}
        </div>
    )
}
