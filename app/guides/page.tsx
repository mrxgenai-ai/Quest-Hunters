import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { SectionCTA } from "@/components/CTA"
import { Container, Eyebrow, Section } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { guides, guidesIntro } from "@/content/guides"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: guidesIntro.metaTitle,
  description: guidesIntro.metaDescription,
  path: "/guides/",
})

export default function GuidesPage() {
  return (
    <>
      <Container className="pt-8 pb-12 sm:pt-12 sm:pb-16">
        <Breadcrumbs items={[{ label: "Guides", href: "/guides/" }]} />
        <Eyebrow className="mt-8">{guidesIntro.eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[2.25rem] leading-[1.08] font-semibold sm:text-5xl">{guidesIntro.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{guidesIntro.subtitle}</p>
      </Container>

      <Section tone="card" className="pt-12 sm:pt-16" labelledBy="guides-list-title">
        <h2 id="guides-list-title" className="sr-only">
          All guides
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug} data-reveal>
              <Link
                href={`/guides/${g.slug}/`}
                className="group flex h-full flex-col rounded-2xl border bg-background p-6 transition-colors hover:border-brand/50 sm:p-7"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-brand-strong uppercase">{g.category}</span>
                <span className="mt-3 font-heading text-2xl leading-snug font-semibold group-hover:underline">{g.title}</span>
                <span className="mt-3 flex-1 text-muted-foreground">{g.description}</span>
                <span className="mt-5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="size-4" aria-hidden="true" /> {g.readMinutes} min read
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-brand-strong">
                    Read <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <SectionCTA>
          <WhatsAppButton location="guides_index" message="Hi Quest Hunter, I have a question about my business website." size="lg">
            Got a question we haven&apos;t covered? Ask us
          </WhatsAppButton>
        </SectionCTA>
      </Section>
    </>
  )
}
