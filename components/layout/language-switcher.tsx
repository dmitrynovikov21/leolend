"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Languages } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
]

export function LanguageSwitcher({ variant = "ghost" }: { variant?: "ghost" | "outline" | "default" }) {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()

    const switchLanguage = (newLocale: string) => {
        // Replace the locale in the URL
        const segments = pathname.split("/")
        segments[1] = newLocale
        const newPath = segments.join("/")
        router.push(newPath)
        router.refresh()
    }

    const currentLanguage = languages.find((lang) => lang.code === locale)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} size="sm" className="gap-2">
                    <Languages className="h-4 w-4" />
                    <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.label}</span>
                    <span className="sm:hidden">{currentLanguage?.flag}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => switchLanguage(language.code)}
                        className="cursor-pointer"
                    >
                        <span className="mr-2">{language.flag}</span>
                        {language.label}
                        {language.code === locale && (
                            <span className="ml-auto text-xs text-muted-foreground">✓</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
