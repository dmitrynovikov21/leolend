"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Key } from "lucide-react"

export function ApiTab() {
    return (
        <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold text-zinc-900">API Ключи</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Управляйте ключами доступа к API платформы.
                    </CardDescription>
                </div>
                <Button className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm font-medium">
                    <Key className="mr-2 h-4 w-4" /> Создать новый ключ
                </Button>
            </CardHeader>
            <CardContent className="pb-8">
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200">
                    <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center border border-zinc-100 shadow-sm">
                        <Key className="h-7 w-7 text-zinc-300" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold text-zinc-900">API ключи не найдены</h3>
                        <p className="text-sm text-zinc-500 font-medium max-w-sm mx-auto">
                            У вас пока нет активных API ключей. Создайте новый ключ, чтобы начать работу с API.
                        </p>
                    </div>
                    <Button variant="outline" className="mt-2 rounded-xl border-zinc-200 hover:bg-white text-zinc-700 font-medium shadow-sm">
                        Документация API
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
