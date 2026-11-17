import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionCTA } from "@/components/CTA"
import { CurrencySwitch } from "@/components/CurrencySwitch"
import { QuestCTA } from "@/components/effects/QuestCTA"
import { JsonLd } from "@/components/JsonLd"
import { PageHero } from "@/components/PageHero"
import { Section, SectionHeader } from "@/components/Section"
import { AddonsSection, BuildSection, GrowSection, WhoWeWorkWith } from "@/components/sections/ServicesSections"
import { Trust } from "@/components/sections/Trust"
import { WhyUs } from "@/components/sections/WhyUs"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { whatsappMessages } from "@/config/site"
import { servicesPage } from "@/content/services"
import { pageMetadata } from "@/lib/metadata"
import { servicesSchema } from "@/lib/schema"

export const metadata: Metadata = pageMetadata({
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  path: "/services/",
})

export default function ServicesPage() {
  return (
    <>
      <PageHero
        id="services-title"
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        subtitle={servicesPage.subtitle}
        breadcrumb={{ label: "Services", href: "/services/" }}
      >
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:max-w-2xl">
          {servicesPage.lines.map((l) => (
            <li key={l.id}>
              <Link
                href={`#${l.id}`}
                className="flex h-full items-center justify-between gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-foreground/40"
              >
                <span>
                  <span className="block font-heading text-2xl font-semibold">{l.label}</span>
                  <span className="text-sm text-muted-foreground">{l.desc}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-brand" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <CurrencySwitch />
          <span>Outside India? Switch to USD.</span>
        </div>
      </PageHero>

      <BuildSection />
      <GrowSection />
      <AddonsSection />
      <WhoWeWorkWith />
      <WhyUs />
      <Trust />

      <Section tone="dark" labelledBy="services-cta-title">
        <SectionHeader
          id="services-cta-title"
          dark
          title="Not sure which one you need?"
          subtitle="Tell us about your business. We'll suggest the smallest plan that does the job, in writing, within 24 hours."
          align="center"
        />
        <SectionCTA align="center">
          <QuestCTA href="/contact/">
            Start your quest <ArrowRight aria-hidden="true" />
          </QuestCTA>
          <WhatsAppButton location="services_cta" message={whatsappMessages.quote} variant="light" size="lg">
            Ask on WhatsApp
          </WhatsAppButton>
        </SectionCTA>
      </Section>

      <JsonLd data={servicesSchema()} />
    </>
  )
}
