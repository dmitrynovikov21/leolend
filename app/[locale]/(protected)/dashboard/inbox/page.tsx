import { InboxLayout } from "@/components/inbox/inbox-layout"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "Dashboard" })
    return {
        title: "Inbox | Leo Platform",
    }
}

export default function InboxPage() {
    return (
        <InboxLayout />
    )
}
