import Image from "next/image"
import { ArrowUpRight, Check } from "lucide-react"
import { businessTypes, demoPlans, type Demo } from "@/content/demos"
import { cn } from "@/lib/utils"
import { buttonStyles } from "./Button"
import { DemoTilt } from "./effects/DemoTilt"
import { MiniSite, PhoneFrame } from "./PhoneFrame"
import { TrackedLink } from "./TrackedLink"

const typeLabel = (d: Demo) => businessTypes.find((t) => t.id === d.businessType)?.label ?? d.kind
const planLabel = (d: Demo) => demoPlans.find((p) => p.id === d.plan)?.label ?? d.plan

export function DemoCard({ demo, headingLevel = "h3" }: { demo: Demo; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  return (
    <article data-reveal className="group flex flex-col overflow-hidden rounded-2xl border bg-card">
      <DemoTilt height={300}>
      <div className="relative flex h-full justify-center overflow-hidden px-8 pt-8" style={{ backgroundColor: `${demo.tint}66` }}>
        <PhoneFrame className="w-[62%] max-w-[210px] translate-y-6 transition-transform duration-300 group-hover:translate-y-3">
          {demo.image ? (
            <div className="relative aspect-[9/16]">
              <Image
                src={demo.image}
                alt={`${demo.name} demo website on a phone`}
                fill
                sizes="210px"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <MiniSite name={demo.name} tint={demo.tint} cta={demo.previewCta} items={demo.items} />
          )}
        </PhoneFrame>
        <span className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-brand-strong shadow-sm">{planLabel(demo)}</span>
          {demo.addon && (
            <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-sm">+ {demo.addon}</span>
          )}
        </span>
      </div>
      </DemoTilt>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Heading className="text-2xl font-semibold">{demo.name}</Heading>
        <p className="text-sm text-muted-foreground">{typeLabel(demo)}</p>
        <ul className="mt-4 flex-1 space-y-2 text-sm">
          {demo.features.map((f) => (
            <li key={f} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <TrackedLink
          href={demo.url}
          external
          event="demo_open"
          params={{ demo: demo.slug, category: demo.businessType, plan: demo.plan }}
          className={cn(buttonStyles({ variant: "dark" }), "mt-6 w-full")}
        >
          Open live demo <ArrowUpRight aria-hidden="true" />
          <span className="sr-only">: {demo.name} (opens in a new tab)</span>
        </TrackedLink>
      </div>
    </article>
  )
}
