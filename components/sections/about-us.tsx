"use client"

import { motion } from "framer-motion"

export default function AboutUs() {
    return (
        <section className="py-24 bg-white border-t border-zinc-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* O HAC */}
                <div className="mb-24">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-zinc-900 mb-12">
                        О НАС
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        <div className="space-y-4">
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Мы - команда профессионалов с более чем десятилетним опытом в индустрии, специализирующаяся на разработке качественных аппаратных и программных решений.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Наша главная цель - удовлетворение потребностей клиентов, и мы стремимся создавать продукты, которые реально улучшают их бизнес.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Мы постоянно ищем новые технологии и методы для обеспечения выдающегося качества и эффективности в наших проектах.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Мы верим в долгосрочные отношения с клиентами и партнерами, и с удовольствием работаем вместе для достижения общих целей.
                            </p>
                        </div>
                    </div>
                </div>

                {/* НАШ ОФИС */}
                <div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-zinc-900 mb-12">
                        НАШ ОФИС
                    </h2>
                    <div className="relative h-[500px] md:h-[600px] w-full rounded-[2.5rem] overflow-hidden bg-zinc-900">
                        {/* Background Image - User should upload 'office.png' to public folder */}
                        <img
                            src="/office.png"
                            alt="Moscow City Office"
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                        />

                        {/* Gradient Overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent" />

                        {/* Content */}
                        <div className="absolute top-10 left-8 md:top-16 md:left-16 text-white max-w-md z-10">
                            <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">МОСКВА</h3>

                            <p className="text-lg md:text-xl font-medium mb-8 leading-snug opacity-90">
                                ул. Орджоникидзе, 11с1А, подъезд 29
                            </p>

                            <div className="flex flex-col gap-2">
                                <a href="tel:+74951285418" className="text-lg md:text-xl font-bold hover:text-blue-200 transition-colors inline-block">
                                    +7 (495) 128-54-18
                                </a>
                                <a href="mailto:info@veo.dev" className="text-lg md:text-xl font-medium hover:text-blue-200 transition-colors inline-block">
                                    info@veo.dev
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
