"use client"

import * as React from "react"
import { CheckCircle2, Circle, Clock, Sparkles, Plus } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export interface FeedbackItem {
    id: number
    text: string
    status: 'pending' | 'fixed'
    timestamp: Date
}

interface FeedbackPanelProps {
    feedbackItems: FeedbackItem[]
    onFixFeedback: () => void
    onManualAdd: (text: string) => void
    isFixing: boolean
}

export function FeedbackPanel({ feedbackItems, onFixFeedback, onManualAdd, isFixing }: FeedbackPanelProps) {
    const pendingCount = feedbackItems.filter(i => i.status === 'pending').length
    const [isAddOpen, setIsAddOpen] = React.useState(false)
    const [manualText, setManualText] = React.useState("")

    const handleManualSubmit = () => {
        if (manualText.trim()) {
            onManualAdd(manualText)
            setManualText("")
            setIsAddOpen(false)
        }
    }

    return (
        <div className="flex h-full flex-col border-l border-zinc-100 bg-white relative">
            {/* Header */}
            <div className="flex h-12 items-center justify-between border-b border-zinc-100 px-4">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Improvements Queue</span>
                <Badge variant="secondary" className="bg-zinc-50 text-zinc-600 rounded-md px-2 text-[10px] font-medium border border-zinc-100">
                    {pendingCount} PENDING
                </Badge>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-hidden relative">
                {feedbackItems.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white">
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="h-14 w-14 rounded-full bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center mb-4 transition-all cursor-pointer group shadow-sm hover:shadow-md border border-zinc-100"
                        >
                            <Plus className="h-6 w-6 text-zinc-300 group-hover:text-zinc-600 transition-colors" />
                        </button>
                        <h3 className="text-sm font-medium text-zinc-900 mb-1">Queue Empty</h3>
                        <p className="text-xs text-zinc-400 max-w-[180px] leading-relaxed">
                            Report issues in the chat or manually add feedback items.
                        </p>
                    </div>
                ) : (
                    <ScrollArea className="h-full pb-20"> {/* pb-20 for floating footer space */}
                        <div className="p-4 space-y-3">
                            {feedbackItems.map((item) => (
                                <Card key={item.id} className="p-3 bg-white border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-xl group hover:border-zinc-200 transition-all">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5">
                                            {item.status === 'pending' ? (
                                                <Clock className="h-3.5 w-3.5 text-amber-500" />
                                            ) : (
                                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm text-zinc-700 leading-snug font-medium">{item.text}</p>
                                            <p className="text-[10px] text-zinc-400 font-mono">
                                                {item.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {/* Small add button when list is not empty */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-xs text-zinc-400 hover:text-zinc-900 border border-dashed border-zinc-200 hover:border-zinc-300 h-9 font-normal rounded-xl hover:bg-zinc-50"
                                onClick={() => setIsAddOpen(true)}
                            >
                                <Plus className="h-3 w-3 mr-2" /> Add another item manually
                            </Button>
                        </div>
                    </ScrollArea>
                )}
            </div>

            {/* Floating Footer Action */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center px-6 pointer-events-none z-10">
                <Button
                    className="rounded-full shadow-2xl shadow-zinc-900/20 h-11 px-6 gap-2 font-medium bg-zinc-900 text-white hover:bg-zinc-800 backdrop-blur-md pointer-events-auto transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/10"
                    disabled={pendingCount === 0 || isFixing}
                    onClick={onFixFeedback}
                >
                    {isFixing ? (
                        <>
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-4 w-4 text-indigo-300" />
                            Update Instructions
                            {pendingCount > 0 && (
                                <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-[10px] font-bold min-w-[18px]">
                                    {pendingCount}
                                </span>
                            )}
                        </>
                    )}
                </Button>
            </div>

            {/* Manual Add Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-2xl p-6 shadow-2xl border-zinc-100">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Add Improvement</DialogTitle>
                        <DialogDescription className="text-zinc-500">
                            Manually describe what behavior you want to fix or improve.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="manual-feedback" className="text-xs font-semibold text-zinc-500 uppercase">Description</Label>
                            <Textarea
                                id="manual-feedback"
                                placeholder="E.g. The agent should be more polite when declining..."
                                className="h-32 resize-none rounded-xl bg-zinc-50 border-zinc-200 focus:ring-0 focus:border-zinc-300 transition-all font-medium text-sm"
                                value={manualText}
                                onChange={(e) => setManualText(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddOpen(false)} className="rounded-xl border-zinc-200 h-10 hover:bg-zinc-50">Cancel</Button>
                        <Button onClick={handleManualSubmit} className="rounded-xl h-10 bg-zinc-900 text-white hover:bg-zinc-800 shadow-md">Add to Queue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
