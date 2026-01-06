"use client"

import Link from "next/link"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { Logo } from "@/components/ui/logo"
import { Mail, MapPin } from "lucide-react"

export default function FooterSection() {
    return (
        <footer className="py-16 border-t border-neutral-200 bg-neutral-50">
            <MaxWidthWrapper>
                <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-24">
                    {/* Branding & Contacts */}
                    <div className="max-w-sm space-y-6">
                        <div className="space-y-4">
                            <Logo />
                            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
                                AI-помощник для автоматизации онбординга сотрудников. Помогаем компаниям создавать лучший опыт адаптации.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <a href="mailto:hello@leoagent.ai" className="flex items-center gap-2 text-sm text-neutral-700 hover:text-blue-600 transition-colors">
                                <Mail className="size-4" />
                                <span>hello@leoagent.ai</span>
                            </a>
                            <div className="flex items-center gap-2 text-sm text-neutral-700">
                                <MapPin className="size-4" />
                                <span>Москва, Россия</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Group */}
                    <div className="grid grid-cols-3 gap-8 sm:gap-12 lg:gap-32">
                        {/* Column 2: Product */}
                        <div>
                            <h4 className="font-bold text-sm text-black mb-4">Продукт</h4>
                            <ul className="space-y-3">
                                {['Возможности', 'Интеграции', 'Цены', 'Безопасность'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Company */}
                        <div>
                            <h4 className="font-bold text-sm text-black mb-4">Компания</h4>
                            <ul className="space-y-3">
                                {['О нас', 'Блог', 'Карьера', 'Контакты'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Resources */}
                        <div>
                            <h4 className="font-bold text-sm text-black mb-4">Ресурсы</h4>
                            <ul className="space-y-3">
                                {['Документация', 'Поддержка', 'API', 'Статус'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
                    <div>
                        © 2024 LeoAgent. Все права защищены.
                    </div>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-neutral-600 transition-colors">
                            Политика конфиденциальности
                        </Link>
                        <Link href="/terms" className="hover:text-neutral-600 transition-colors">
                            Условия использования
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}
