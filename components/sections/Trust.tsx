import { ArrowRight, MessageSquareQuote, Star } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { SectionCTA } from "@/components/CTA"
import { Section, SectionHeader } from "@/components/Section"
import { trust } from "@/content/home"

/**
 * Reviews and results. Shows an honest empty state until `trust.showReviews`
 * is switched on in content/home.ts with real, verifiable reviews.
 */
export function Trust() {
  const hasContent = trust.showReviews && (trust.reviews.length > 0 || trust.results.length > 0)

  return (
    <Section id="results" labelledBy="trust-title" tone="card">
      <SectionHeader id="trust-title" eyebrow={trust.eyebrow} title={trust.title} />

      {hasContent ? (
        <div className="mt-14 space-y-10">
          {trust.googleRating.count > 0 && (
            <a
              href={trust.googleRating.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border bg-background px-5 py-3 hover:bg-muted"
            >
              <Star className="size-5 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="font-heading text-2xl font-semibold">{trust.googleRating.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">{trust.googleRating.count} Google reviews</span>
            </a>
          )}
          {trust.results.length > 0 && (
            <ul className="grid gap-5 sm:grid-cols-3">
              {trust.results.map((r) => (
                <li key={r.business} data-reveal className="rounded-2xl bg-brand-soft p-6">
                  <p className="font-heading text-4xl font-semibold text-brand-strong">{r.metric}</p>
                  <p className="mt-2 text-sm">{r.detail}</p>
                  <p className="mt-3 text-sm font-semibold">{r.business}</p>
                </li>
              ))}
            </ul>
          )}
          {trust.reviews.length > 0 && (
            <ul className="grid gap-5 md:grid-cols-2">
              {trust.reviews.map((r) => (
                <li key={r.name} data-reveal className="rounded-2xl border bg-background p-6">
                  <p className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className={i < r.rating ? "size-4 fill-amber-400 text-amber-400" : "size-4 text-border"}
                      />
                    ))}
                  </p>
                  <blockquote className="mt-3">“{r.text}”</blockquote>
                  <p className="mt-4 text-sm font-semibold">
                    {r.name} · <span className="font-normal text-muted-foreground">{r.business}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div data-reveal className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-dashed bg-background p-8 sm:flex-row sm:items-center sm:p-10">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
            <MessageSquareQuote className="size-7" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-2xl font-semibold">{trust.emptyState.title}</h3>
            <p className="mt-2 max-w-2xl text-muted-foreground">{trust.emptyState.desc}</p>
          </div>
        </div>
      )}

      <SectionCTA>
        <ButtonLink href="/demos/" size="lg">
          Try the live demos <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </SectionCTA>
    </Section>
  )
}
