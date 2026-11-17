import type { Metadata } from "next"
import { Clock, Globe2, Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { GlowCard } from "@/components/effects/GlowCard"
import { PageHero } from "@/components/PageHero"
import { Section } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { siteConfig, whatsappMessages } from "@/config/site"
import { contactPage } from "@/content/contact"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  path: "/contact/",
  absoluteTitle: true,
})

export default function ContactPage() {
  const details = [
    { icon: Phone, label: siteConfig.phoneDisplay, href: `tel:+${siteConfig.whatsappNumber}` },
    { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Clock, label: `WhatsApp replies ${siteConfig.replyHours}` },
    { icon: MapPin, label: `${siteConfig.address.locality}, ${siteConfig.address.region}, India` },
    { icon: Globe2, label: siteConfig.locationLine },
  ]

  return (
    <>
      <PageHero
        id="contact-title"
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        subtitle={contactPage.subtitle}
        breadcrumb={{ label: "Contact", href: "/contact/" }}
      />
      <Section labelledBy="contact-form-title" className="pt-12 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 id="contact-form-title" className="text-2xl font-semibold sm:text-3xl">
              Prefer to message us directly?
            </h2>
            <WhatsAppButton location="contact_page" message={whatsappMessages.default} size="lg" className="mt-6">
              Chat on WhatsApp
            </WhatsAppButton>
            <ul className="mt-10 space-y-4">
              {details.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-strong">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {href ? (
                    <a href={href} className="[overflow-wrap:anywhere] hover:underline">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <GlowCard className="rounded-3xl">
            <div className="p-5 sm:p-8">
              <ContactForm source="contact_page" />
            </div>
          </GlowCard>
        </div>
      </Section>
    </>
  )
}
