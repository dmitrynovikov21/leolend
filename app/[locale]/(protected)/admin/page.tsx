"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter()

  useEffect(() => {
    router.push(`/${locale}/dashboard/settings`)
  }, [locale, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h1 className="text-2xl font-bold">Redirecting to Admin Settings...</h1>
      <p className="text-muted-foreground">If you are not redirected automatically, click below.</p>
      <a
        href={`/${locale}/dashboard/settings`}
        className="text-blue-600 underline hover:text-blue-800"
      >
        Go to Settings
      </a>
    </div>
  )
}
