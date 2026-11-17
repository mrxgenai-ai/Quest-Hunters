// /services page: GROW service line, tiers, bundles, who we work with, why us
// and reviews. BUILD plans and add-ons live in content/plans.ts.
//
// GROW prices are NOT decided: every `priceMonthly: null` shows the
// placeholder label (pricePlaceholder in content/plans.ts). Fill in real numbers
// only once confirmed. USD prices are in config/site.ts → currencyConfig.

export const servicesPage = {
  metaTitle: "Services: Websites, Social Media & Automation",
  metaDescription:
    "Websites from ₹12,000 (Basic, Automation, E-commerce) plus monthly Grow plans: social media, WhatsApp & email automation and local promotion.",
  eyebrow: "Services",
  title: "Two ways we help: we build it, then we help it grow.",
  subtitle:
    "BUILD is a one-time website project. GROW is a monthly plan that keeps customers coming: social media, WhatsApp, email and local promotion. Take one, or both.",
  lines: [
    { id: "build", label: "Build", desc: "One-time website project + optional care plan" },
    { id: "grow", label: "Grow", desc: "Monthly marketing & automation retainer" },
  ],
}

export type GrowServiceIcon = "social" | "whatsapp" | "email" | "local" | "report"

export const growIntro = {
  eyebrow: "Grow",
  title: "A monthly team for your social media, WhatsApp and email.",
  subtitle: "We plan, create, schedule and automate, then show you what worked. You keep running your business.",
}

export const growServices: { id: string; icon: GrowServiceIcon; title: string; desc: string; items: string[] }[] = [
  {
    id: "social",
    icon: "social",
    title: "Social media management",
    desc: "Instagram and Facebook that look alive and on-brand, without you posting at midnight.",
    items: ["Posts and reels", "Captions and hashtags", "Monthly content calendar", "Daily stories"],
  },
  {
    id: "whatsapp",
    icon: "whatsapp",
    title: "WhatsApp automation",
    desc: "Instant replies and updates on the app your customers already use, through the official WhatsApp Business API.",
    items: ["Auto-replies and FAQs", "Product catalogue", "Order and booking updates", "Broadcast offers"],
  },
  {
    id: "email",
    icon: "email",
    title: "Email automation",
    desc: "Emails that go out on their own at the right moment and bring people back.",
    items: ["Welcome series", "Offers and launches", "Abandoned-cart reminders", "Newsletter"],
  },
  {
    id: "local",
    icon: "local",
    title: "Local promotion",
    desc: "Show up when people nearby search for what you sell.",
    items: ["Google Business Profile posts", "Review requests", "Paid ads (when you're ready)"],
  },
  {
    id: "report",
    icon: "report",
    title: "Monthly report",
    desc: "One clear page every month: what we did, what worked and what we'll try next.",
    items: ["Reach and followers", "Messages and enquiries", "Next month's plan"],
  },
]

export type GrowTier = {
  id: "starter" | "growth" | "pro"
  name: string
  bestFor: string
  /** Monthly price in rupees, before GST. null = [PRICE] not decided. */
  priceMonthly: number | null
  /** What the tier includes. A starting suggestion: confirm before launch. */
  includes: string[]
  featured?: boolean
}

export const growTiers: GrowTier[] = [
  {
    id: "starter",
    name: "Starter",
    bestFor: "Getting consistent on social media",
    priceMonthly: null, // [PRICE]
    includes: ["Social media posts & captions", "Content calendar", "Google Business Profile posts", "Monthly report"],
  },
  {
    id: "growth",
    name: "Growth",
    bestFor: "Turning followers into enquiries",
    priceMonthly: null, // [PRICE]
    includes: ["Everything in Starter", "Reels and daily stories", "WhatsApp automation", "Review requests"],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    bestFor: "Running all your online marketing",
    priceMonthly: null, // [PRICE]
    includes: ["Everything in Growth", "Email automation", "Broadcast offers", "Paid ads management (ad spend separate)"],
  },
]

export const addonsIntro = {
  eyebrow: "Add-ons & bundles",
  title: "Add what you need, when you need it.",
}

export const bundles: { id: string; name: string; desc: string; priceFrom: number | null }[] = [
  {
    id: "website-plus-grow",
    name: "Website + 3 months of Grow",
    desc: "Launch your new website and get three months of social media and automation to fill it with visitors.",
    priceFrom: null, // [PRICE]
  },
]

export const whoWeWorkWith = {
  eyebrow: "Who we work with",
  title: "Any business that wants more customers online.",
  groups: [
    { icon: "rocket", title: "Startups", desc: "Landing pages that explain the idea fast and collect sign-ups." },
    { icon: "store", title: "Retail stores", desc: "Clothing, electronics, gifts and any shop that wants to sell online." },
    { icon: "utensils", title: "Restaurants & cafés", desc: "Menus, bookings, direct ordering and QR ordering." },
    { icon: "briefcase", title: "Service businesses", desc: "Clinics, salons, studios, coaches and consultants who run on appointments." },
  ],
  reach: [
    { title: "Local", desc: "In Chhatrapati Sambhajinagar we can meet you, shoot your products and train your team in person." },
    { title: "Worldwide", desc: "Remote delivery anywhere: calls, reviews and handover on WhatsApp, email and video." },
  ],
}

export const whyUs = {
  eyebrow: "Why Quest Hunter",
  title: "Built for how small businesses actually work.",
  points: [
    {
      icon: "key",
      title: "You own everything",
      desc: "Your domain, your website, your customer list. If you ever leave, everything goes with you.",
    },
    {
      icon: "message",
      title: "WhatsApp-first",
      desc: "Enquiries, bookings and orders arrive where you already are. UPI and international payments built in.",
    },
    {
      icon: "map-pin",
      title: "Local team, global reach",
      desc: "Based in Chhatrapati Sambhajinagar and happy to visit. Working remotely with clients anywhere.",
    },
    {
      icon: "badge-percent",
      title: "No commission, ever",
      desc: "One clear price. Orders and bookings through your website are 100% yours.",
    },
  ],
}

export const trust = {
  eyebrow: "Results",
  title: "Real clients. Real numbers.",
  /** Flip to true only when you have real, verifiable reviews and results to show. */
  showReviews: false,
  emptyState: {
    title: "Our first client stories are coming soon",
    desc: "We only publish real reviews and results with our clients' permission. Until then, the demos show exactly what you get.",
  },
  googleRating: { rating: 0, count: 0, profileUrl: "" },
  reviews: [] as { name: string; business: string; text: string; rating: number }[],
  results: [] as { business: string; metric: string; detail: string }[],
}
