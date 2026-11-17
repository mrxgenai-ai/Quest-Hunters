import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { SectionCTA } from "@/components/CTA"
import { JsonLd } from "@/components/JsonLd"
import { PageHero } from "@/components/PageHero"
import { Section, SectionHeader } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { siteConfig, whatsappMessages } from "@/config/site"
import { buildProcess, growCycle, howItWorksPage } from "@/content/howItWorks"
import { pageMetadata } from "@/lib/metadata"
import ScrollStack, { ScrollStackItem } from "@/components/reactbits/ScrollStack"

export const metadata: Metadata = pageMetadata({
  title: howItWorksPage.metaTitle,
  description: howItWorksPage.metaDescription,
  path: "/how-it-works/",
})

function Steps({ steps, tone }: { steps: { title: string; desc: string }[]; tone: "card" | "dark" }) {
  return (
    <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li
          key={s.title}
          data-reveal
          className={tone === "dark" ? "rounded-2xl border border-white/15 bg-white/5 p-6" : "rounded-2xl bg-card p-6"}
        >
          <span className="grid size-10 place-items-center rounded-full bg-ember font-heading text-lg font-semibold text-night">
            {i + 1}
          </span>
          <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
          <p className={tone === "dark" ? "mt-2 text-sm text-white/75" : "mt-2 text-sm text-muted-foreground"}>{s.desc}</p>
        </li>
      ))}
    </ol>
  )
}

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        id="how-title"
        eyebrow={howItWorksPage.eyebrow}
        title={howItWorksPage.title}
        subtitle={howItWorksPage.subtitle}
        breadcrumb={{ label: "How it works", href: "/how-it-works/" }}
      />

      <Section id="build-process" tone="muted" labelledBy="build-process-title">
        <SectionHeader id="build-process-title" eyebrow={buildProcess.eyebrow} title={buildProcess.title} />
        {/* Steps stack up as you scroll (React Bits ScrollStack). Plain CSS sticky cards, so they work without JS too. */}
        <div className="mt-12">
          <ScrollStack
            useWindowScroll
            smoothScroll={false}
            snap={false}
            itemDistance={40}
            itemStackDistance={22}
            stackPosition="18%"
            itemScale={0.03}
            baseScale={0.9}
            dimAmount={0.06}
            holdDistance={120}
            className="-mx-4 sm:mx-0"
          >
            {buildProcess.steps.map((s, i) => (
              <ScrollStackItem
                key={s.title}
                itemClassName="h-auto! min-h-52 rounded-3xl! border p-7! sm:p-10!"
                style={{ background: "var(--card)", color: "var(--card-foreground)" }}
              >
                <div>
                  <p className="font-mono text-xs tracking-[0.18em] text-brand uppercase">
                    Step {i + 1} of {buildProcess.steps.length}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{s.title}</h3>
                  <p className="mt-3 max-w-2xl text-muted-foreground sm:text-lg">{s.desc}</p>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
        <SectionCTA>
          <WhatsAppButton
            location="how_it_works_build"
            message="Hi Quest Hunter, I'd like to book the 15-minute call about a website for my business."
            size="lg"
          >
            {buildProcess.cta.label}
          </WhatsAppButton>
          <ButtonLink href="/services/#build" variant="outline" size="lg">
            See website plans <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </SectionCTA>
      </Section>

      <Section id="grow-cycle" tone="dark" labelledBy="grow-cycle-title">
        <SectionHeader id="grow-cycle-title" dark eyebrow={growCycle.eyebrow} title={growCycle.title} subtitle={growCycle.subtitle} />
        <Steps steps={growCycle.steps} tone="dark" />
        <SectionCTA>
          <WhatsAppButton location="how_it_works_grow" message={whatsappMessages.grow} variant="light" size="lg">
            {growCycle.cta.label}
          </WhatsAppButton>
          <ButtonLink href="/services/#grow" variant="light" size="lg">
            See Grow plans <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </SectionCTA>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: buildProcess.title,
          description: howItWorksPage.metaDescription,
          url: `${siteConfig.url}/how-it-works/`,
          step: buildProcess.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
        }}
      />
    </>
  )
}
