export type NavItem = { label: string; href: string }

export const mainNav: NavItem[] = [
  { label: "Plans", href: "/#plans" },
  { label: "Demos", href: "/demos/" },
  { label: "QR Ordering", href: "/qr-ordering/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
]

export const headerCta = { label: "Get a free demo", href: "/#contact" }

export const hero = {
  eyebrow: "Restaurant websites · Chhatrapati Sambhajinagar",
  title: "Your restaurant deserves more than a Zomato listing.",
  subtitle:
    "Quest Hunter builds websites for restaurants, cafes and resorts in Chhatrapati Sambhajinagar — bookings, orders and customers that come straight to you, live in 7 days.",
  primaryCta: { label: "See live demos", href: "/demos/" },
  secondaryCta: { label: "Get a free quote on WhatsApp" },
  trust: ["No commission on orders", "Live in 7 days", "You own your domain", "Free demo before you pay"],
}

export const footer = {
  tagline: "Websites, bookings and online ordering for restaurants, cafes and resorts.",
  basedIn: "Based in Chhatrapati Sambhajinagar, Maharashtra",
  services: [
    { label: "Restaurant websites", href: "/#plans" },
    { label: "Table booking & alerts", href: "/#plans" },
    { label: "Online ordering", href: "/#plans" },
    { label: "Table QR ordering", href: "/qr-ordering/" },
  ],
  explore: [
    { label: "Live demos", href: "/demos/" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Guides", href: "/guides/" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
  ],
}
