"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const tiers = [
    {
        name: "Старт",
        price: "0 ₽",
        description: "Для знакомства",
        features: ["3 документа", "10 диалогов/мес", "Базовая поддержка"],
        button: "Попробовать бесплатно",
    },
    {
        name: "Базовый",
        price: "3 900 ₽",
        description: "Для небольших команд",
        features: ["40 документов", "200 диалогов/мес", "WhatsApp/Telegram"],
        button: "Выбрать Базовый",
    },
    {
        name: "Профи",
        price: "9 900 ₽",
        description: "Для растущего бизнеса",
        features: ["150 документов", "800 диалогов/мес", "API доступ", "Приоритетная поддержка"],
        button: "Выбрать Профи",
        popular: true,
    },
    {
        name: "Бизнес",
        price: "39 900 ₽",
        description: "Профессиональное решение",
        features: ["800 документов", "4000 диалогов/мес", "Персональный менеджер", "SLA"],
        button: "Связаться",
    },
    {
        name: "Enterprise",
        price: "Индивидуально",
        description: "Для корпораций",
        features: ["Безлимитные документы", "Установка на ваш сервер", "Доработка под ключ", "Выделенная команда"],
        button: "Обсудить проект",
        dark: true,
    },
]

export default function PricingSection() {
    return (
        <section className="py-24 bg-white border-t border-zinc-100" id="pricing">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
                        Тарифы
                    </h2>
                    <p className="text-zinc-500">Прозрачное ценообразование для команд любого размера.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 items-start">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-2xl p-6 flex flex-col h-full border ${tier.dark
                                ? "bg-zinc-900 border-zinc-900 text-white"
                                : "bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300 hover:shadow-lg transition-all"
                                } ${tier.popular ? "ring-2 ring-zinc-900 ring-offset-2" : ""}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    HIT
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 className={`text-lg font-bold ${tier.dark ? "text-white" : "text-zinc-900"}`}>{tier.name}</h3>
                                <p className={`text-xs ${tier.dark ? "text-zinc-400" : "text-zinc-500"}`}>{tier.description}</p>
                            </div>

                            <div className="mb-6 flex items-baseline">
                                <span className="text-3xl font-bold tracking-tight">{tier.price}</span>
                                {tier.price.includes("₽") && <span className={`text-sm ${tier.dark ? "text-zinc-400" : "text-zinc-500"}`}>/мес</span>}
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-2 text-xs">
                                        <Check className={`size-4 shrink-0 ${tier.dark ? "text-zinc-400" : "text-zinc-900"}`} />
                                        <span className={tier.dark ? "text-zinc-300" : "text-zinc-600"}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${tier.dark
                                ? "bg-white text-zinc-900 hover:bg-zinc-100"
                                : "bg-zinc-900 text-white hover:bg-zinc-800"
                                }`}>
                                {tier.button}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
