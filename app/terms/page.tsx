import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"
import { terms } from "@/content/legal"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: terms.metaTitle,
  description: "Terms for using the Quest Hunter website, including prices, demos and timelines.",
  path: "/terms/",
})

export default function TermsPage() {
  return <LegalPage title={terms.title} href="/terms/" updated={terms.updated} intro={terms.intro} sections={terms.sections} />
}
