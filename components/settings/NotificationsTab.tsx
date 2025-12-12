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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationsTab() {
    return (
        <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-zinc-900">Уведомления</CardTitle>
                <CardDescription className="text-zinc-500">
                    Выберите, какие уведомления вы хотите получать.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-2 p-4 rounded-xl bg-zinc-50 border border-zinc-100/50">
                    <Label htmlFor="updates" className="flex flex-col space-y-1 cursor-pointer">
                        <span className="font-semibold text-zinc-900">Обновления продукта</span>
                        <span className="font-medium text-xs text-zinc-500">
                            Новости о новых функциях и улучшениях.
                        </span>
                    </Label>
                    <Switch id="updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2 p-4 rounded-xl bg-zinc-50 border border-zinc-100/50">
                    <Label htmlFor="activity" className="flex flex-col space-y-1 cursor-pointer">
                        <span className="font-semibold text-zinc-900">Активность агентов</span>
                        <span className="font-medium text-xs text-zinc-500">
                            Еженедельный отчет о работе ваших агентов.
                        </span>
                    </Label>
                    <Switch id="activity" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2 p-4 rounded-xl bg-zinc-50 border border-zinc-100/50">
                    <Label htmlFor="billing" className="flex flex-col space-y-1 cursor-pointer">
                        <span className="font-semibold text-zinc-900">Уведомления по оплате</span>
                        <span className="font-medium text-xs text-zinc-500">
                            Счета, платежи и предупреждения об окончании подписки.
                        </span>
                    </Label>
                    <Switch id="billing" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2 p-4 rounded-xl bg-zinc-50 border border-zinc-100/50 opacity-70">
                    <Label htmlFor="security" className="flex flex-col space-y-1">
                        <span className="font-semibold text-zinc-900">Уведомления безопасности</span>
                        <span className="font-medium text-xs text-zinc-500">
                            Входы с новых устройств и подозрительная активность.
                        </span>
                    </Label>
                    <Switch id="security" defaultChecked disabled />
                </div>
            </CardContent>
            <CardFooter className="pb-6 px-6 pt-2">
                <Button className="w-full sm:w-auto rounded-xl px-6 bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm font-medium">Сохранить уведомления</Button>
            </CardFooter>
        </Card>
    )
}
