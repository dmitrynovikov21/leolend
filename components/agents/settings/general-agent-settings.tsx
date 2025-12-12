"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function GeneralAgentSettings() {
    const [emoji, setEmoji] = React.useState("🤖")
    const [pickerOpen, setPickerOpen] = React.useState(false)

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setEmoji(emojiData.emoji)
        setPickerOpen(false)
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-zinc-900">Основная информация</h3>
                <p className="text-sm text-zinc-500 mt-1">
                    Настройте имя агента, его аватар и описание.
                </p>
            </div>
            <Card className="border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
                <CardContent className="p-4 space-y-4">
                    {/* Identity Row - Emoji + Name */}
                    <div className="flex items-center gap-4">
                        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm bg-zinc-50 text-2xl hover:bg-zinc-100 hover:shadow-md transition-all duration-200 border border-zinc-100"
                                >
                                    {emoji}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full border-none p-0 bg-transparent shadow-none" align="start">
                                <div className="rounded-xl overflow-hidden border shadow-lg">
                                    <EmojiPicker
                                        onEmojiClick={handleEmojiClick}
                                        autoFocusSearch={false}
                                        theme={Theme.LIGHT}
                                        searchDisabled={false}
                                        width={320}
                                        height={400}
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="flex-1">
                            <Label htmlFor="agent-name" className="sr-only">Имя агента</Label>
                            <Input
                                id="agent-name"
                                defaultValue="HR Support Bot"
                                placeholder="Имя агента"
                                className="h-10 rounded-xl border-transparent bg-zinc-100/50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all font-medium text-zinc-900 placeholder:text-zinc-400"
                            />
                        </div>
                    </div>
                    {/* Description */}
                    <div>
                        <Label htmlFor="agent-desc" className="sr-only">Описание</Label>
                        <Textarea
                            id="agent-desc"
                            defaultValue="Helps employees with HR related questions."
                            placeholder="Описание агента"
                            className="min-h-[80px] rounded-xl border-transparent bg-zinc-100/50 focus:bg-white focus:ring-2 focus:ring-zinc-200 transition-all font-medium text-zinc-900 resize-none"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

