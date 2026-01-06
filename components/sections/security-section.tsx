import MaxWidthWrapper from "@/components/shared/max-width-wrapper"

export default function SecuritySection() {
    return (
        <section className="py-24 bg-black text-white">
            <MaxWidthWrapper>
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                    <h2 className="font-bold text-3xl sm:text-4xl">
                        Безопасность по 152-ФЗ
                    </h2>

                    <p className="mt-6 text-neutral-400 leading-relaxed">
                        Серверы в России. Данные не передаются в открытые модели.
                        База знаний вашей компании полностью изолирована.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-neutral-500">
                        <span className="border-b border-dotted border-neutral-700 pb-0.5">Серверы в РФ</span>
                        <span className="border-b border-dotted border-neutral-700 pb-0.5">Шифрование</span>
                        <span className="border-b border-dotted border-neutral-700 pb-0.5">Изоляция данных</span>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}
