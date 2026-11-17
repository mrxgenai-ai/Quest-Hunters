export type PlanId = "basic" | "automation" | "ecommerce"

export type Plan = {
  id: PlanId
  name: string
  promise: string
  features: string[]
  timeline: string
  /** Starting price in rupees, before GST. */
  priceFrom: number
  featured?: boolean
}

export const plansIntro = {
  eyebrow: "Plans",
  title: "Three plans. Pick where you are today, upgrade when you grow.",
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    promise: "Get found on Google and look professional",
    features: [
      "Interactive website",
      "Digital menu",
      "Photo gallery",
      "Google Maps",
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
    promise: "Fill tables without picking up the phone",
    features: [
      "Everything in Basic",
      "Table booking form",
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
    promise: "Take orders and deliver without paying 30% to apps",
    features: [
      "Everything in Automation",
      "Online ordering",
      "UPI & card payments",
      "Delivery & pickup",
      "Live order status on WhatsApp",
    ],
    timeline: "3–4 weeks",
    priceFrom: 75000,
  },
]

export const qrAddon = {
  id: "qr-ordering",
  name: "Table QR Ordering",
  label: "Add-on",
  promise: "Guests scan, order and track from their table — no app.",
  priceFrom: 15000,
  monthly: 999,
  href: "/qr-ordering/",
}

export const carePlan = {
  monthlyFrom: 999,
  note: "Monthly care plan from ₹999 covers hosting, updates and support.",
}

export const GST_RATE = 0.18

/** Options for the contact form "Plan interest" dropdown. */
export const planInterestOptions = [
  "Not sure yet",
  "Basic",
  "Automation",
  "E-commerce",
  "Table QR Ordering",
  "Audit my existing website",
]
