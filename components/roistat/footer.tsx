"use client"

import Link from "next/link"
import Image from "next/image"
import { Send, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { createSubscriber } from "@/actions/subscriber"
import { useAnalytics } from "@/components/analytics/analytics-provider"

export function RoistatFooter() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { trackFormSubmit } = useAnalytics()

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim()) return

        setIsLoading(true)
        try {
            const result = await createSubscriber({
                email,
                source: "footer"
            })

            if (result.success) {
                toast.success("Вы подписаны на новости!")
                setEmail("")
                trackFormSubmit("newsletter_footer", { email })
            } else {
                throw new Error(result.error)
            }
        } catch (error) {
            toast.error("Ошибка подписки. Попробуйте позже.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <footer className="py-12 md:py-16 bg-[#e8f4fc]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Column 1: Brand + Contacts */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="mb-6 flex items-center gap-4">
                            <Image
                                src="/leoold_backup.png"
                                alt="LeoAgent Logo"
                                width={128}
                                height={128}
                                className="h-24 w-24 object-contain"
                            />
                            <span className="text-4xl font-[800] leading-none tracking-tighter text-black font-outfit">
                                leoagent
                            </span>
                        </div>
                        <p className="text-sm text-[#6b7a90] mb-4 max-w-xs">
                            AI-помощник для автоматизации онбординга сотрудников.
                        </p>
                        <ul className="space-y-1 text-sm text-[#6b7a90]">
                            <li><a href="mailto:hello@leoagent.ru" className="hover:text-[#3d4f6f] transition-colors">hello@leoagent.ru</a></li>
                            <li><a href="tel:+74951285418" className="hover:text-[#3d4f6f] transition-colors">+7 (495) 128-54-18</a></li>
                            <li className="text-[#6b7a90] text-xs pt-1">Москва, ул. Орджоникидзе, 11с1А</li>
                        </ul>
                        <a href="https://t.me/printrobot" className="inline-flex items-center gap-2 text-sm text-[#6b7a90] hover:text-[#3d4f6f] transition-colors mt-3">
                            <Send className="w-4 h-4" />
                            @printrobot
                        </a>
                    </div>

                    {/* Column 2: Product */}
                    <div>
                        <h4 className="font-semibold text-[#3d4f6f] mb-3 text-sm">Продукт</h4>
                        <ul className="space-y-1.5 text-sm text-[#6b7a90]">
                            <li><Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">Возможности</Link></li>
                            <li><Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">Интеграции</Link></li>
                            <li><Link href="/ru#pricing" className="hover:text-[#3d4f6f] transition-colors">Цены</Link></li>
                            <li><Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">Безопасность</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h4 className="font-semibold text-[#3d4f6f] mb-3 text-sm">Компания</h4>
                        <ul className="space-y-1.5 text-sm text-[#6b7a90]">
                            <li><Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">О нас</Link></li>
                            <li><Link href="/ru/blog" className="hover:text-[#3d4f6f] transition-colors">Блог</Link></li>
                            <li><Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">Карьера</Link></li>
                            <li><Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">Контакты</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Resources */}
                    <div>
                        <h4 className="font-semibold text-[#3d4f6f] mb-3 text-sm">Ресурсы</h4>
                        <ul className="space-y-1.5 text-sm text-[#6b7a90]">
                            <li><Link href="/ru/docs" className="hover:text-[#3d4f6f] transition-colors">Документация</Link></li>
                            <li><Link href="/ru/partners" className="hover:text-[#3d4f6f] transition-colors">Партнёрам</Link></li>
                            <li><Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">API</Link></li>
                            <li><Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">Поддержка</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Newsletter */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <h4 className="font-semibold text-[#3d4f6f] mb-3 text-sm">Подписаться на новости</h4>
                        <form className="flex flex-col gap-2" onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                placeholder="Ваш email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="h-10 px-3 rounded-md border border-[#c5dff0] bg-white text-sm text-[#3d4f6f] placeholder:text-gray-400 focus:ring-2 focus:ring-[#0077FF] focus:border-[#0077FF] outline-none transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="h-10 px-4 rounded-md bg-[#0077FF] text-sm font-semibold text-white hover:bg-[#0060cc] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                {isLoading ? "Отправка..." : "Подписаться"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#c5dff0] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#6b7a90]">
                    <p>© 2026 LeoAgent. Все права защищены.</p>
                    <div className="flex gap-4">
                        <Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">Политика конфиденциальности</Link>
                        <Link href="/ru" className="hover:text-[#3d4f6f] transition-colors">Условия использования</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

