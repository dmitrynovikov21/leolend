"use client"

const useCases = [
    {
        title: "Онбординг сотрудников",
        desc: "Автоматическая адаптация новичков и ответы на вопросы по регламентам."
    },
    {
        title: "Поддержка студентов",
        desc: "Мгновенные ответы по расписанию, курсам и учебным материалам."
    },
    {
        title: "Обучение смен",
        desc: "Доступ к инструкциям по оборудованию и технике безопасности 24/7."
    },
    {
        title: "Юридическая помощь",
        desc: "Первичная консультация по договорам и проверка контрагентов."
    },
    {
        title: "Поддержка магазина",
        desc: "Помощь покупателям с выбором товаров и статусом заказа."
    },
    {
        title: "Логистика",
        desc: "Отслеживание грузов и информация о сроках доставки."
    },
    {
        title: "IT-Helpdesk",
        desc: "Первая линия поддержки: сброс паролей, настройка ПО и принтеров."
    },
]

export default function UseCasesSection() {
    return (
        <section className="py-3 bg-zinc-900 border-none overflow-visible z-20 relative">
            <div className="relative flex overflow-hidden">
                <div
                    className="flex gap-16 animate-marquee whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] group"
                    style={{ animationDuration: '40s' }}
                >
                    {[...useCases, ...useCases, ...useCases, ...useCases].map((item, index) => (
                        <div
                            key={index}
                            className="relative group/item flex items-center gap-12 cursor-help"
                        >
                            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white transition-opacity duration-300 hover:opacity-80">
                                {item.title}
                            </span>

                            {/* Dot Separator */}
                            <span className="text-zinc-700 text-sm group-hover/item:text-zinc-500 transition-colors">•</span>

                            {/* Custom Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-[50%] mb-4 w-72 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl opacity-0 translate-y-2 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all duration-300 pointer-events-none z-50 shadow-2xl">
                                <div className="text-xs text-zinc-200 leading-relaxed font-normal whitespace-normal text-center">
                                    {item.desc}
                                </div>
                                {/* Arrow */}
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/10 border-r border-b border-white/10 rotate-45 backdrop-blur-md"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pause on hover helper */}
            <style jsx>{`
                .group:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    )
}
