import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CalendarCheck,
  Check,
  Globe2,
  Mail,
  Megaphone,
  MapPin,
  MessageCircle,
  Package,
  QrCode,
  Rocket,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react"
import { SectionCTA } from "@/components/CTA"
import { PlanCard } from "@/components/PlanCard"
import { Price } from "@/components/Price"
import { Section, SectionHeader } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { whatsappMessages } from "@/config/site"
import { addons, carePlan, plans, plansIntro } from "@/content/plans"
import { addonsIntro, bundles, growIntro, growServices, growTiers, whoWeWorkWith, type GrowServiceIcon } from "@/content/services"
import { cn } from "@/lib/utils"
import { whatsappLink } from "@/lib/whatsapp"
import { buttonStyles } from "@/components/Button"
import { TrackedLink } from "@/components/TrackedLink"
import { WhatsAppIcon } from "@/components/icons"
import { GlowCard } from "@/components/effects/GlowCard"

export function BuildSection() {
  return (
    <Section id="build" labelledBy="build-title" tone="card">
      <SectionHeader id="build-title" eyebrow={plansIntro.eyebrow} title={plansIntro.title} subtitle={plansIntro.subtitle} />
      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} />
        ))}
      </div>
      <p data-reveal className="mt-8 text-sm text-muted-foreground">
        Care plan from <Price inr={carePlan.monthlyFrom} usdKey={carePlan.id} suffix="/month" inrSuffix="" /> covers hosting,
        updates and support. All INR prices + 18% GST for clients in India.
      </p>
    </Section>
  )
}

const growIcons: Record<GrowServiceIcon, LucideIcon> = {
  social: Megaphone,
  whatsapp: MessageCircle,
  email: Mail,
  local: MapPin,
  report: BarChart3,
}

export function GrowSection() {
  return (
    <Section id="grow" labelledBy="grow-title">
      <SectionHeader id="grow-title" eyebrow={growIntro.eyebrow} title={growIntro.title} subtitle={growIntro.subtitle} />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {growServices.map((s) => {
          const Icon = growIcons[s.icon]
          return (
            <li key={s.id} data-reveal className="rounded-2xl border bg-card p-6">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand-strong">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>

      <h3 id="grow-tiers-title" data-reveal className="mt-20 text-2xl font-semibold sm:text-3xl">
        Grow plans, billed monthly
      </h3>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {growTiers.map((t) => (
          <GlowCard key={t.id} dark={t.featured} data-reveal className="flex h-full">
          <article aria-labelledby={`tier-${t.id}`} className="relative flex flex-1 flex-col p-6 sm:p-7">
            {t.featured && (
              <span className="mb-3 w-fit rounded-full bg-ember px-3 py-1 font-mono text-[11px] font-bold tracking-wide text-night uppercase">
                Most popular
              </span>
            )}
            <h4 id={`tier-${t.id}`} className="font-heading text-2xl font-semibold">
              {t.name}
            </h4>
            <p className={cn("mt-1 text-sm", t.featured ? "text-white/75" : "text-muted-foreground")}>{t.bestFor}</p>
            <p className="mt-6">
              <Price inr={t.priceMonthly} usdKey={t.id} suffix="/month" amountClassName="font-heading text-3xl font-semibold" />
            </p>
            <ul className={cn("mt-6 flex-1 space-y-2.5 border-t pt-6 text-sm", t.featured && "border-white/15")}>
              {t.includes.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <Check className={cn("mt-0.5 size-4 shrink-0", t.featured ? "text-orange-300" : "text-brand")} aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <TrackedLink
              href={whatsappLink(`Hi Quest Hunter, I'm interested in the ${t.name} Grow plan for my business.`)}
              external
              event="plan_click"
              params={{ plan: `grow_${t.id}` }}
              className={cn(buttonStyles({ variant: t.featured ? "primary" : "dark", size: "lg" }), "mt-8 w-full")}
            >
              <WhatsAppIcon /> Ask about {t.name}
            </TrackedLink>
          </article>
          </GlowCard>
        ))}
      </div>
      <p data-reveal className="mt-6 text-sm text-muted-foreground">
        Ad spend and WhatsApp&apos;s own message fees are paid separately. Prices + 18% GST for clients in India.
      </p>
    </Section>
  )
}

const addonIcons: Record<string, LucideIcon> = { "qr-ordering": QrCode, "booking-system": CalendarCheck }

export function AddonsSection() {
  return (
    <Section id="add-ons" labelledBy="addons-title" tone="muted">
      <SectionHeader id="addons-title" eyebrow={addonsIntro.eyebrow} title={addonsIntro.title} />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {addons.map((a) => {
          const Icon = addonIcons[a.id] ?? Package
          return (
            <article key={a.id} data-reveal aria-labelledby={`addon-${a.id}`} className="flex flex-col rounded-2xl border bg-card p-6">
              <span className="grid size-12 place-items-center rounded-xl bg-ember text-night">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-5 text-xs font-bold tracking-[0.16em] text-brand-strong uppercase">Add-on</p>
              <h3 id={`addon-${a.id}`} className="mt-1 text-2xl font-semibold">
                {a.name}
              </h3>
              <p className="mt-2 flex-1 text-muted-foreground">{a.promise}</p>
              <p className="mt-5 font-semibold">
                From <Price inr={a.priceFrom} usdKey={a.id} amountClassName="font-heading text-2xl" />
                {a.monthly ? <> + <Price inr={a.monthly} suffix="/month" inrSuffix="" /></> : null}
              </p>
              {a.href && (
                <Link
                  href={a.href}
                  className="mt-2 inline-flex items-center gap-1 py-1 text-sm font-semibold text-brand-strong underline-offset-4 hover:underline"
                >
                  How {a.name} works <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </article>
          )
        })}
      </div>

      <div className="mt-5 grid gap-5">
        {bundles.map((b) => (
          <article
            key={b.id}
            data-reveal
            aria-labelledby={`bundle-${b.id}`}
            className="flex flex-col gap-4 rounded-2xl border border-dashed border-brand/50 bg-brand-soft/50 p-6 sm:flex-row sm:items-center sm:p-7"
          >
            <div className="flex-1">
              <p className="text-xs font-bold tracking-[0.16em] text-brand-strong uppercase">Bundle</p>
              <h3 id={`bundle-${b.id}`} className="mt-1 text-2xl font-semibold">
                {b.name}
              </h3>
              <p className="mt-1 text-muted-foreground">{b.desc}</p>
            </div>
            <p className="font-semibold sm:text-right">
              <Price inr={b.priceFrom} usdKey={b.id} amountClassName="font-heading text-2xl" />
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}

const groupIcons: Record<string, LucideIcon> = { rocket: Rocket, store: Store, utensils: UtensilsCrossed, briefcase: Briefcase }

export function WhoWeWorkWith() {
  return (
    <Section id="who-we-work-with" labelledBy="who-title" tone="card">
      <SectionHeader id="who-title" eyebrow={whoWeWorkWith.eyebrow} title={whoWeWorkWith.title} />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whoWeWorkWith.groups.map((g) => {
          const Icon = groupIcons[g.icon] ?? Store
          return (
            <li key={g.title} data-reveal className="rounded-2xl border bg-background p-6">
              <Icon className="size-7 text-brand" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">{g.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{g.desc}</p>
            </li>
          )
        })}
      </ul>
      <ul className="mt-5 grid gap-5 md:grid-cols-2">
        {whoWeWorkWith.reach.map((r, i) => (
          <li key={r.title} data-reveal className="flex gap-4 rounded-2xl bg-ink p-6 text-white">
            {i === 0 ? (
              <MapPin className="size-7 shrink-0 text-orange-300" aria-hidden="true" />
            ) : (
              <Globe2 className="size-7 shrink-0 text-orange-300" aria-hidden="true" />
            )}
            <div>
              <h3 className="text-xl font-semibold">{r.title}</h3>
              <p className="mt-1 text-white/80">{r.desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <SectionCTA>
        <WhatsAppButton location="services_who" message={whatsappMessages.quote} size="lg">
          Tell us about your business
        </WhatsAppButton>
      </SectionCTA>
    </Section>
  )
}
