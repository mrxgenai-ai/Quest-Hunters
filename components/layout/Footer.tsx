import Link from "next/link"
import { MapPin } from "lucide-react"
import { Container } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { siteConfig, whatsappMessages } from "@/config/site"
import { cities } from "@/content/cities"
import { footer } from "@/content/site"
import { Logo } from "./Logo"

const year = new Date().getFullYear()

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-xs font-bold tracking-[0.16em] text-white/60 uppercase">{title}</h2>
      <ul className="mt-4 space-y-1">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="inline-block py-1.5 text-sm text-white/85 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const cityLinks = cities.map((c) => ({ label: c.name, href: `/website-development/${c.slug}/` }))
  return (
    <footer className="bg-ink pb-24 text-white sm:pb-10">
      <Container className="pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo onDark />
            <p className="mt-4 max-w-xs text-sm text-white/70">{footer.tagline}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/85">
              <MapPin className="size-4 text-orange-300" aria-hidden="true" />
              {footer.basedIn}
            </p>
            <WhatsAppButton location="footer" message={whatsappMessages.quote} variant="light" className="mt-6">
              WhatsApp us
            </WhatsAppButton>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterColumn title="Services" links={footer.services} />
            <FooterColumn title="Explore" links={footer.explore} />
            <FooterColumn title="Cities" links={cityLinks} />
            <div>
              <h2 className="font-sans text-xs font-bold tracking-[0.16em] text-white/60 uppercase">Contact</h2>
              <ul className="mt-4 space-y-1 text-sm">
                <li>
                  <a href={`tel:+${siteConfig.whatsappNumber}`} className="inline-block py-1.5 text-white/85 hover:text-white hover:underline">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="inline-block py-1.5 [overflow-wrap:anywhere] text-white/85 hover:text-white hover:underline">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="py-1.5 text-white/70">Replies {siteConfig.replyHours}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
