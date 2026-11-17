import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import { JsonLd } from "./JsonLd"

export type Crumb = { label: string; href: string }

/** Visible breadcrumb trail plus BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items]
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => {
            const last = i === all.length - 1
            return (
              <li key={c.href} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="py-1 hover:text-foreground hover:underline">
                      {c.label}
                    </Link>
                    <ChevronRight className="size-3.5" aria-hidden="true" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${siteConfig.url}${c.href}`,
          })),
        }}
      />
    </>
  )
}
