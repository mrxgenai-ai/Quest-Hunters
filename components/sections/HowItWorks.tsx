import { SectionCTA } from "@/components/CTA"
import { Section, SectionHeader } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { howItWorks } from "@/content/home"

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title" tone="muted">
      <SectionHeader id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.steps.map((s, i) => (
          <li key={s.title} data-reveal className="relative rounded-2xl bg-card p-6">
            <span className="grid size-10 place-items-center rounded-full bg-brand font-heading text-lg font-semibold text-white">
              {i + 1}
            </span>
            <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
      <SectionCTA>
        <WhatsAppButton location="how_it_works" message="Hi Quest Hunter, I'd like to book the 15-minute call about my restaurant website." size="lg">
          {howItWorks.cta.label}
        </WhatsAppButton>
      </SectionCTA>
    </Section>
  )
}
