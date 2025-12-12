"use client"

import * as React from "react"
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react"
import { LucideIcon, Smile } from "lucide-react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmojiAvatarProps {
    value?: string
    onChange?: (emoji: string) => void
    fallbackIcon?: LucideIcon
    editable?: boolean
    className?: string
    size?: "sm" | "md" | "lg"
}

export function EmojiAvatar({
    value,
    onChange,
    fallbackIcon: FallbackIcon = Smile,
    editable = false,
    className,
    size = "md"
}: EmojiAvatarProps) {
    const [open, setOpen] = React.useState(false)

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        onChange?.(emojiData.emoji)
        setOpen(false)
    }

    const sizeClasses = {
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-lg",
        lg: "h-14 w-14 text-2xl"
    }

    const content = (
        <div
            className={cn(
                "flex items-center justify-center rounded-md transition-all",
                sizeClasses[size],
                editable ? "cursor-pointer hover:bg-muted/80" : "bg-transparent",
                className
            )}
            onClick={() => editable && setOpen(true)}
        >
            {value ? (
                <span>{value}</span>
            ) : (
                <FallbackIcon className={cn("text-muted-foreground", size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-7 w-7")} />
            )}
        </div>
    )

    if (!editable) {
        return content
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {content}
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
                    // Russian translation for categories if needed, but default is fine for now
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}
