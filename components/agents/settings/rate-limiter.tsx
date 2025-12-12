"use client"

import * as React from "react"
import { Gauge, Lock, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function RateLimiter() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-zinc-900">Rate Limiting & Quotas</h3>
                <p className="text-sm text-zinc-500 mt-1">
                    Protect your agent from abuse and control usage costs.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* VELOCITY LIMITS */}
                <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                                <Gauge className="h-4 w-4 text-blue-600" />
                            </div>
                            <CardTitle className="text-base font-semibold text-zinc-900">Velocity Limits</CardTitle>
                        </div>
                        <CardDescription className="text-zinc-500">Control how fast requests can be processed.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="rpm" className="font-medium text-zinc-700">Requests per Minute (RPM)</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="rpm"
                                        type="number"
                                        defaultValue="60"
                                        className="w-24 h-10 rounded-xl border-transparent bg-zinc-100/50 hover:bg-zinc-100 focus:bg-white focus:ring-2 focus:ring-zinc-200 text-zinc-900 font-medium"
                                    />
                                    <span className="text-sm text-zinc-500 font-medium">req/min per user</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-2">
                                <Label htmlFor="concurrency" className="font-medium text-zinc-700">Max Concurrent Chats</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="concurrency"
                                        type="number"
                                        defaultValue="10"
                                        className="w-24 h-10 rounded-xl border-transparent bg-zinc-100/50 hover:bg-zinc-100 focus:bg-white focus:ring-2 focus:ring-zinc-200 text-zinc-900 font-medium"
                                    />
                                    <span className="text-sm text-zinc-500 font-medium">active sessions</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* QUOTA ENFORCEMENT */}
                <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100">
                                <Lock className="h-4 w-4 text-amber-600" />
                            </div>
                            <CardTitle className="text-base font-semibold text-zinc-900">Daily Quotas</CardTitle>
                        </div>
                        <CardDescription className="text-zinc-500">Set hard limits on resource consumption.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="token-limit" className="flex flex-col gap-1">
                                    <span className="font-medium text-zinc-700">Daily Token Limit</span>
                                    <span className="font-medium text-xs text-zinc-400">Reset at 00:00 UTC</span>
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="token-limit"
                                        type="number"
                                        defaultValue="100000"
                                        className="w-32 h-10 rounded-xl border-transparent bg-zinc-100/50 hover:bg-zinc-100 focus:bg-white focus:ring-2 focus:ring-zinc-200 text-zinc-900 font-medium"
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-zinc-700">Enforcement Strategy</Label>
                                <RadioGroup defaultValue="reject" className="gap-3">
                                    <div className="flex items-center space-x-2 bg-zinc-50 p-2 rounded-lg border border-zinc-100/50">
                                        <RadioGroupItem value="reject" id="r1" className="text-zinc-900 border-zinc-400" />
                                        <Label htmlFor="r1" className="font-medium text-zinc-700 cursor-pointer">Reject Request (Return 429)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-zinc-50 p-2 rounded-lg border border-zinc-100/50">
                                        <RadioGroupItem value="throttle" id="r2" className="text-zinc-900 border-zinc-400" />
                                        <Label htmlFor="r2" className="font-medium text-zinc-700 cursor-pointer">Throttle (Slow down response)</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* DANGER ZONE */}
            <Card className="border-red-200 bg-red-50/50 rounded-2xl shadow-none">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center border border-red-200">
                            <ShieldAlert className="h-4 w-4 text-red-600" />
                        </div>
                        <CardTitle className="text-base font-bold text-red-900">Emergency Stop</CardTitle>
                    </div>
                    <CardDescription className="text-red-700 font-medium">
                        Immediately suspend this agent from processing any new messages.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" className="w-full sm:w-auto h-10 px-6 rounded-xl font-medium shadow-none hover:bg-red-600">
                        Suspend Agent
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
