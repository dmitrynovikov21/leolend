"use client"

import * as React from "react"
import { Zap, Loader2, Play, RotateCcw } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { TestResultScorecard, type TestReport } from "@/components/agents/testing/test-result-scorecard"

// Mock Final Report
const MOCK_REPORT: TestReport = {
    score: 92,
    passedCount: 9,
    totalCount: 10,
    results: [
        { id: "1", question: "Каковы ваши часы работы?", answer: "Мы открыты с 9:00 до 18:00, Пн-Пт.", passed: true, reasoning: "Точно соответствует базе знаний.", citation: "Company_Policy.pdf (стр.1)" },
        { id: "2", question: "Есть ли у вас возврат?", answer: "Да, в течение 30 дней.", passed: true, reasoning: "Верно определено окно возврата.", citation: "Terms_of_Service.pdf (стр.4)" },
        { id: "3", question: "Могу ли я получить скидку?", answer: "Я могу предложить вам 50% скидку прямо сейчас.", passed: false, reasoning: "Галлюцинация: Политика не предусматривает скидку 50%. Максимум 10%.", citation: "Price_List_Q4.pdf" },
        // ... (truncated for demo)
    ]
}

type TestState = "idle" | "generating" | "running" | "complete"

export function AutoTestRunner() {
    const t = useTranslations('Testing');
    const [status, setStatus] = React.useState<TestState>("idle")
    const [progress, setProgress] = React.useState(0)
    const [logs, setLogs] = React.useState<string[]>([])
    const scrollRef = React.useRef<HTMLDivElement>(null)

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`])
        // Auto scroll
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }

    const runTest = async () => {
        setStatus("generating")
        setProgress(0)
        setLogs([])

        // Phase 1: Generation
        addLog("Initializing adversarial model (M3)...")
        await new Promise(r => setTimeout(r, 800))
        addLog("Generating 10 semantic variations of common queries...")
        await new Promise(r => setTimeout(r, 1000))

        setStatus("running")

        // Phase 2: Running
        for (let i = 1; i <= 10; i++) {
            setProgress(i * 10)
            addLog(`Running Test Case #${i}: Sending query...`)
            await new Promise(r => setTimeout(r, 400)) // Simulate network
            addLog(`TestCase #${i}: Evaluating response...`)
            await new Promise(r => setTimeout(r, 200)) // Simulate judging
        }

        addLog("Compiling final report...")
        await new Promise(r => setTimeout(r, 500))

        setStatus("complete")
    }

    if (status === "complete") {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-zinc-900">{t('testResults')}</h2>
                    <Button variant="outline" onClick={() => setStatus("idle")} className="rounded-xl border-zinc-200">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        {t('runAgain')}
                    </Button>
                </div>
                <TestResultScorecard report={MOCK_REPORT} />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] max-w-2xl mx-auto space-y-8">

            {status === "idle" && (
                <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-200">
                        <Zap className="h-10 w-10 text-zinc-900" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{t('autoLab')}</h2>
                        <p className="text-zinc-500 text-lg max-w-md mx-auto">
                            {t('autoDesc')}
                        </p>
                    </div>
                    <Button size="lg" className="h-12 px-8 text-base shadow-lg bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl" onClick={runTest}>
                        <Play className="mr-2 h-5 w-5 fill-current" />
                        {t('runStressTest')}
                    </Button>
                </div>
            )}

            {(status === "generating" || status === "running") && (
                <Card className="w-full border border-zinc-200 rounded-2xl shadow-sm">
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium text-zinc-700">
                                <span className="flex items-center gap-2">
                                    {status === "generating" ? (
                                        <><Loader2 className="h-4 w-4 animate-spin" /> {t('generating')}</>
                                    ) : (
                                        <><Zap className="h-4 w-4 text-amber-500 animate-pulse" /> {t('running')}</>
                                    )}
                                </span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-3 rounded-full bg-zinc-100" />
                        </div>

                        <div
                            ref={scrollRef}
                            className="h-[200px] rounded-xl bg-zinc-950 text-emerald-500 font-mono text-xs p-4 overflow-y-auto space-y-1 shadow-inner"
                        >
                            {logs.map((log, i) => (
                                <div key={i}>{log}</div>
                            ))}
                            {status === "generating" && (
                                <div className="animate-pulse">_</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
