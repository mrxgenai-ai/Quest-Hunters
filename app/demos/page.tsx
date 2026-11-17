import type { Metadata } from "next"
import { ArrowRight, Info, Smartphone } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { SectionCTA } from "@/components/CTA"
import { DemoCard } from "@/components/DemoCard"
import { DemoFilter } from "@/components/DemoFilter"
import { JsonLd } from "@/components/JsonLd"
import { Container, Eyebrow, Section, SectionHeader } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { siteConfig } from "@/config/site"
import { pageMetadata } from "@/lib/metadata"
import { demoCategories, demos, demosIntro, demosPage, type DemoCategory } from "@/content/demos"

export const metadata: Metadata = pageMetadata({
  title: demosPage.metaTitle,
  description: demosPage.metaDescription,
  path: "/demos/",
})

const GRID_ID = "demo-grid"

export default function DemosPage() {
  const counts = Object.fromEntries(
    demoCategories.map((c) => [c, c === "All" ? demos.length : demos.filter((d) => d.category === c).length]),
  ) as Record<"All" | DemoCategory, number>

  return (
    <>
      <section aria-labelledby="demos-page-title" className="relative overflow-hidden border-b">
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 right-[-15%] h-[30rem] w-[30rem] rounded-full bg-brand-soft blur-3xl" />
        <Container className="relative pt-12 pb-14 sm:pt-20 sm:pb-16">
          <Eyebrow>{demosPage.eyebrow}</Eyebrow>
          <h1 id="demos-page-title" className="mt-4 max-w-3xl text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl">
            {demosPage.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">{demosPage.subtitle}</p>
          <ul className="mt-6 space-y-2 text-sm">
            {demosPage.tips.map((t, i) => (
              <li key={t} className="flex items-start gap-2">
                {i === 0 ? (
                  <Smartphone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                ) : (
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                )}
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section labelledBy="demo-grid-title" className="pt-10 sm:pt-14">
        <h2 id="demo-grid-title" className="sr-only">
          Demo websites
        </h2>
        <DemoFilter gridId={GRID_ID} counts={counts} />
        <ul id={GRID_ID} className="mt-8 grid gap-6 sm:grid-cols-2">
          {demos.map((d) => (
            <li key={d.slug} data-category={d.category} className="flex [&>article]:flex-1">
              <DemoCard demo={d} />
            </li>
          ))}
        </ul>
        <p className="mt-8 flex items-start gap-2 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {demosIntro.disclaimer}
        </p>
      </Section>

      <Section tone="muted" labelledBy="demos-cta-title">
        <SectionHeader id="demos-cta-title" title={demosPage.closing.title} subtitle={demosPage.closing.subtitle} align="center" />
        <SectionCTA align="center">
          <WhatsAppButton
            location="demos_page"
            message="Hi Quest Hunter, I saw your demos and want something similar for my restaurant."
            size="lg"
          >
            Get my free demo on WhatsApp
          </WhatsAppButton>
          <ButtonLink href="/#plans" variant="outline" size="lg">
            Compare plans <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </SectionCTA>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: demosPage.metaTitle,
          description: demosPage.metaDescription,
          url: `${siteConfig.url}/demos/`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: demos.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${d.name} (${d.category} demo)`,
              url: d.url,
            })),
          },
        }}
      />
    </>
  )
}
