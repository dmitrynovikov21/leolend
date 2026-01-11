import { AgentSchedule } from "@/components/agents/settings/agent-schedule"
import { FriendlyDangerZone } from "@/components/agents/settings/friendly-danger-zone"
import { GeneralAgentSettings } from "@/components/agents/settings/general-agent-settings"
import { AgentControlCenter } from "@/components/agents/settings/agent-control-center"
import { Separator } from "@/components/ui/separator"

export default function AgentSettingsPage() {
    return (
        <div className="space-y-8">
            <GeneralAgentSettings />
            <Separator className="my-6" />
            <AgentControlCenter />
            <Separator className="my-6" />
            <AgentSchedule />
            <FriendlyDangerZone />
        </div>
    )
}

