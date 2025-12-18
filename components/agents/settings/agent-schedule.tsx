"use client"

import * as React from "react"
import { CalendarClock, Globe, Moon, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 24 }, (_, i) => i)

export function AgentSchedule() {
    // 7 days x 24 hours grid. true = active.
    // Default: Mon-Fri 9-17 active.
    const [schedule, setSchedule] = React.useState<boolean[][]>(() => {
        return days.map((day, dIndex) =>
            hours.map(h => dIndex < 5 && h >= 9 && h < 18)
        )
    })
    const [isMouseDown, setIsMouseDown] = React.useState(false)
    const [toggleState, setToggleState] = React.useState(true) // What to set when dragging
    const [bufferSeconds, setBufferSeconds] = React.useState([0])

    const handleCellAction = (d: number, h: number) => {
        const newSchedule = [...schedule]
        newSchedule[d] = [...newSchedule[d]]
        newSchedule[d][h] = toggleState
        setSchedule(newSchedule)
    }

    const onMouseDown = (d: number, h: number) => {
        setIsMouseDown(true)
        setToggleState(!schedule[d][h])
        handleCellAction(d, h)
    }

    const onMouseEnter = (d: number, h: number) => {
        if (isMouseDown) {
            handleCellAction(d, h)
        }
    }

    return (
        <div className="space-y-6" onMouseUp={() => setIsMouseDown(false)} onMouseLeave={() => setIsMouseDown(false)}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-zinc-900">График доступности</h3>
                    <p className="text-sm text-zinc-500 mt-1">
                        Настройте рабочие часы, когда агент будет отвечать пользователям.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="utc+3">
                        <SelectTrigger className="w-[180px] h-10 rounded-xl border-transparent bg-zinc-100/50 hover:bg-zinc-100 focus:bg-white focus:ring-2 focus:ring-zinc-200 text-zinc-900 font-medium">
                            <Globe className="mr-2 h-4 w-4 text-zinc-500" />
                            <SelectValue placeholder="Часовой пояс" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-zinc-200 shadow-lg">
                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                            <SelectItem value="utc+1">London (GMT+1)</SelectItem>
                            <SelectItem value="utc+3">Moscow (GMT+3)</SelectItem>
                            <SelectItem value="utc-5">New York (GMT-5)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-zinc-900">Недельный график</CardTitle>
                        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded-sm bg-zinc-900" /> Активен
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded-sm bg-zinc-100" /> Неактивен
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="select-none">
                        {/* Header Hours */}
                        <div className="flex mb-2">
                            <div className="w-12" /> {/* Label spacer */}
                            <div className="flex-1 flex justify-between text-[10px] text-zinc-400 font-medium px-1 uppercase tracking-wide">
                                <span>00:00</span>
                                <span>06:00</span>
                                <span>12:00</span>
                                <span>18:00</span>
                                <span>23:00</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            {days.map((day, dIndex) => (
                                <div key={day} className="flex items-center gap-2">
                                    <span className="w-12 text-xs font-semibold text-zinc-500 uppercase tracking-wide">{day}</span>
                                    <div className="flex-1 flex gap-[2px] h-8">
                                        {hours.map((h) => (
                                            <div
                                                key={h}
                                                className={cn(
                                                    "flex-1 rounded-sm cursor-pointer transition-all duration-75",
                                                    schedule[dIndex][h]
                                                        ? "bg-zinc-900 hover:bg-zinc-800"
                                                        : "bg-zinc-100 hover:bg-zinc-200"
                                                )}
                                                onMouseDown={() => onMouseDown(dIndex, h)}
                                                onMouseEnter={() => onMouseEnter(dIndex, h)}
                                                title={`${day} ${h}:00 - ${h + 1}:00`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Offline Behavior */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-base font-bold text-zinc-900">Поведение оффлайн</h3>
                        <p className="text-sm text-zinc-500 mt-1">Что делать в нерабочее время?</p>
                    </div>
                    <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-zinc-100">
                                <Label htmlFor="auto-reply" className="font-medium text-zinc-900">Авто-ответ</Label>
                                <Switch id="auto-reply" defaultChecked className="data-[state=checked]:bg-zinc-900" />
                            </div>
                            <Textarea
                                placeholder="Напишите сообщение..."
                                className="min-h-[100px] text-sm rounded-xl border-transparent bg-zinc-100/50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all font-medium text-zinc-900 placeholder:text-zinc-400 p-4 resize-none"
                                defaultValue="Здравствуйте! Сейчас я не на связи. Я отвечу вам в рабочее время."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Holidays */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-base font-bold text-zinc-900">Праздники</h3>
                        <p className="text-sm text-zinc-500 mt-1">Исключения из графика работы.</p>
                    </div>
                    <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl h-[calc(100%-76px)]">
                        <CardContent className="p-4 h-full">
                            <div className="p-8 border-2 border-dashed border-zinc-200 rounded-xl text-center h-full flex flex-col items-center justify-center bg-white">
                                <p className="text-sm text-zinc-500 font-medium mb-4">Нет добавленных праздников.</p>
                                <Button variant="outline" size="sm" className="rounded-xl border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-medium shadow-sm">Добавить дату</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Buffer / Response Delay */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-zinc-900">Буфер обмена (Задержка)</h3>
                    <p className="text-sm text-zinc-500 mt-1">
                        Настройте искусственную задержку перед ответом.
                    </p>
                </div>
                <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                    <CardContent className="pt-6 pb-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="buffer-seconds" className="font-medium text-zinc-900">Время задержки</Label>
                                <Badge variant="outline" className="text-xs font-mono rounded-lg border-zinc-200 bg-zinc-50 text-zinc-600">
                                    {bufferSeconds[0]} сек
                                </Badge>
                            </div>
                            <Slider
                                id="buffer-seconds"
                                value={bufferSeconds}
                                max={15}
                                step={1}
                                onValueChange={setBufferSeconds}
                                className="cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-zinc-400 px-1 font-medium">
                                <span>Мгновенно (0с)</span>
                                <span>Естественно (2-5с)</span>
                                <span>Задумчиво (10с+)</span>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            Добавление небольшой задержки (2-3 секунды) делает общение с ботом более естественным, имитируя процесс чтения и набора текста человеком.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
