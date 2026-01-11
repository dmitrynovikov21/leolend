import { CasesSection } from "@/components/sections/cases-section"
import { RoistatHeader } from "@/components/roistat/header"
import { RoistatFooter } from "@/components/roistat/footer"

export default function CasesPage() {
    return (
        <div className="min-h-screen bg-white">
            <RoistatHeader />
            <main className="pt-20">
                <CasesSection />
            </main>
            <RoistatFooter />
        </div>
    )
}
