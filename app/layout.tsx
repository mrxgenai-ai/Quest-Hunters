import type { Metadata, Viewport } from "next"
import { Fraunces } from "next/font/google"
import { Analytics } from "@/components/Analytics"
import { Analytics as VercelAnalytics } from "@vercel/analytics/next"
import { RevealObserver } from "@/components/Reveal"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { siteConfig } from "@/config/site"
import { brand } from "@/content/site"
import { ogImage } from "@/lib/metadata"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  // Headings only use semibold; a single static weight keeps the font file small.
  weight: "600",
  // "optional": the preloaded font is used when it arrives in time; otherwise the
  // fallback stays, so the big cover title never re-paints late (protects LCP).
  display: "optional",
})

const description = brand.description

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: ${brand.tagline.replace(/\.$/, "")}`,
    template: "%s | Quest Hunter",
  },
  description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    url: "/",
    title: `${siteConfig.name} · ${brand.tagline}`,
    description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <RevealObserver />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  )
}
