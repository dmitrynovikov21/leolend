import { AgentSchedule } from "@/components/agents/settings/agent-schedule"
import { FriendlyDangerZone } from "@/components/agents/settings/friendly-danger-zone"
import { GeneralAgentSettings } from "@/components/agents/settings/general-agent-settings"
import { Separator } from "@/components/ui/separator"

export default function AgentSettingsPage() {
    return (
        <div className="space-y-6">
            <GeneralAgentSettings />
            <AgentSchedule />
            <FriendlyDangerZone />
        </div>
    )
}
