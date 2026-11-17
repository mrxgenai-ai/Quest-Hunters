// Home page section copy (plans and demos live in their own files).

export const howItWorks = {
  eyebrow: "How it works",
  title: "From first call to live website in four steps.",
  steps: [
    {
      title: "15-minute call",
      desc: "Tell us about your restaurant, your menu and how guests reach you today. No tech talk needed.",
    },
    {
      title: "Proposal in 24 hours",
      desc: "You get a written plan on WhatsApp: pages, features, timeline and the exact price including GST.",
    },
    {
      title: "We build, you review",
      desc: "We build with your menu, photos and brand. You get two rounds of changes before launch.",
    },
    {
      title: "Go live and grow",
      desc: "We connect your domain, set up Google, train your team, and stay on call when you need us.",
    },
  ],
  cta: { label: "Book the 15-minute call" },
}

export const whyUs = {
  eyebrow: "Why Quest Hunter",
  title: "Built for how Indian restaurants actually work.",
  points: [
    {
      icon: "key",
      title: "You own everything",
      desc: "Your domain, your website, your customer list. If you ever leave, everything goes with you.",
    },
    {
      icon: "utensils",
      title: "Built for Indian restaurants",
      desc: "WhatsApp-first ordering and alerts, UPI payments, veg / non-veg tags, and menus in Hindi or Marathi.",
    },
    {
      icon: "map-pin",
      title: "A local team",
      desc: "We're in Chhatrapati Sambhajinagar. We can visit, shoot your menu, and pick up the phone in your language.",
    },
    {
      icon: "badge-percent",
      title: "No commission, ever",
      desc: "One clear price for the build. Orders and bookings through your website are 100% yours.",
    },
  ],
}

export const calculator = {
  eyebrow: "Commission calculator",
  title: "How much are delivery apps costing you?",
  subtitle:
    "Enter your numbers. Everything is calculated on your phone; nothing is sent anywhere.",
  defaults: {
    monthlySales: 200000,
    commissionPct: 25,
    sharePct: 25,
    planId: "ecommerce" as const,
  },
  shareHelp:
    "Not every order will move. Regulars who order often are the easiest to bring to your own site.",
  /** Approximate online payment gateway fee on direct orders (E-commerce plan only). */
  gatewayPct: 2,
  assumptions:
    "Estimate only. Savings subtract the ₹999/month care plan and, for E-commerce, about 2% payment gateway fees. Plan price includes 18% GST.",
  cta: { label: "Get a quote for my restaurant" },
}

export const trust = {
  eyebrow: "Results",
  title: "Real restaurants. Real numbers.",
  /** Flip to true only when you have real, verifiable reviews and results to show. */
  showReviews: false,
  emptyState: {
    title: "Our first client stories are coming soon",
    desc: "We only publish real reviews and results with our clients' permission. Until then, the live demos show exactly what you get.",
  },
  googleRating: { rating: 0, count: 0, profileUrl: "" },
  reviews: [] as { name: string; business: string; text: string; rating: number }[],
  results: [] as { business: string; metric: string; detail: string }[],
}

export const team = {
  eyebrow: "Team",
  title: "The people you'll actually talk to.",
  members: [
    {
      name: "Mudassir Shaikh",
      role: "Founder & Lead Developer",
      bio: "Designs and builds every site, and makes sure it loads fast on a cheap phone and a slow network.",
      photo: "",
    },
    {
      name: "Abhay",
      role: "Automation Lead",
      bio: "Sets up bookings, WhatsApp alerts, payments and order flows so your team does less by hand.",
      photo: "",
    },
    {
      name: "Krishna",
      role: "Client Partner",
      bio: "Your first call and your main contact, from the free demo to launch day and after.",
      photo: "",
    },
  ],
}

export const contact = {
  eyebrow: "Contact",
  title: "Get a free demo for your restaurant.",
  subtitle:
    "Leave your number and we'll WhatsApp you. Tell us a little about your place, or just say hi.",
  success: "Thanks! Krishna will WhatsApp you within 2 hours (10am–8pm).",
  submitLabel: "Send on WhatsApp",
  privacyNote: "We only use your number to reply to this enquiry.",
}
