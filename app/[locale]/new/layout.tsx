import { Metadata } from "next"
import NewHeader from "./header"

export const metadata: Metadata = {
    title: "LeoAgent — ИИ-агенты для автоматизации поддержки",
    description: "LeoAgent автоматически закрывает до 80% типовых запросов. Укажите роль, загрузите документы — и агент начнет отвечать строго по регламенту через 7 минут.",
    verification: {
        yandex: "bbfb53087a308c04",
    },
}

export default function NewLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NewHeader />
            {children}
        </>
    )
}
