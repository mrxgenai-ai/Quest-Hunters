import { ArrowRight, BadgePercent, KeyRound, MapPin, UtensilsCrossed, type LucideIcon } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { SectionCTA } from "@/components/CTA"
import { Section, SectionHeader } from "@/components/Section"
import { whyUs } from "@/content/home"

const icons: Record<string, LucideIcon> = {
  key: KeyRound,
  utensils: UtensilsCrossed,
  "map-pin": MapPin,
  "badge-percent": BadgePercent,
}

export function WhyUs() {
  return (
    <Section id="why-us" labelledBy="why-title">
      <SectionHeader id="why-title" eyebrow={whyUs.eyebrow} title={whyUs.title} />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2">
        {whyUs.points.map((p) => {
          const Icon = icons[p.icon] ?? KeyRound
          return (
            <li key={p.title} data-reveal className="flex gap-5 rounded-2xl border bg-card p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-strong">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{p.desc}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <SectionCTA>
        <ButtonLink href="/#contact" size="lg">
          Get a free demo <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </SectionCTA>
    </Section>
  )
}
