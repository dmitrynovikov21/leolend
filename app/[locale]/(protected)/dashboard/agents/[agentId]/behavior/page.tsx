"use client"

import { BehaviorEditor } from "@/components/agents/behavior-editor"

export default function BehaviorPage({ params }: { params: { agentId: string } }) {
    return (
        <div className="h-full p-6">
            <BehaviorEditor agentId={params.agentId} />
        </div>
    )
}
