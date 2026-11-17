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
  /** Reply hours in Indian time (IST). */
  replyHours: "10am–8pm IST",
  address: {
    locality: "Chhatrapati Sambhajinagar",
    region: "Maharashtra",
    regionCode: "MH",
    postalCode: "", // add when you have an office address
    streetAddress: "", // add when you have an office address
    country: "IN",
  },
  /** Local area first; "Worldwide" covers remote clients. */
  areaServed: ["Chhatrapati Sambhajinagar", "Jalna", "Ahilyanagar", "Pune", "Maharashtra", "India", "Worldwide"],
  locationLine: "Local in Chhatrapati Sambhajinagar · remote worldwide",
  social: {
    instagram: "", // e.g. https://instagram.com/questhunter
  },
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  /**
   * Where the contact form's "Send enquiry" button posts to, e.g. a Formspree
   * form URL (https://formspree.io/f/xxxxxxx). Empty = the visitor's email app
   * opens with the enquiry addressed to `email` above.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "", // PLACEHOLDER
} as const

/**
 * Currency display. Prices are set in INR in /content. Visitors can switch the
 * /services page to USD. Every USD price is a PLACEHOLDER: `null` shows the
 * placeholder label until you confirm a number. Keys match the ids in
 * content/plans.ts and content/services.ts.
 */
export const currencyConfig = {
  /** Show the ₹ / $ switch on the services page. */
  usdEnabled: true,
  /** Shown instead of a USD price that hasn't been confirmed yet. */
  usdPlaceholder: "$ [PRICE]",
  usdPrices: {
    // BUILD (one-time)
    basic: null, // PLACEHOLDER: confirm USD price
    automation: null, // PLACEHOLDER
    ecommerce: null, // PLACEHOLDER
    // Add-ons
    "qr-ordering": null, // PLACEHOLDER
    "booking-system": null, // PLACEHOLDER
    // Care plan (monthly)
    care: null, // PLACEHOLDER
    // GROW tiers (monthly)
    starter: null, // PLACEHOLDER
    growth: null, // PLACEHOLDER
    pro: null, // PLACEHOLDER
    // Bundles
    "website-plus-grow": null, // PLACEHOLDER
  } as Record<string, number | null>,
}

export const whatsappMessages = {
  default: "Hi Quest Hunter, I'd like to talk about a website for my business.",
  quote: "Hi Quest Hunter, I'd like a free quote for my business.",
  grow: "Hi Quest Hunter, I'd like help growing my business online (social media / WhatsApp / email).",
} as const
