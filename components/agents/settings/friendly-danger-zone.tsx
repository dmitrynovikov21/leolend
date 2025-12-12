"use client"

import { AlertTriangle, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FriendlyDangerZone() {
    return (
        <div className="space-y-6 pt-6 border-t border-dashed border-zinc-200">
            <div>
                <h3 className="text-lg font-bold text-zinc-900">Управление агентом</h3>
                <p className="text-sm text-zinc-500 mt-1">
                    Действия, связанные с удалением или сбросом агента.
                </p>
            </div>

            <Card className="border border-red-100 bg-red-50/10 shadow-none rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-zinc-900">Удалить агента</h4>
                            <p className="text-xs text-zinc-500 mt-1 max-w-lg leading-relaxed">
                                Это действие безвозвратно удалит агента и все связанные с ним диалоги, настройки и историю. Это действие нельзя отменить.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 font-medium transition-colors h-10 px-4"
                        >
                            Удалить навсегда
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
