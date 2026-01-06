"use client"

import { useRef } from "react"

const items = [
    "Онбординг сотрудников",
    "Обучение смен в цеху",
    "Поддержка интернет-магазина",
    "Юридические консультации",
    "Техподдержка 24/7",
]

export default function Ticker() {
    return (
        <section className="py-4 bg-zinc-900 overflow-hidden border-none">
            <div
                className="flex gap-12 animate-[scroll_30s_linear_infinite] whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
                style={{
                    animation: 'scroll 30s linear infinite',
                }}
            >
                {[...items, ...items, ...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className="text-sm font-medium tracking-wide uppercase text-zinc-400 inline-flex items-center gap-12"
                    >
                        {item}
                        <span className="text-zinc-800 text-xl">•</span>
                    </span>
                ))}
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
        </section>
    )
}
