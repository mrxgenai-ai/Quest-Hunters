import Link from "next/link"
import { ArrowRight, QrCode } from "lucide-react"
import { SectionCTA } from "@/components/CTA"
import { PlanCard } from "@/components/PlanCard"
import { Section, SectionHeader } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { carePlan, plans, plansIntro, qrAddon } from "@/content/plans"
import { formatINR } from "@/lib/utils"

export function Plans() {
  return (
    <Section id="plans" labelledBy="plans-title" tone="card">
      <SectionHeader id="plans-title" eyebrow={plansIntro.eyebrow} title={plansIntro.title} />

      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} />
        ))}
      </div>

      <article
        data-reveal
        aria-labelledby="addon-title"
        className="mt-6 flex flex-col gap-5 rounded-2xl border border-dashed border-brand/50 bg-brand-soft/50 p-6 sm:flex-row sm:items-center sm:p-7"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
          <QrCode className="size-6" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-[0.16em] text-brand-strong uppercase">{qrAddon.label}</p>
          <h3 id="addon-title" className="mt-1 text-2xl font-semibold">
            {qrAddon.name}
          </h3>
          <p className="mt-1 text-muted-foreground">{qrAddon.promise}</p>
        </div>
        <div className="sm:text-right">
          <p className="font-semibold">
            From <span className="font-heading text-2xl">{formatINR(qrAddon.priceFrom)}</span> + {formatINR(qrAddon.monthly)}/month
          </p>
          <Link
            href={qrAddon.href}
            className="mt-1 inline-flex items-center gap-1 py-1 text-sm font-semibold text-brand-strong underline-offset-4 hover:underline"
          >
            How QR ordering works <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </article>

      <SectionCTA note={`${carePlan.note} All prices + 18% GST.`}>
        <WhatsAppButton location="plans" message="Hi Quest Hunter, can you help me pick the right plan for my restaurant?" size="lg">
          Not sure? Ask us on WhatsApp
        </WhatsAppButton>
      </SectionCTA>
    </Section>
  )
}
