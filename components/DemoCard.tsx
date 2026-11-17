import Image from "next/image"
import { ArrowUpRight, Check } from "lucide-react"
import type { Demo, DemoCategory } from "@/content/demos"
import { cn } from "@/lib/utils"
import { buttonStyles } from "./Button"
import { MiniSite, PhoneFrame } from "./PhoneFrame"
import { TrackedLink } from "./TrackedLink"

const ctaByCategory: Record<DemoCategory, string> = {
  Basic: "View menu",
  Automation: "Book a table",
  "E-commerce": "Order now",
  "QR Ordering": "Order to table",
}

export function DemoCard({ demo, headingLevel = "h3" }: { demo: Demo; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  return (
    <article data-reveal className="group flex flex-col overflow-hidden rounded-2xl border bg-card">
      <div className="relative flex justify-center overflow-hidden px-8 pt-8" style={{ backgroundColor: `${demo.tint}66` }}>
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
            <MiniSite name={demo.name} tint={demo.tint} cta={ctaByCategory[demo.category]} menu={demo.menu} />
          )}
        </PhoneFrame>
        <span className="absolute top-4 left-4 rounded-full bg-card px-3 py-1 text-xs font-semibold text-brand-strong shadow-sm">
          {demo.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Heading className="text-2xl font-semibold">{demo.name}</Heading>
        <p className="text-sm text-muted-foreground">{demo.kind}</p>
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
          params={{ demo: demo.slug, category: demo.category }}
          className={cn(buttonStyles({ variant: "dark" }), "mt-6 w-full")}
        >
          Open live demo <ArrowUpRight aria-hidden="true" />
          <span className="sr-only">: {demo.name} (opens in a new tab)</span>
        </TrackedLink>
      </div>
    </article>
  )
}
