import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Handshake, MapPin } from "lucide-react"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ButtonLink } from "@/components/Button"
import { ContactForm } from "@/components/ContactForm"
import { SectionCTA } from "@/components/CTA"
import { Faq } from "@/components/Faq"
import { JsonLd } from "@/components/JsonLd"
import { PlanCard } from "@/components/PlanCard"
import { Container, Eyebrow, Section, SectionHeader } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { siteConfig } from "@/config/site"
import { cities } from "@/content/cities"
import { generalFaqs } from "@/content/faqs"
import { guides } from "@/content/guides"
import { plans } from "@/content/plans"
import { pageMetadata } from "@/lib/metadata"

type Props = { params: Promise<{ city: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) return {}
  return pageMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/website-development/${city.slug}/`,
  })
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) notFound()

  const plan = plans.find((p) => p.id === city.recommended.planId) ?? plans[0]
  const otherCities = cities.filter((c) => c.slug !== city.slug)
  // City-specific questions first, then two general ones (GST, upgrades).
  const faqs = [...city.faqs, ...generalFaqs]
  const waMessage = `Hi Quest Hunter, I have a business in ${city.name} and want a website.`
  const url = `${siteConfig.url}/website-development/${city.slug}/`

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="city-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-20%] h-[34rem] w-[34rem] rounded-full bg-brand-soft blur-3xl" />
        <Container className="relative pt-8 pb-16 sm:pt-12 sm:pb-20">
          <Breadcrumbs items={[{ label: `Website development in ${city.name}`, href: `/website-development/${city.slug}/` }]} />
          <Eyebrow className="mt-8">
            <MapPin className="mr-1.5 -mt-0.5 inline size-3.5" aria-hidden="true" />
            Website development · {city.name}
            {city.alsoKnownAs && ` (${city.alsoKnownAs})`}
          </Eyebrow>
          <h1 id="city-title" className="mt-4 max-w-4xl text-[2.25rem] leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">
            {city.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">{city.hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton location={`city_${city.slug}_hero`} message={waMessage} size="lg">
              Get a free quote on WhatsApp
            </WhatsAppButton>
            <ButtonLink href="/demos/" variant="outline" size="lg">
              See live demos <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Intro + how we work here */}
      <Section tone="card" labelledBy="city-intro-title">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div data-reveal>
            <h2 id="city-intro-title" className="text-3xl leading-tight font-semibold sm:text-4xl">
              Why businesses in {city.name} need their own website
            </h2>
            {city.intro.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-lg text-pretty text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
          <aside data-reveal className="self-start rounded-2xl bg-brand-soft p-6 sm:p-8">
            <Handshake className="size-8 text-brand-strong" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold">{city.howWeWork.title}</h2>
            <p className="mt-3 text-accent-foreground">{city.howWeWork.desc}</p>
          </aside>
        </div>
      </Section>

      {/* Local needs */}
      <Section labelledBy="needs-title">
        <SectionHeader id="needs-title" eyebrow={`For ${city.name}`} title={`What we build for ${city.name} businesses`} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {city.needs.map((n, i) => (
            <li key={n.title} data-reveal className="rounded-2xl border bg-card p-6">
              <span className="font-heading text-3xl font-semibold text-brand">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{n.title}</h3>
              <p className="mt-2 text-muted-foreground">{n.desc}</p>
            </li>
          ))}
        </ul>
        <SectionCTA>
          <ButtonLink href="/demos/" size="lg">
            See it in a live demo <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </SectionCTA>
      </Section>

      {/* Recommended plan */}
      <Section tone="muted" labelledBy="rec-title">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeader id="rec-title" eyebrow="Where most start" title={`Our usual starting point in ${city.name}: ${plan.name}`} subtitle={city.recommended.why} />
            <p data-reveal className="mt-6">
              <Link href="/services/#build" className="inline-flex items-center gap-1 py-1 font-semibold text-brand-strong underline-offset-4 hover:underline">
                Compare all three plans <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </p>
          </div>
          <div className="mx-auto w-full max-w-md">
            <PlanCard plan={plan} />
          </div>
        </div>
      </Section>

      {/* Areas */}
      <Section labelledBy="areas-title" className="py-16 sm:py-20">
        <h2 id="areas-title" className="text-2xl font-semibold sm:text-3xl">
          Areas we serve in and around {city.name}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {city.areas.map((a) => (
            <li key={a} className="rounded-full border bg-card px-4 py-2 text-sm font-medium">
              {a}
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section tone="card" labelledBy="city-faq-title">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader id="city-faq-title" eyebrow="FAQ" title={`Questions from ${city.name} owners`} />
          <div>
            <Faq items={faqs} idPrefix={`faq-${city.slug}`} />
            <SectionCTA>
              <WhatsAppButton location={`city_${city.slug}_faq`} message={waMessage} size="lg">
                Ask us on WhatsApp
              </WhatsAppButton>
            </SectionCTA>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section labelledBy="city-contact-title">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeader
              id="city-contact-title"
              eyebrow="Free demo"
              title={`Get a free demo for your ${city.name} business`}
              subtitle="Leave your number and we'll WhatsApp you within 2 hours (10am–8pm IST)."
            />
            <div data-reveal className="mt-10 space-y-6">
              <div>
                <h3 className="font-sans text-sm font-bold tracking-wide uppercase">Other cities</h3>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                  {otherCities.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/website-development/${c.slug}/`} className="inline-block py-1.5 text-brand-strong underline-offset-4 hover:underline">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-sans text-sm font-bold tracking-wide uppercase">Helpful guides</h3>
                <ul className="mt-2 space-y-1">
                  {guides.slice(0, 2).map((g) => (
                    <li key={g.slug}>
                      <Link href={`/guides/${g.slug}/`} className="inline-block py-1.5 text-brand-strong underline-offset-4 hover:underline">
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div data-reveal className="rounded-3xl border bg-card p-5 sm:p-8">
            <ContactForm source={`city_${city.slug}`} messagePlaceholder={`Your area in ${city.name}, type of business, what you'd like…`} />
          </div>
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Website development in ${city.name}`,
          serviceType: "Website development",
          url,
          description: city.metaDescription,
          provider: { "@id": `${siteConfig.url}/#organization`, "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          areaServed: {
            "@type": "City",
            name: city.name,
            ...(city.alsoKnownAs ? { alternateName: city.alsoKnownAs } : {}),
            containedInPlace: { "@type": "State", name: "Maharashtra" },
          },
        }}
      />
    </>
  )
}
