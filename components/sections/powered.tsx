import MaxWidthWrapper from "@/components/shared/max-width-wrapper"

const integrations = [
  { name: "Telegram" },
  { name: "WhatsApp" },
  { name: "Bitrix24" },
  { name: "AmoCRM" },
  { name: "1C" },
]

export default function Powered() {
  return (
    <section className="py-16 border-y border-neutral-100">
      <MaxWidthWrapper>
        <p className="text-center text-xs font-medium uppercase tracking-widest text-neutral-400">
          Интеграция в один клик
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {integrations.map((item) => (
            <span
              key={item.name}
              className="text-lg font-medium text-neutral-300 hover:text-black transition-colors cursor-default"
            >
              {item.name}
            </span>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
