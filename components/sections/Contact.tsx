import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { Section, SectionHeader } from "@/components/Section"
import { siteConfig } from "@/config/site"
import { contact } from "@/content/home"

export function Contact() {
  const details = [
    { icon: Phone, label: siteConfig.phoneDisplay, href: `tel:+${siteConfig.whatsappNumber}` },
    { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Clock, label: `WhatsApp replies ${siteConfig.replyHours}` },
    { icon: MapPin, label: `${siteConfig.address.locality}, ${siteConfig.address.region}` },
  ]

  return (
    <Section id="contact" labelledBy="contact-title" tone="card">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeader id="contact-title" eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.subtitle} />
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
        <div data-reveal className="rounded-3xl border bg-background p-5 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}
