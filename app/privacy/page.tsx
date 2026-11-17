import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"
import { privacy } from "@/content/legal"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: privacy.metaTitle,
  description: "How Quest Hunter handles information sent through this website.",
  path: "/privacy/",
})

export default function PrivacyPage() {
  return <LegalPage title={privacy.title} href="/privacy/" updated={privacy.updated} intro={privacy.intro} sections={privacy.sections} />
}
