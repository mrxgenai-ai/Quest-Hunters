export type NavItem = { label: string; href: string }

/** Top navigation, in this order. */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/services/" },
  { label: "Demos", href: "/demos/" },
  { label: "How it works", href: "/how-it-works/" },
  { label: "Contact", href: "/contact/" },
  { label: "FAQ", href: "/faq/" },
]

export const headerCta = { label: "Start your quest", href: "/contact/" }

/** Used for the default page title, meta description and the social share image. */
export const brand = {
  tagline: "We build your website and grow your business online.",
  description:
    "Quest Hunter builds websites and grows businesses online with social media and WhatsApp & email automation. Based in Sambhajinagar, working worldwide.",
  shareChips: ["Websites", "Social media", "WhatsApp automation", "Local & worldwide"],
}

export const footer = {
  tagline: "Websites, social media and automation for startups, shops, restaurants and service businesses.",
  basedIn: "Local in Chhatrapati Sambhajinagar · remote worldwide",
  services: [
    { label: "Build: websites", href: "/services/#build" },
    { label: "Grow: monthly marketing", href: "/services/#grow" },
    { label: "Add-ons & bundles", href: "/services/#add-ons" },
    { label: "QR ordering", href: "/qr-ordering/" },
  ],
  explore: [
    { label: "Demos", href: "/demos/" },
    { label: "How it works", href: "/how-it-works/" },
    { label: "Guides", href: "/guides/" },
    { label: "FAQ", href: "/faq/" },
    { label: "Contact", href: "/contact/" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
  ],
}
