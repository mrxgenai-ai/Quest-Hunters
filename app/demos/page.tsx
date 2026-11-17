import type { Metadata } from "next"
import { ArrowRight, Info, Smartphone } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { SectionCTA } from "@/components/CTA"
import { DemoCard } from "@/components/DemoCard"
import { DemoFilter } from "@/components/DemoFilter"
import { JsonLd } from "@/components/JsonLd"
import { PageHero } from "@/components/PageHero"
import { Section, SectionHeader } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { siteConfig } from "@/config/site"
import { pageMetadata } from "@/lib/metadata"
import { businessTypes, demoPlans, demos, demosIntro, demosPage } from "@/content/demos"

export const metadata: Metadata = pageMetadata({
  title: demosPage.metaTitle,
  description: demosPage.metaDescription,
  path: "/demos/",
})

const GRID_ID = "demo-grid"

export default function DemosPage() {
  const typeCounts = Object.fromEntries([
    ["all", demos.length],
    ...businessTypes.map((t) => [t.id, demos.filter((d) => d.businessType === t.id).length]),
  ])
  const planCounts = Object.fromEntries([
    ["all", demos.length],
    ...demoPlans.map((p) => [p.id, demos.filter((d) => d.plan === p.id).length]),
  ])

  return (
    <>
      <PageHero
        id="demos-page-title"
        eyebrow={demosPage.eyebrow}
        title={demosPage.title}
        subtitle={demosPage.subtitle}
        breadcrumb={{ label: "Demos", href: "/demos/" }}
      >
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
      </PageHero>

      <Section labelledBy="demo-grid-title" className="pt-10 sm:pt-14">
        <h2 id="demo-grid-title" className="sr-only">
          Demo websites
        </h2>
        <DemoFilter gridId={GRID_ID} typeCounts={typeCounts} planCounts={planCounts} />
        <ul id={GRID_ID} className="mt-8 grid gap-6 sm:grid-cols-2">
          {demos.map((d) => (
            <li key={d.slug} data-type={d.businessType} data-plan={d.plan} className="flex [&>article]:flex-1">
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
            message="Hi Quest Hunter, I saw your demos and want something similar for my business."
            size="lg"
          >
            Get my free demo on WhatsApp
          </WhatsAppButton>
          <ButtonLink href="/services/" variant="outline" size="lg">
            Compare services <ArrowRight aria-hidden="true" />
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
              name: `${d.name} (${d.kind} demo)`,
              url: d.url,
            })),
          },
        }}
      />
    </>
  )
}
