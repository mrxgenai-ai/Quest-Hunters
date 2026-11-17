import { ArrowRight, Info } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { SectionCTA } from "@/components/CTA"
import { DemoCard } from "@/components/DemoCard"
import { Section, SectionHeader } from "@/components/Section"
import { demos, demosIntro } from "@/content/demos"

export function DemosPreview() {
  return (
    <Section id="demos" labelledBy="demos-title">
      <SectionHeader id="demos-title" eyebrow={demosIntro.eyebrow} title={demosIntro.title} subtitle={demosIntro.subtitle} />
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {demos.map((d) => (
          <DemoCard key={d.slug} demo={d} />
        ))}
      </div>
      <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {demosIntro.disclaimer}
      </p>
      <SectionCTA>
        <ButtonLink href="/demos/" size="lg">
          See all demos <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </SectionCTA>
    </Section>
  )
}
