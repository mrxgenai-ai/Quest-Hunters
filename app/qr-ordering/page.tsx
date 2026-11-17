import type { Metadata } from "next"
import { ArrowUpRight, Check, CircleSlash, ListOrdered, Pencil, Tag, X, type LucideIcon } from "lucide-react"
import { buttonStyles } from "@/components/Button"
import { ContactForm } from "@/components/ContactForm"
import { SectionCTA } from "@/components/CTA"
import { Faq } from "@/components/Faq"
import { JsonLd } from "@/components/JsonLd"
import { ConsoleMock, GuestBrowse, GuestCart, GuestStatus, KitchenMock, Screenshot, TableQrCard } from "@/components/mockups"
import { PhoneFrame } from "@/components/PhoneFrame"
import { Container, Eyebrow, Section, SectionHeader } from "@/components/Section"
import { TrackedLink } from "@/components/TrackedLink"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { siteConfig } from "@/config/site"
import { demos } from "@/content/demos"
import { qrAddon } from "@/content/plans"
import { qrFaqs, qrPage } from "@/content/qrOrdering"
import { pageMetadata } from "@/lib/metadata"
import { cn, formatINR } from "@/lib/utils"

export const metadata: Metadata = pageMetadata({
  title: qrPage.metaTitle,
  description: qrPage.metaDescription,
  path: "/qr-ordering/",
})

const consoleIcons: Record<string, LucideIcon> = { list: ListOrdered, pencil: Pencil, toggle: CircleSlash, tag: Tag }
const guestScreens = [GuestBrowse, GuestCart, GuestStatus]
const qrWhatsApp = "Hi Quest Hunter, I'm interested in Table QR Ordering for my restaurant."

function priceLine() {
  return (
    <>
      From <strong className="font-heading text-2xl font-semibold text-foreground">{formatINR(qrAddon.priceFrom)}</strong> setup +{" "}
      <strong className="text-foreground">{formatINR(qrAddon.monthly)}/month</strong> · + GST
    </>
  )
}

function DemoLink({ className, variant = "primary" }: { className?: string; variant?: "primary" | "dark" | "outline" | "light" }) {
  const demo = demos.find((d) => d.slug === qrPage.hero.demoSlug)
  if (!demo) return null
  return (
    <TrackedLink
      href={demo.url}
      external
      event="demo_open"
      params={{ demo: demo.slug, category: demo.category, location: "qr_page" }}
      className={cn(buttonStyles({ variant, size: "lg" }), className)}
    >
      Try the {demo.name} demo <ArrowUpRight aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </TrackedLink>
  )
}

export default function QrOrderingPage() {
  const { hero, journey, console: ownerConsole, kitchen, pricing, enquiry, screenshots } = qrPage

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="qr-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-20%] h-[36rem] w-[36rem] rounded-full bg-brand-soft blur-3xl" />
        <Container className="relative grid items-center gap-14 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pt-20 lg:pb-24">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 id="qr-title" className="mt-4 text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl lg:text-[4rem]">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">{hero.subtitle}</p>
            <p className="mt-5 text-sm text-muted-foreground">{priceLine()}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <DemoLink />
              <WhatsAppButton location="qr_hero" message={qrWhatsApp} size="lg">
                Ask on WhatsApp
              </WhatsAppButton>
            </div>
            <ul className="mt-7 flex flex-col gap-2 text-sm font-medium sm:flex-row sm:flex-wrap sm:gap-x-6">
              {hero.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto flex w-full max-w-sm items-end justify-center pb-4 lg:max-w-md" aria-hidden="true">
            <div className="absolute bottom-0 left-0 z-10 -rotate-6">
              <TableQrCard />
            </div>
            <PhoneFrame className="ml-24 w-[62%] max-w-[240px] sm:ml-28">
              <Screenshot src={screenshots.guest[0] || undefined} alt="" className="aspect-[9/13]">
                <GuestBrowse />
              </Screenshot>
            </PhoneFrame>
          </div>
        </Container>
      </section>

      {/* Guest journey */}
      <Section id="how-guests-order" labelledBy="journey-title" tone="card">
        <SectionHeader id="journey-title" eyebrow={journey.eyebrow} title={journey.title} />
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {journey.steps.map((s, i) => {
            const Screen = guestScreens[i]
            return (
              <li key={s.title} data-reveal className="flex flex-col">
                <div className="flex justify-center rounded-2xl bg-muted px-6 pt-8 pb-0">
                  <PhoneFrame className="w-[70%] max-w-[220px] translate-y-0 rounded-b-none pb-0">
                    <Screenshot
                      src={screenshots.guest[i] || undefined}
                      alt={`Guest screen: ${s.title}`}
                      className="h-[300px] overflow-hidden"
                    >
                      <Screen />
                    </Screenshot>
                  </PhoneFrame>
                </div>
                <p className="mt-6 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-brand font-heading font-semibold text-white">{i + 1}</span>
                  <span className="font-heading text-2xl font-semibold">{s.title}</span>
                </p>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </li>
            )
          })}
        </ol>
        <SectionCTA>
          <DemoLink variant="dark" />
        </SectionCTA>
      </Section>

      {/* Owner console */}
      <Section id="owner-console" labelledBy="console-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeader id="console-title" eyebrow={ownerConsole.eyebrow} title={ownerConsole.title} subtitle={ownerConsole.subtitle} />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {ownerConsole.features.map((f) => {
                const Icon = consoleIcons[f.icon] ?? ListOrdered
                return (
                  <li key={f.title} data-reveal className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-strong">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-semibold tracking-normal">{f.title}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div data-reveal>
            {screenshots.console ? (
              <Screenshot src={screenshots.console} alt="Owner console showing live orders and menu" className="aspect-[16/10] overflow-hidden rounded-2xl border">
                <span />
              </Screenshot>
            ) : (
              <div aria-hidden="true">
                <ConsoleMock />
              </div>
            )}
          </div>
        </div>
        <SectionCTA>
          <WhatsAppButton location="qr_console" message={qrWhatsApp} size="lg">
            See the console on a call
          </WhatsAppButton>
        </SectionCTA>
      </Section>

      {/* Kitchen screen */}
      <Section id="kitchen-screen" labelledBy="kitchen-title" tone="dark">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div data-reveal className="order-2 lg:order-1">
            {screenshots.kitchen ? (
              <Screenshot src={screenshots.kitchen} alt="Kitchen screen with order tickets by table" className="aspect-video overflow-hidden rounded-2xl">
                <span />
              </Screenshot>
            ) : (
              <div aria-hidden="true">
                <KitchenMock />
              </div>
            )}
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeader id="kitchen-title" eyebrow={kitchen.eyebrow} title={kitchen.title} subtitle={kitchen.subtitle} dark />
            <ul className="mt-8 space-y-3">
              {kitchen.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-5 shrink-0 text-orange-300" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <SectionCTA className="mt-10">
              <DemoLink variant="light" />
            </SectionCTA>
          </div>
        </div>
      </Section>

      {/* Pricing: included vs quoted separately */}
      <Section id="pricing" labelledBy="pricing-title" tone="card">
        <SectionHeader id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} subtitle={<span>{priceLine()}</span>} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div data-reveal className="rounded-2xl border-2 border-brand bg-background p-6 sm:p-8">
            <h3 className="text-2xl font-semibold">Included</h3>
            <ul className="mt-5 space-y-3">
              {pricing.included.map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-2xl border border-dashed bg-background p-6 sm:p-8">
            <h3 className="text-2xl font-semibold">Quoted separately</h3>
            <p className="mt-1 text-sm text-muted-foreground">Only if you need them. We give you a clear price before any work.</p>
            <ul className="mt-5 space-y-4">
              {pricing.quotedSeparately.map((q) => (
                <li key={q.title} className="flex items-start gap-2.5">
                  <X className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span>
                    <span className="font-semibold">{q.title}</span>
                    <span className="block text-sm text-muted-foreground">{q.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SectionCTA>
          <WhatsAppButton location="qr_pricing" message="Hi Quest Hunter, can I get a QR ordering quote for my restaurant?" size="lg">
            Get an exact quote
          </WhatsAppButton>
        </SectionCTA>
      </Section>

      {/* FAQ */}
      <Section id="qr-faq" labelledBy="qr-faq-title" tone="muted">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader id="qr-faq-title" eyebrow="FAQ" title="QR ordering questions." />
          <div>
            <Faq items={qrFaqs} idPrefix="qr-faq" />
            <SectionCTA>
              <WhatsAppButton location="qr_faq" message="Hi Quest Hunter, I have a question about QR ordering." size="lg">
                Ask your own question
              </WhatsAppButton>
            </SectionCTA>
          </div>
        </div>
      </Section>

      {/* Enquiry */}
      <Section id="enquire" labelledBy="enquire-title" tone="card">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeader id="enquire-title" eyebrow={enquiry.eyebrow} title={enquiry.title} subtitle={enquiry.subtitle} />
          <div data-reveal className="rounded-3xl border bg-background p-5 sm:p-8">
            <ContactForm
              defaultPlan="Table QR Ordering"
              source="qr_ordering"
              messagePlaceholder="Number of tables, type of restaurant, and anything else we should know…"
            />
          </div>
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: qrAddon.name,
              serviceType: "Restaurant table QR ordering system",
              description: qrPage.metaDescription,
              url: `${siteConfig.url}/qr-ordering/`,
              provider: { "@id": `${siteConfig.url}/#organization`, "@type": "Organization", name: siteConfig.name },
              areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                priceSpecification: [
                  { "@type": "PriceSpecification", minPrice: qrAddon.priceFrom, priceCurrency: "INR", valueAddedTaxIncluded: false },
                  {
                    "@type": "UnitPriceSpecification",
                    price: qrAddon.monthly,
                    priceCurrency: "INR",
                    unitText: "MONTH",
                    valueAddedTaxIncluded: false,
                  },
                ],
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
                { "@type": "ListItem", position: 2, name: "QR Ordering", item: `${siteConfig.url}/qr-ordering/` },
              ],
            },
          ],
        }}
      />
    </>
  )
}
