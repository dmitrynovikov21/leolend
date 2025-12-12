"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Laptop, Phone } from "lucide-react"

export function SecurityTab() {
    return (
        <div className="space-y-6">
            <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-zinc-900">Пароль</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Измените свой пароль для входа в аккаунт.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-zinc-700 font-medium">Текущий пароль</Label>
                        <Input
                            id="current-password"
                            type="password"
                            className="h-11 rounded-xl border-transparent bg-zinc-100/50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all font-medium text-zinc-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-zinc-700 font-medium">Новый пароль</Label>
                        <Input
                            id="new-password"
                            type="password"
                            className="h-11 rounded-xl border-transparent bg-zinc-100/50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all font-medium text-zinc-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-zinc-700 font-medium">Подтвердите пароль</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            className="h-11 rounded-xl border-transparent bg-zinc-100/50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all font-medium text-zinc-900"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end pb-6 px-6">
                    <Button className="rounded-xl h-10 px-6 font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm">Обновить пароль</Button>
                </CardFooter>
            </Card>

            <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-bold text-zinc-900">Активные сессии</CardTitle>
                            <CardDescription className="text-zinc-500">
                                Устройства, с которых выполнен вход в ваш аккаунт.
                            </CardDescription>
                        </div>
                        <div className="text-xs font-semibold text-zinc-500 bg-zinc-100 border border-zinc-200/50 px-3 py-1.5 rounded-lg">
                            2 active sessions
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 pb-8">
                    <div className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors px-2 rounded-xl -mx-2">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-zinc-100 rounded-xl flex items-center justify-center border border-zinc-200/50">
                                <Laptop className="h-6 w-6 text-zinc-500" />
                            </div>
                            <div>
                                <div className="font-semibold text-zinc-900 text-sm">Mac OS 14.2 • Chrome</div>
                                <div className="text-xs font-medium text-zinc-500">192.168.1.1 • <span className="text-green-600">Сейчас</span></div>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" disabled className="text-zinc-400 font-medium">Текущая</Button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors px-2 rounded-xl -mx-2">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-zinc-100 rounded-xl flex items-center justify-center border border-zinc-200/50">
                                <Phone className="h-6 w-6 text-zinc-500" />
                            </div>
                            <div>
                                <div className="font-semibold text-zinc-900 text-sm">iPhone 15 • Safari</div>
                                <div className="text-xs font-medium text-zinc-500">10.0.0.1 • 2 часа назад</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg h-8 border-zinc-200 text-zinc-700 hover:text-red-600 hover:bg-red-50 hover:border-red-100 bg-white shadow-sm">Завершить</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
