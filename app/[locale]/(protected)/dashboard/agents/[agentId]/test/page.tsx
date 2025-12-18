"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

import { AutoTestRunner } from "@/components/agents/testing/auto-test-runner"
import { ManualTestInterface } from "@/components/testing/manual-test-interface"
import { FeedbackPanel, FeedbackItem } from "@/components/agents/testing/feedback-panel"
import { toast } from "sonner"

export default function TestingPage() {
    const t = useTranslations('Testing');

    // Lifted Feedback State
    const [feedbackItems, setFeedbackItems] = React.useState<FeedbackItem[]>([])
    const [isFixing, setIsFixing] = React.useState(false)

    const handleFeedbackSubmit = (text: string) => {
        const newItem: FeedbackItem = {
            id: Date.now(),
            text,
            status: 'pending',
            timestamp: new Date()
        }
        setFeedbackItems(prev => [newItem, ...prev])
        toast.success("Feedback added", { description: "Added to Improvements Queue" })
    }

    const handleFixFeedback = async () => {
        setIsFixing(true)
        // Simulate API call to tune model
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Mark all pending as fixed
        setFeedbackItems(prev => prev.map(item => ({ ...item, status: 'fixed' })))
        setIsFixing(false)
        toast.success("Instructions Updated", { description: "Agent system prompt has been optimized based on your feedback." })
    }

    return (
        <div className="h-[calc(100vh-3.5rem)] bg-background p-2 overflow-hidden">
            <div className="h-full bg-white rounded-[24px] border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col">
                <ResizablePanelGroup direction="horizontal" className="flex-1">
                    {/* LEFT PANEL: Test Runner */}
                    <ResizablePanel defaultSize={70} minSize={30}>
                        <div className="h-full flex flex-col p-4">
                            <Tabs defaultValue="manual" className="h-full flex flex-col">
                                <div className="flex items-center justify-between mb-2 px-1">
                                    <div className="mb-2">
                                        <h2 className="text-xl font-semibold tracking-tight text-zinc-950">{t('qaLab')}</h2>
                                        <p className="text-xs text-zinc-500 mt-0.5">{t('testDebugCertify')}</p>
                                    </div>
                                    <TabsList className="bg-zinc-100/80 p-0.5 rounded-full inline-flex self-start scale-90 origin-right">
                                        <TabsTrigger value="manual" className="rounded-full px-3 py-1 text-xs data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-sm text-zinc-500 font-medium transition-all">{t('manualTest')}</TabsTrigger>
                                        <TabsTrigger value="auto" className="rounded-full px-3 py-1 text-xs data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-sm text-zinc-500 font-medium transition-all">{t('autoStressTest')}</TabsTrigger>
                                    </TabsList>
                                </div>

                                <div className="flex-1 overflow-hidden relative rounded-2xl border-0 bg-white mt-4">
                                    <TabsContent value="manual" className="h-full m-0 border-0 p-0">
                                        <ManualTestInterface onFeedbackSubmit={handleFeedbackSubmit} />
                                    </TabsContent>
                                    <TabsContent value="auto" className="h-full m-0 border-0 p-6 overflow-y-auto">
                                        <AutoTestRunner />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle className="bg-zinc-100 w-[1px]" />

                    {/* RIGHT PANEL: Feedback Queue (Replacing Debugger) */}
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                        <FeedbackPanel
                            feedbackItems={feedbackItems}
                            onFixFeedback={handleFixFeedback}
                            onManualAdd={handleFeedbackSubmit}
                            isFixing={isFixing}
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}
