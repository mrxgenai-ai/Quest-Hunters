import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { SectionCTA } from "@/components/CTA"
import { FaqList } from "@/components/Faq"
import { JsonLd } from "@/components/JsonLd"
import { PageHero } from "@/components/PageHero"
import { Section } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { faqGroups, faqPage } from "@/content/faqs"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: faqPage.metaTitle,
  description: faqPage.metaDescription,
  path: "/faq/",
})

export default function FaqPage() {
  const all = faqGroups.flatMap((g) => g.items)
  return (
    <>
      <PageHero
        id="faq-title"
        eyebrow={faqPage.eyebrow}
        title={faqPage.title}
        subtitle={faqPage.subtitle}
        breadcrumb={{ label: "FAQ", href: "/faq/" }}
      >
        <nav aria-label="FAQ topics" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {faqGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="inline-flex h-11 items-center rounded-full border bg-card px-5 text-sm font-semibold hover:bg-muted">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-3xl space-y-16">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`}>
              <h2 id={`${g.id}-title`} className="text-2xl font-semibold sm:text-3xl">
                {g.title}
              </h2>
              <FaqList items={g.items} name={`faq-${g.id}`} />
            </section>
          ))}
          <SectionCTA>
            <WhatsAppButton location="faq_page" message="Hi Quest Hunter, I have a question about my business." size="lg">
              Ask your own question
            </WhatsAppButton>
            <ButtonLink href="/services/" variant="outline" size="lg">
              See services &amp; prices <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/how-it-works/" variant="outline" size="lg">
              How it works <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </SectionCTA>
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: all.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  )
}
