import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: websites for restaurants, cafes and resorts in Chhatrapati Sambhajinagar`,
}

/**
 * Per-page metadata with canonical URL, Open Graph and Twitter card.
 * Use this on every page so the social preview image is never dropped.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  publishedTime,
  noindex,
}: {
  title: string
  description: string
  /** Path with leading and trailing slash, e.g. "/demos/". */
  path: string
  /** Use the title as-is instead of appending " | Quest Hunter". */
  absoluteTitle?: boolean
  type?: "website" | "article"
  publishedTime?: string
  noindex?: boolean
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_IN",
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
