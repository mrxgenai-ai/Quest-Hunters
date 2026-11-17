import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { cities } from "@/content/cities"
import { guides } from "@/content/guides"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`
  const now = new Date()

  return [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/demos/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/qr-ordering/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...cities.map((c) => ({
      url: url(`/website-development/${c.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: url("/guides/"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    // Draft guides are noindex, so they're left out until published.
    ...guides
      .filter((g) => !g.draft)
      .map((g) => ({
        url: url(`/guides/${g.slug}/`),
        lastModified: new Date(g.updated ?? g.published),
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
    { url: url("/privacy/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ]
}
