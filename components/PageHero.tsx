import type { ReactNode } from "react"
import { Breadcrumbs } from "./Breadcrumbs"
import { Container, Eyebrow } from "./Section"

/** Standard top section for inner pages: breadcrumb, eyebrow, H1, subtitle. */
export function PageHero({
  id,
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href: string }
  children?: ReactNode
}) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[-15%] h-[30rem] w-[30rem] rounded-full bg-brand-soft blur-3xl"
      />
      <Container className="relative pt-8 pb-14 sm:pt-12 sm:pb-16">
        {breadcrumb && <Breadcrumbs items={[breadcrumb]} />}
        <Eyebrow className={breadcrumb ? "mt-8" : undefined}>{eyebrow}</Eyebrow>
        <h1 id={id} className="mt-4 max-w-3xl text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">{subtitle}</p>}
        {children}
      </Container>
    </section>
  )
}
