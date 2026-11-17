import { siteConfig } from "@/config/site"
import { addons, plans } from "@/content/plans"
import { chapterOne } from "@/content/home"
import { growServices } from "@/content/services"

const [founder, ...crew] = chapterOne.team

const orgId = `${siteConfig.url}/#organization`

export function organizationSchema() {
  const { address } = siteConfig
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsappNumber}`,
    description:
      "Website development and online growth for startups, retail stores, restaurants and service businesses: websites, online stores, social media management and WhatsApp and email automation. Local in Chhatrapati Sambhajinagar, remote worldwide.",
    address: {
      "@type": "PostalAddress",
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.country,
      ...(address.streetAddress ? { streetAddress: address.streetAddress } : {}),
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    },
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
    founder: { "@type": "Person", name: founder.name, jobTitle: founder.role },
    employee: crew.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role })),
    ...(siteConfig.social.instagram ? { sameAs: [siteConfig.social.instagram] } : {}),
  }
}

function offer(price: number, description?: string) {
  return {
    "@type": "Offer",
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: price,
      priceCurrency: "INR",
      valueAddedTaxIncluded: false,
    },
    ...(description ? { description } : {}),
  }
}

/** BUILD plans and priced add-ons as Services with offers, plus the GROW services (no prices yet). */
export function servicesSchema() {
  const areaServed = siteConfig.areaServed.map((name) => ({ "@type": "Place", name }))
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...plans.map((p) => ({
        "@type": "Service",
        name: `${p.name} website`,
        serviceType: "Website development",
        description: `${p.promise}. Includes: ${p.features.join(", ")}. Live in ${p.timeline}.`,
        provider: { "@id": orgId },
        areaServed,
        offers: offer(p.priceFrom),
      })),
      ...addons.map((a) => ({
        "@type": "Service",
        name: a.name,
        serviceType: a.name,
        description: a.promise,
        provider: { "@id": orgId },
        ...(a.priceFrom !== null
          ? { offers: offer(a.priceFrom, a.monthly ? `Plus ₹${a.monthly}/month` : undefined) }
          : {}),
      })),
      ...growServices.map((g) => ({
        "@type": "Service",
        name: g.title,
        serviceType: g.title,
        description: `${g.desc} Includes: ${g.items.join(", ")}.`,
        provider: { "@id": orgId },
        areaServed,
      })),
    ],
  }
}
