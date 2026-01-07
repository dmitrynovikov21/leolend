"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const forWhoItems = [
    { label: "Руководитель отдела продаж", href: "#audience" },
    { label: "Начальник отдела кадров", href: "#audience" },
    { label: "Предприниматель", href: "#audience" },
    { label: "Руководитель в госкомпании", href: "#audience" },
    { label: "Владелец интернет магазина", href: "#audience" },
]

const solutionsItems = [
    { label: "Недвижимость", href: "#solutions" },
    { label: "Интернет магазин", href: "#solutions" },
    { label: "Отдел кадров", href: "#solutions" },
    { label: "Обучение смен", href: "#solutions" },
    { label: "Поддержка", href: "#solutions" },
]

function DropdownMenu({
    label,
    items,
    isOpen,
    onToggle
}: {
    label: string
    items: { label: string; href: string }[]
    isOpen: boolean
    onToggle: () => void
}) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 transition-colors py-2"
            >
                {label}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl border border-zinc-200 shadow-xl py-2 z-50"
                    >
                        {items.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                                onClick={onToggle}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function NewHeader() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name)
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/new" className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/leoold.png"
                                alt="LeoAgent Logo"
                                width={64}
                                height={64}
                                className="h-12 w-12 object-contain"
                            />
                            <span className="text-3xl font-[800] leading-none tracking-tighter text-zinc-900 font-outfit">
                                leoagent
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <DropdownMenu
                            label="Для кого"
                            items={forWhoItems}
                            isOpen={openDropdown === "forWho"}
                            onToggle={() => toggleDropdown("forWho")}
                        />
                        <DropdownMenu
                            label="Примеры решения"
                            items={solutionsItems}
                            isOpen={openDropdown === "solutions"}
                            onToggle={() => toggleDropdown("solutions")}
                        />
                        <Link href="#partners" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                            Партнерам
                        </Link>
                        <Link href="/docs" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                            Документация
                        </Link>
                        <Link href="#pricing" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                            Цены
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors px-4 py-2"
                        >
                            Вход
                        </Link>
                        <Link
                            href="/register"
                            className="text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-colors px-5 py-2.5 rounded-lg"
                        >
                            Регистрация
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-zinc-600 hover:text-zinc-900"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden border-t border-zinc-200 py-4"
                        >
                            <nav className="space-y-1">
                                <Link href="#audience" className="block py-2.5 text-sm text-zinc-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                    Для кого
                                </Link>
                                <Link href="#solutions" className="block py-2.5 text-sm text-zinc-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                    Примеры решения
                                </Link>
                                <Link href="#pricing" className="block py-2.5 text-sm text-zinc-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                    Цены
                                </Link>
                                <Link href="/docs" className="block py-2.5 text-sm text-zinc-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                    Документация
                                </Link>
                                <div className="pt-4 mt-2 border-t border-zinc-200 flex gap-3">
                                    <Link href="/login" className="flex-1 text-center py-2.5 text-sm text-zinc-600 border border-zinc-200 rounded-lg">
                                        Вход
                                    </Link>
                                    <Link href="/register" className="flex-1 text-center py-2.5 text-sm font-semibold text-white bg-zinc-900 rounded-lg">
                                        Регистрация
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}
