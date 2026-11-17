import type { Metadata, Viewport } from "next"
import { Fraunces, Geist } from "next/font/google"
import { Analytics } from "@/components/Analytics"
import { RevealObserver } from "@/components/Reveal"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { siteConfig } from "@/config/site"
import { ogImage } from "@/lib/metadata"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  // Headings only use semibold; a single static weight keeps the font file small.
  weight: "600",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  // "optional" avoids a late text repaint on slow networks (keeps LCP low).
  display: "optional",
})

const description =
  "Websites for restaurants, cafes, cloud kitchens and resorts in Chhatrapati Sambhajinagar. Table booking, online ordering and QR ordering with no commission. Live in 7 days."

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Restaurant Website Development in Chhatrapati Sambhajinagar | Quest Hunter",
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
    title: "Quest Hunter · Restaurant websites that bring customers straight to you",
    description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${geist.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  )
}
