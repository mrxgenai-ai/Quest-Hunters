import { siteConfig } from "@/config/site"
import { plans, qrAddon } from "@/content/plans"

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
      "Website development for restaurants, cafes, cloud kitchens and resorts: table booking, online ordering and table QR ordering.",
    address: {
      "@type": "PostalAddress",
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.country,
      ...(address.streetAddress ? { streetAddress: address.streetAddress } : {}),
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    },
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
    founder: { "@type": "Person", name: "Mudassir Shaikh" },
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

/** One Service entry per plan, plus the QR ordering add-on. */
export function planServicesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...plans.map((p) => ({
        "@type": "Service",
        name: `${p.name} restaurant website`,
        serviceType: "Restaurant website development",
        description: `${p.promise}. Includes: ${p.features.join(", ")}. Live in ${p.timeline}.`,
        provider: { "@id": orgId },
        areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
        offers: offer(p.priceFrom),
      })),
      {
        "@type": "Service",
        name: qrAddon.name,
        serviceType: "Restaurant table QR ordering system",
        description: qrAddon.promise,
        provider: { "@id": orgId },
        offers: offer(qrAddon.priceFrom, `Plus ₹${qrAddon.monthly}/month`),
      },
    ],
  }
}
