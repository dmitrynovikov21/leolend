import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { OverviewDashboard } from "@/components/dashboard/overview-dashboard";

export const metadata = constructMetadata({
  title: "Dashboard – SaaS Starter",
  description: "Monitor your AI agents and operations.",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const t = await getTranslations();

  return (
    <div className="min-h-screen p-6 space-y-6">
      <DashboardHeader
        heading={t('Dashboard.title')}
        text={t('Dashboard.description')}
      />
      <OverviewDashboard />
    </div>
  );
}
