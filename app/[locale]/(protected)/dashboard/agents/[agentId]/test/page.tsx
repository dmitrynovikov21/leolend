"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

import { AutoTestRunner } from "@/components/agents/testing/auto-test-runner"
import { DebugPanel } from "@/components/agents/testing/debug-panel"
import { ManualTestInterface } from "@/components/testing/manual-test-interface"

export default function TestingPage() {
    const t = useTranslations('Testing');
    return (
        <div className="h-full overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
                {/* LEFT PANEL: Test Runner */}
                <ResizablePanel defaultSize={70} minSize={30}>
                    <div className="h-full flex flex-col p-6">
                        <Tabs defaultValue="manual" className="h-full flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">{t('qaLab')}</h2>
                                    <p className="text-muted-foreground">{t('testDebugCertify')}</p>
                                </div>
                                <TabsList>
                                    <TabsTrigger value="manual">{t('manualTest')}</TabsTrigger>
                                    <TabsTrigger value="auto">{t('autoStressTest')}</TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="flex-1 overflow-hidden relative rounded-lg border bg-background shadow-sm">
                                <TabsContent value="manual" className="h-full m-0 border-0 p-0">
                                    <ManualTestInterface />
                                </TabsContent>
                                <TabsContent value="auto" className="h-full m-0 border-0 p-6 overflow-y-auto">
                                    <AutoTestRunner />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* RIGHT PANEL: Debugger */}
                <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                    <DebugPanel />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
