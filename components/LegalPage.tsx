import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Container } from "@/components/Section"
import { siteConfig } from "@/config/site"
import type { LegalSection } from "@/content/legal"

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" })

export function LegalPage({
  title,
  href,
  updated,
  intro,
  sections,
}: {
  title: string
  href: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <Container className="pt-8 pb-24 sm:pt-12">
      <Breadcrumbs items={[{ label: title, href }]} />
      <article className="mx-auto mt-10 max-w-2xl">
        <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated <time dateTime={updated}>{dateFmt.format(new Date(updated))}</time>
        </p>
        <p className="mt-6 text-lg">{intro}</p>
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="mt-10 text-2xl font-semibold">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 30)} className="mt-4 leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}
        <p className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          Questions? Email{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-foreground underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      </article>
    </Container>
  )
}
