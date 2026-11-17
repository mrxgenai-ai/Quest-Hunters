import Link from "next/link"
import { Check, Clock } from "lucide-react"
import type { Plan } from "@/content/plans"
import { cn } from "@/lib/utils"
import { whatsappLink } from "@/lib/whatsapp"
import { buttonStyles } from "./Button"
import { GlowCard } from "./effects/GlowCard"
import { Price } from "./Price"
import { TrackedLink } from "./TrackedLink"
import { WhatsAppIcon } from "./icons"

export function PlanCard({ plan }: { plan: Plan }) {
  const featured = plan.featured
  return (
    <GlowCard dark={featured} data-reveal className="flex h-full">
    <article aria-labelledby={`plan-${plan.id}`} className="relative flex flex-1 flex-col p-6 sm:p-7">
      {featured && (
        <span className="mb-3 w-fit rounded-full bg-ember px-3 py-1 font-mono text-[11px] font-bold tracking-wide text-night uppercase">
          Most popular
        </span>
      )}
      <h3 id={`plan-${plan.id}`} className="text-2xl font-semibold">
        {plan.name}
      </h3>
      <p className={cn("mt-1 text-sm", featured ? "text-white/75" : "text-muted-foreground")}>{plan.promise}</p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className={cn("text-sm", featured ? "text-white/75" : "text-muted-foreground")}>From</span>
        <Price inr={plan.priceFrom} usdKey={plan.id} amountClassName="font-heading text-4xl font-semibold" />
      </p>
      <p
        className={cn(
          "mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
          featured ? "bg-white/10 text-white" : "bg-brand-soft text-accent-foreground",
        )}
      >
        <Clock className="size-3.5" aria-hidden="true" /> Live in {plan.timeline}
      </p>

      <p className={cn("mt-4 text-sm", featured ? "text-white/85" : "text-foreground")}>
        <span className="font-semibold">Best for:</span> {plan.bestFor}
      </p>

      <ul className={cn("mt-6 flex-1 space-y-2.5 border-t pt-6 text-sm", featured && "border-white/15")}>
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-orange-300" : "text-brand")} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <TrackedLink
        href={whatsappLink(`Hi Quest Hunter, I'm interested in the ${plan.name} website plan for my business.`)}
        external
        event="plan_click"
        params={{ plan: plan.id }}
        className={cn(buttonStyles({ variant: featured ? "primary" : "dark", size: "lg" }), "mt-8 w-full")}
      >
        <WhatsAppIcon /> Choose {plan.name}
      </TrackedLink>
      <Link
        href={`/demos/#plan=${plan.id}`}
        className={cn(
          "mt-3 py-2 text-center text-sm font-medium underline-offset-4 hover:underline",
          featured ? "text-white/85" : "text-muted-foreground",
        )}
      >
        See the {plan.name} demo
      </Link>
    </article>
    </GlowCard>
  )
}
