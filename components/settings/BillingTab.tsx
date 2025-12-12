"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Check, Zap } from "lucide-react"

export function BillingTab() {
    return (
        <div className="space-y-6">
            <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-zinc-900">Тарифный план</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Вы используете план <span className="font-semibold text-zinc-900">Pro</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="flex items-center justify-between border border-zinc-200 p-4 rounded-xl bg-zinc-50/50">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-zinc-900 flex items-center justify-center shadow-sm">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-lg text-zinc-900">Pro Plan</div>
                                <div className="text-sm font-medium text-zinc-500">$29 / месяц</div>
                            </div>
                        </div>
                        <Button variant="outline" className="rounded-xl border-zinc-200 hover:bg-white shadow-sm font-medium text-zinc-700">Изменить план</Button>
                    </div>

                    <div className="space-y-3">
                        <div className="text-sm font-semibold text-zinc-900">Доступные возможности</div>
                        <ul className="grid gap-2.5 text-sm text-zinc-500 font-medium">
                            <li className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-green-600" />
                                </div>
                                Неограниченное количество агентов
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-green-600" />
                                </div>
                                Приоритетная поддержка
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-green-600" />
                                </div>
                                Расширенная аналитика
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-green-600" />
                                </div>
                                API доступ
                            </li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-zinc-100 pt-6 pb-6 px-6">
                    <div className="text-sm text-zinc-500 font-medium">
                        Следующее списание: <span className="font-semibold text-zinc-900">1 января 2026</span>
                    </div>
                    <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl font-medium">
                        Отменить подписку
                    </Button>
                </CardFooter>
            </Card>

            <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-zinc-900">История платежей</CardTitle>
                    <CardDescription className="text-zinc-500">Скачать инвойсы и просмотреть историю оплат.</CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                    <div className="text-sm text-zinc-400 font-medium text-center py-12 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                        История платежей пуста.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
