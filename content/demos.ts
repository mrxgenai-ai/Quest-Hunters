import type { PlanId } from "./plans"

export type BusinessType = "clothing" | "electronics" | "startup" | "restaurant"

export type Demo = {
  slug: string
  name: string
  kind: string
  businessType: BusinessType
  plan: PlanId
  /** Optional add-on shown as an extra badge, e.g. "QR ordering". */
  addon?: string
  features: [string, string]
  url: string
  /** Three sample rows shown in the illustrated phone preview. `veg` only for food. */
  items: { name: string; price: string; veg?: boolean }[]
  /** Button label inside the illustrated phone preview. */
  previewCta: string
  /** Placeholder tint until real screenshots are added (public/images/demos/<slug>.webp). */
  tint: string
  image?: string
}

export const businessTypes: { id: BusinessType; label: string }[] = [
  { id: "clothing", label: "Clothing store" },
  { id: "electronics", label: "Electronics store" },
  { id: "startup", label: "Startup" },
  { id: "restaurant", label: "Restaurant" },
]

export const demoPlans: { id: PlanId; label: string }[] = [
  { id: "basic", label: "Basic" },
  { id: "automation", label: "Automation" },
  { id: "ecommerce", label: "E-commerce" },
]

export const demosIntro = {
  disclaimer: "These are fictional demo businesses built by Quest Hunter, not client projects.",
}

// PLACEHOLDER URLs: point these at the real demo subdomains when they are live.
export const demos: Demo[] = [
  {
    slug: "threadline",
    name: "Threadline",
    kind: "Clothing store",
    businessType: "clothing",
    plan: "ecommerce",
    features: ["Online store with sizes & colours", "UPI and card checkout, order updates on WhatsApp"],
    items: [
      { name: "Linen Kurta", price: "₹1,290" },
      { name: "Denim Jacket", price: "₹2,450" },
      { name: "Cotton Saree", price: "₹1,890" },
    ],
    previewCta: "Add to bag",
    url: "https://threadline.demo.questhunter.example",
    tint: "#E8D5F0",
  },
  {
    slug: "voltbay",
    name: "VoltBay Electronics",
    kind: "Electronics store",
    businessType: "electronics",
    plan: "automation",
    features: ["Product catalogue with WhatsApp enquiry", "Repair & service appointment booking"],
    items: [
      { name: "Wireless Earbuds", price: "₹2,999" },
      { name: "Smartwatch", price: "₹4,499" },
      { name: "Screen repair", price: "Book slot" },
    ],
    previewCta: "Book a repair",
    url: "https://voltbay.demo.questhunter.example",
    tint: "#CFE3F5",
  },
  {
    slug: "launchpad",
    name: "Launchpad",
    kind: "Startup landing page",
    businessType: "startup",
    plan: "basic",
    features: ["One-page story with clear pricing", "Waitlist sign-up and WhatsApp chat"],
    items: [
      { name: "Free plan", price: "₹0" },
      { name: "Team plan", price: "₹499/mo" },
      { name: "Waitlist", price: "Join" },
    ],
    previewCta: "Join the waitlist",
    url: "https://launchpad.demo.questhunter.example",
    tint: "#D3F0E4",
  },
  {
    slug: "spice-table",
    name: "Spice Table",
    kind: "Restaurant",
    businessType: "restaurant",
    plan: "automation",
    addon: "QR ordering",
    features: ["Table booking with WhatsApp alert", "Scan the table QR, order and track"],
    items: [
      { name: "Chicken 65", price: "₹260", veg: false },
      { name: "Veg Manchurian", price: "₹210", veg: true },
      { name: "Jeera Rice", price: "₹150", veg: true },
    ],
    previewCta: "Book a table",
    url: "https://spice-table.demo.questhunter.example",
    tint: "#F5D9B8",
  },
]

export const demosPage = {
  metaTitle: "Website Demos: Stores, Startups & Restaurants",
  metaDescription:
    "Working website demos: a clothing store, an electronics store with repair booking, a startup landing page and a restaurant with QR ordering.",
  eyebrow: "Demos",
  title: "Try it before you pay a rupee.",
  subtitle:
    "Each demo is a working website. Open it on your phone, browse products, book a slot or place a test order, exactly as your customers would.",
  tips: [
    "Open demos on your phone: that's how most customers will see your site.",
    "Liked one? Tell us which, and we'll show you a version with your own name and products.",
  ],
  filters: { typeLabel: "Business type", planLabel: "Plan", all: "All" },
  closing: {
    title: "Seen one that fits? We'll build it around your products, photos and brand.",
    subtitle: "Tell us which demo you liked. We'll send a free demo with your business name.",
  },
}
