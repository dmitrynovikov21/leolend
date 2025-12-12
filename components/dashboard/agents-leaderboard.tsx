"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Bot } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Mock data for top agents
const mockTopAgents = [
    {
        id: "1",
        name: "Oleg HR",
        role: "HR Assistant",
        avatar: "/avatars/oleg.jpg",
        status: "active" as const,
        dialogs: 342,
        efficiency: 92,
    },
    {
        id: "2",
        name: "Alice Support",
        role: "Customer Support",
        avatar: "/avatars/alice.jpg",
        status: "active" as const,
        dialogs: 289,
        efficiency: 88,
    },
    {
        id: "3",
        name: "Bob Sales",
        role: "Sales Rep",
        avatar: "/avatars/bob.jpg",
        status: "training" as const,
        dialogs: 156,
        efficiency: 75,
    },
    {
        id: "4",
        name: "Wiki Analyst",
        role: "Data Analyst",
        avatar: "/avatars/wiki.jpg",
        status: "active" as const,
        dialogs: 203,
        efficiency: 85,
    },
]

export function AgentsLeaderboard() {
    const t = useTranslations('Dashboard')
    const tAgents = useTranslations('Agents')

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('leaderboard')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Агент</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className="text-right">Диалоги</TableHead>
                            <TableHead className="text-right">Эффективность</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockTopAgents.map((agent) => (
                            <TableRow key={agent.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={agent.avatar} alt={agent.name} />
                                            <AvatarFallback>
                                                <Bot className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{agent.name}</div>
                                            <div className="text-xs text-muted-foreground">{agent.role}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {agent.status === "active" ? (
                                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800">
                                            {tAgents('activeStatus')}
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800">
                                            {tAgents('trainingStatus')}
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right tabular-nums font-medium">
                                    {agent.dialogs}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Progress value={agent.efficiency} className="w-16 h-2" />
                                        <span className="text-sm tabular-nums text-muted-foreground w-8">
                                            {agent.efficiency}%
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
