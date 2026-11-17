// BUILD service line: one-time website plans, add-ons and the care plan.
// Prices are in rupees, before GST. `null` = not decided yet: the site shows
// `pricePlaceholder` instead. Never put a number here that isn't confirmed.

export type PlanId = "basic" | "automation" | "ecommerce"

export type Plan = {
  id: PlanId
  name: string
  promise: string
  bestFor: string
  features: string[]
  timeline: string
  /** Starting price in rupees, before GST. */
  priceFrom: number
  featured?: boolean
}

/** Shown wherever a price is not decided yet. Change to e.g. "Ask us" before launch. */
export const pricePlaceholder = "[PRICE]"

export const plansIntro = {
  eyebrow: "Build",
  title: "Websites that do the work. Pick where you are today, upgrade when you grow.",
  subtitle: "One-time build fee, then an optional care plan. You own the domain, the site and the customer list.",
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    promise: "Get found on Google and look professional",
    bestFor: "New businesses, startups and shops going online for the first time",
    features: [
      "Fast, mobile-first website",
      "Products & services pages",
      "Photo gallery",
      "Google Maps & contact details",
      "WhatsApp chat button",
      "Instagram feed",
      "Google Business Profile setup",
    ],
    timeline: "7 days",
    priceFrom: 12000,
  },
  {
    id: "automation",
    name: "Automation",
    promise: "Take bookings and enquiries without picking up the phone",
    bestFor: "Restaurants, clinics, salons, studios and any business that runs on appointments",
    features: [
      "Everything in Basic",
      "Bookings & appointments form",
      "Instant WhatsApp & email alerts",
      "Owner dashboard",
    ],
    timeline: "14 days",
    priceFrom: 30000,
    featured: true,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    promise: "Sell online directly, without marketplace commission",
    bestFor: "Clothing, electronics and retail stores, cloud kitchens and D2C brands",
    features: [
      "Everything in Automation",
      "Online store & product catalogue",
      "UPI, card & international payments",
      "Delivery & pickup options",
      "Order updates on WhatsApp",
    ],
    timeline: "3–4 weeks",
    priceFrom: 75000,
  },
]

export type Addon = {
  id: string
  name: string
  promise: string
  /** One-time price in rupees, before GST. null = not decided yet. */
  priceFrom: number | null
  /** Monthly price in rupees, if any. */
  monthly?: number | null
  href?: string
}

export const addons: Addon[] = [
  {
    id: "qr-ordering",
    name: "QR ordering",
    promise: "Customers scan a QR code at the table, room or counter, order from their phone and track it live. No app.",
    priceFrom: 15000,
    monthly: 999,
    href: "/qr-ordering/",
  },
  {
    id: "booking-system",
    name: "Booking system",
    promise: "Add bookings and appointments to any site: time slots, reminders and alerts on WhatsApp.",
    priceFrom: null, // [PRICE] not decided
  },
]

/** Kept for the QR ordering page. */
export const qrAddon = {
  ...addons[0],
  name: "QR Ordering",
  label: "Add-on",
  priceFrom: 15000,
  monthly: 999,
  href: "/qr-ordering/",
}

export const carePlan = {
  id: "care",
  monthlyFrom: 999,
  note: "Monthly care plan from ₹999 covers hosting, updates and support.",
}

export const GST_RATE = 0.18
