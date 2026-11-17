import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Clock, Lightbulb } from "lucide-react"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ButtonLink } from "@/components/Button"
import { Container, Eyebrow } from "@/components/Section"
import { JsonLd } from "@/components/JsonLd"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { siteConfig } from "@/config/site"
import { guides, type GuideBlock } from "@/content/guides"
import { pageMetadata } from "@/lib/metadata"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const g = guides.find((x) => x.slug === slug)
  if (!g) return {}
  // Drafts stay out of search results until reviewed (set draft: false in content/guides.ts).
  return pageMetadata({
    title: g.title,
    description: g.description,
    path: `/guides/${g.slug}/`,
    type: "article",
    publishedTime: g.published,
    noindex: g.draft,
  })
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" })

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 text-2xl leading-snug font-semibold sm:text-3xl">{block.text}</h2>
    case "p":
      return <p className="mt-5">{block.text}</p>
    case "ul":
      return (
        <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-brand">
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )
    case "tip":
      return (
        <p className="mt-10 flex gap-3 rounded-2xl bg-brand-soft p-5 font-medium text-accent-foreground">
          <Lightbulb className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          {block.text}
        </p>
      )
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()

  const more = guides.filter((g) => g.slug !== guide.slug).slice(0, 3)
  const url = `${siteConfig.url}/guides/${guide.slug}/`

  return (
    <>
      <Container className="pt-8 pb-20 sm:pt-12">
        <Breadcrumbs
          items={[
            { label: "Guides", href: "/guides/" },
            { label: guide.title, href: `/guides/${guide.slug}/` },
          ]}
        />
        <article className="mx-auto mt-10 max-w-2xl">
          <header>
            <Eyebrow>{guide.category}</Eyebrow>
            <h1 className="mt-4 text-[2.1rem] leading-[1.1] font-semibold sm:text-5xl">{guide.title}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{guide.description}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-b pb-6 text-sm text-muted-foreground">
              <span>
                By {siteConfig.name} · <time dateTime={guide.published}>{dateFmt.format(new Date(guide.published))}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" /> {guide.readMinutes} min read
              </span>
            </p>
          </header>
          <div className="text-lg leading-relaxed text-pretty">
            {guide.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>

          <aside className="mt-14 rounded-3xl bg-ink p-7 text-white sm:p-9">
            <h2 className="text-2xl font-semibold sm:text-3xl">Want this done for your business?</h2>
            <p className="mt-3 text-white/75">We set it all up for you, usually live in 7 days. Start with a free demo.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={guide.cta.href} variant="light" size="lg">
                {guide.cta.label} <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <WhatsAppButton location={`guide_${guide.slug}`} message={`Hi Quest Hunter, I read your guide "${guide.title}" and have a question.`} size="lg" variant="primary">
                Ask on WhatsApp
              </WhatsAppButton>
            </div>
          </aside>
        </article>

        <section aria-labelledby="more-guides" className="mx-auto mt-16 max-w-2xl">
          <h2 id="more-guides" className="text-2xl font-semibold">
            More guides
          </h2>
          <ul className="mt-4 divide-y border-y">
            {more.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}/`} className="flex items-center justify-between gap-4 py-4 font-medium hover:text-brand-strong">
                  {g.title}
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          datePublished: guide.published,
          dateModified: guide.updated ?? guide.published,
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          publisher: { "@id": `${siteConfig.url}/#organization`, "@type": "Organization", name: siteConfig.name },
        }}
      />
    </>
  )
}
