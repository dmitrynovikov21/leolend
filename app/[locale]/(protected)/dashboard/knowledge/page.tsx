import { getTranslations } from "next-intl/server"
import { GlobalKnowledgeView } from "@/components/knowledge/global-knowledge-view"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "Dashboard" })
    return {
        title: "Knowledge Base | Leo Platform",
    }
}

export default function KnowledgePage() {
    return (
        <GlobalKnowledgeView />
    )
}

