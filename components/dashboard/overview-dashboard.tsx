"use client"

import { useTranslations } from "next-intl"
import { MessageSquare, Wallet, Zap, TrendingUp } from "lucide-react"

import { KPICard, mockSparklineData } from "./kpi-card"
import { DialogVolumeChart } from "./dialog-volume-chart"
import { TrafficSourceChart } from "./traffic-source-chart"
import { ActiveChannels } from "./active-channels"
import { SystemEventsLog } from "./system-events-log"

export function OverviewDashboard() {
    const t = useTranslations('Dashboard')

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Top Row: KPI Cards - 4 compact cards */}
            <div className="md:col-span-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Total Dialogs */}
                    <KPICard
                        title={t('totalDialogs')}
                        value="2,350"
                        trend={{ value: 12.5, isPositive: true }}
                        icon={MessageSquare}
                        sparklineData={mockSparklineData}
                    />

                    {/* Card 2: Total Messages (NEW) */}
                    <KPICard
                        title={t('totalMessages')}
                        value="18,420"
                        trend={{ value: 8.3, isPositive: true }}
                        icon={TrendingUp}
                    />

                    {/* Card 3: Automation Rate (NEW) */}
                    <KPICard
                        title={t('automationRate')}
                        value="98%"
                        trend={{ value: 4, isPositive: true }}
                        secondaryInfo={t('dialogsWithoutHuman')}
                        icon={Zap}
                    />

                    {/* Card 4: Cost Efficiency (REFACTORED) */}
                    <KPICard
                        title={t('costEfficiency')}
                        value="₽145"
                        secondaryInfo={`${t('saved')}: ~₽4.2k`}
                        icon={Wallet}
                    />
                </div>
            </div>

            {/* Middle Row: Analytics Charts */}
            {/* Left: Traffic Dynamics (8 cols) */}
            <div className="md:col-span-8">
                <DialogVolumeChart />
            </div>

            {/* Right: Traffic Source (4 cols) */}
            <div className="md:col-span-4">
                <TrafficSourceChart />
            </div>

            {/* Bottom Row: Channels & Events */}
            {/* Left: Active Channels (8 cols) */}
            <div className="md:col-span-8">
                <ActiveChannels />
            </div>

            {/* Right: System Events Log (4 cols) */}
            <div className="md:col-span-4">
                <SystemEventsLog />
            </div>
        </div>
    )
}
