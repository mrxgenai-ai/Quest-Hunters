import { ChevronDown } from "lucide-react"
import type { Faq as FaqItem } from "@/content/faqs"
import { JsonLd } from "./JsonLd"

/**
 * FAQ accordion built on native <details>: zero JavaScript, keyboard accessible,
 * and the answers stay in the HTML for search engines.
 */
export function FaqList({ items, name }: { items: FaqItem[]; name: string }) {
  return (
    <div className="mt-8 border-t">
      {items.map((f) => (
        <details key={f.q} name={name} className="group border-b">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold sm:text-xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown
              className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-6 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

/** FaqList plus FAQPage structured data (use once per page). */
export function Faq({ items, idPrefix = "faq" }: { items: FaqItem[]; idPrefix?: string }) {
  return (
    <>
      <FaqList items={items} name={idPrefix} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  )
}
