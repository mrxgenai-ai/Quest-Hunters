// Business settings used across the site.
// TODO before launch: replace every value marked PLACEHOLDER.

export const siteConfig = {
  name: "Quest Hunter",
  legalName: "Quest Hunter",
  /** Public URL, no trailing slash. Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://questhunter.example").replace(/\/$/, ""), // PLACEHOLDER
  /** WhatsApp number: country code + number, digits only. */
  whatsappNumber: "910000000000", // PLACEHOLDER
  phoneDisplay: "+91 00000 00000", // PLACEHOLDER
  email: "hello@questhunter.example", // PLACEHOLDER
  replyHours: "10am–8pm",
  address: {
    locality: "Chhatrapati Sambhajinagar",
    region: "Maharashtra",
    regionCode: "MH",
    postalCode: "", // add when you have an office address
    streetAddress: "", // add when you have an office address
    country: "IN",
  },
  areaServed: ["Chhatrapati Sambhajinagar", "Jalna", "Ahilyanagar", "Pune", "Maharashtra"],
  social: {
    instagram: "", // e.g. https://instagram.com/questhunter
  },
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
} as const

export const whatsappMessages = {
  default: "Hi Quest Hunter, I want a website for my restaurant.",
  quote: "Hi Quest Hunter, I'd like a free quote for my restaurant website.",
} as const
