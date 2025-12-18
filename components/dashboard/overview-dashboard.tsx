"use client"

import { useTranslations } from "next-intl"
import { MessageSquare, Wallet, Zap, TrendingUp } from "lucide-react"

import { useUser } from "@/components/providers/user-data-provider"
import { KPICard, mockSparklineData } from "./kpi-card"
import { DialogVolumeChart } from "./dialog-volume-chart"
import { TrafficSourceChart } from "./traffic-source-chart"
import { ActiveChannels } from "./active-channels"
import { SystemEventsLog } from "./system-events-log"

export function OverviewDashboard() {
    const t = useTranslations('Dashboard')
    const { userData, isLoading } = useUser()

    const getKpi = (id: string) => userData?.dashboard.kpis.find(k => k.id === id)

    // Icon map
    const iconMap: Record<string, any> = {
        'message-square': MessageSquare,
        'trending-up': TrendingUp,
        'zap': Zap,
        'wallet': Wallet
    }

    if (isLoading || !userData) {
        return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-zinc-100 animate-pulse rounded-2xl" />)}
        </div>
    }

    const kpi1 = getKpi('total-dialogs')
    const kpi2 = getKpi('total-messages')
    const kpi3 = getKpi('automation-rate')
    const kpi4 = getKpi('cost-efficiency')

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Top Row: KPI Cards - 4 compact cards */}
            <div className="md:col-span-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Total Dialogs */}
                    {kpi1 && <KPICard
                        title={t('totalDialogs')}
                        value={kpi1.value}
                        trend={{ value: kpi1.change, isPositive: kpi1.trend === 'up' }}
                        icon={iconMap[kpi1.icon] || MessageSquare}
                        sparklineData={mockSparklineData}
                    />}

                    {/* Card 2: Total Messages */}
                    {kpi2 && <KPICard
                        title={t('totalMessages')}
                        value={kpi2.value}
                        trend={{ value: kpi2.change, isPositive: kpi2.trend === 'up' }}
                        icon={iconMap[kpi2.icon] || TrendingUp}
                    />}

                    {/* Card 3: Automation Rate */}
                    {kpi3 && <KPICard
                        title={t('automationRate')}
                        value={kpi3.value}
                        trend={{ value: kpi3.change, isPositive: kpi3.trend === 'up' }}
                        secondaryInfo={t('dialogsWithoutHuman')}
                        icon={iconMap[kpi3.icon] || Zap}
                    />}

                    {/* Card 4: Cost Efficiency */}
                    {kpi4 && <KPICard
                        title={t('costEfficiency')}
                        value={kpi4.value}
                        secondaryInfo={`${t('saved')}: ~₽4.2k`} // Could be dynamic too
                        icon={iconMap[kpi4.icon] || Wallet}
                    />}
                </div>
            </div>

            {/* Middle Row: Analytics Charts */}
            {/* Left: Traffic Dynamics (8 cols) */}
            <div className="md:col-span-8">
                <DialogVolumeChart data={userData.dashboard.charts.volume} />
            </div>

            {/* Right: Traffic Source (4 cols) */}
            <div className="md:col-span-4">
                <TrafficSourceChart data={userData.dashboard.charts.trafficSources} />
            </div>

            {/* Bottom Row: Channels & Events */}
            {/* Left: Active Channels (8 cols) */}
            <div className="md:col-span-8">
                <ActiveChannels channels={userData.dashboard.activeChannels} />
            </div>

            {/* Right: System Events Log (4 cols) */}
            <div className="md:col-span-4">
                <SystemEventsLog events={userData.dashboard.systemEvents} />
            </div>
        </div>
    )
}
