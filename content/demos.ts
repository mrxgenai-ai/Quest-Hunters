export type DemoCategory = "Basic" | "Automation" | "E-commerce" | "QR Ordering"

export type Demo = {
  slug: string
  name: string
  kind: string
  category: DemoCategory
  features: [string, string]
  url: string
  /** Three sample dishes shown in the illustrated phone preview. */
  menu: { name: string; price: string; veg: boolean }[]
  /** Placeholder tint until real screenshots are added (public/images/demos/<slug>.webp). */
  tint: string
  image?: string
}

export const demosIntro = {
  eyebrow: "Live demos",
  title: "Don't imagine it. Click it.",
  subtitle: "Open a working demo on your phone, tap through the menu, try a booking, place a test order.",
  disclaimer: "These are fictional demo restaurants built by Quest Hunter, not client projects.",
}

// PLACEHOLDER URLs: point these at the real demo subdomains when they are live.
export const demos: Demo[] = [
  {
    slug: "cafe-ajanta",
    name: "Café Ajanta",
    kind: "All-day café",
    category: "Basic",
    features: ["Menu with veg / non-veg tags", "Gallery, Maps & WhatsApp chat"],
    menu: [
      { name: "Cold Coffee", price: "₹140", veg: true },
      { name: "Veg Club Sandwich", price: "₹180", veg: true },
      { name: "Chicken Wrap", price: "₹220", veg: false },
    ],
    url: "https://cafe-ajanta.demo.questhunter.example",
    tint: "#F5D9B8",
  },
  {
    slug: "kailash-kitchen",
    name: "Kailash Kitchen",
    kind: "Family restaurant",
    category: "Automation",
    features: ["Table booking with WhatsApp alert", "Owner dashboard for bookings"],
    menu: [
      { name: "Paneer Butter Masala", price: "₹280", veg: true },
      { name: "Dal Tadka", price: "₹190", veg: true },
      { name: "Chicken Handi", price: "₹340", veg: false },
    ],
    url: "https://kailash-kitchen.demo.questhunter.example",
    tint: "#E9C9A8",
  },
  {
    slug: "bibis-biryani",
    name: "Bibi's Biryani",
    kind: "Cloud kitchen",
    category: "E-commerce",
    features: ["Online ordering with UPI", "Live order status on WhatsApp"],
    menu: [
      { name: "Chicken Dum Biryani", price: "₹299", veg: false },
      { name: "Mutton Biryani", price: "₹399", veg: false },
      { name: "Veg Biryani", price: "₹229", veg: true },
    ],
    url: "https://bibis-biryani.demo.questhunter.example",
    tint: "#F2C29B",
  },
  {
    slug: "spice-table",
    name: "Spice Table",
    kind: "Dine-in restaurant",
    category: "QR Ordering",
    features: ["Scan the table QR, order, track", "Kitchen screen & owner console"],
    menu: [
      { name: "Chicken 65", price: "₹260", veg: false },
      { name: "Veg Manchurian", price: "₹210", veg: true },
      { name: "Jeera Rice", price: "₹150", veg: true },
    ],
    url: "https://spice-table.demo.questhunter.example",
    tint: "#EBCFB5",
  },
]

export const demoCategories: ("All" | DemoCategory)[] = ["All", "Basic", "Automation", "E-commerce", "QR Ordering"]

/** URL hash for each filter, e.g. /demos/#automation. */
export const categorySlug: Record<DemoCategory, string> = {
  Basic: "basic",
  Automation: "automation",
  "E-commerce": "e-commerce",
  "QR Ordering": "qr-ordering",
}

export const demosPage = {
  metaTitle: "Live Restaurant Website Demos",
  metaDescription:
    "Click through working restaurant, café and cloud kitchen website demos: digital menus, table booking, online ordering with UPI and table QR ordering.",
  eyebrow: "Live demos",
  title: "Try it before you pay a rupee.",
  subtitle:
    "Each demo is a working website. Open it on your phone, browse the menu, book a table or place a test order, exactly as your guests would.",
  tips: [
    "Open demos on your phone: that's how most guests will see your site.",
    "Liked one? Tell us which, and we'll show you a version with your own name and menu.",
  ],
  closing: {
    title: "Seen one that fits? We'll build it around your menu, photos and brand.",
    subtitle: "Tell us which demo you liked. We'll send a free demo with your restaurant's name and menu.",
  },
}
