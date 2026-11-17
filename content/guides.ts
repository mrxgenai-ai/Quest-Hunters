export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "tip"; text: string }

export type Guide = {
  slug: string
  title: string
  description: string
  category: "Getting found" | "Selling direct" | "Menus" | "QR ordering"
  /** ISO date. */
  published: string
  updated?: string
  readMinutes: number
  /** Draft guides are written but still to be reviewed and expanded. */
  draft: boolean
  body: GuideBlock[]
  /** Where the closing call to action should point. */
  cta: { label: string; href: string }
}

export const guidesIntro = {
  metaTitle: "Guides for Restaurant Owners",
  metaDescription:
    "Plain-English guides for restaurant, café and cloud kitchen owners: getting found on Google, selling direct without commission, better menus and QR ordering.",
  eyebrow: "Guides",
  title: "Practical guides for restaurant owners.",
  subtitle: "Short, plain-English answers to the questions owners ask us most. No jargon.",
}

export const guides: Guide[] = [
  {
    slug: "restaurant-website-vs-zomato-swiggy",
    title: "Your own website vs Zomato and Swiggy: what each is good for",
    description:
      "Delivery apps bring new customers; your own website keeps the regulars. How to use both without giving away a big share of every order.",
    category: "Selling direct",
    published: "2026-11-17",
    readMinutes: 4,
    draft: true,
    body: [
      { type: "p", text: "Most restaurant owners we meet don't want to leave Zomato or Swiggy. They just want to stop paying commission on customers who already know them. That's the right instinct, and it's very doable." },
      { type: "h2", text: "What delivery apps are good at" },
      { type: "ul", items: ["Bringing in people who have never heard of you", "Handling delivery riders if you don't have your own", "Showing up when someone browses by cuisine or area"] },
      { type: "h2", text: "What they cost you" },
      { type: "p", text: "Commission on every order, often 20–30% once fees and promotions are included. You also don't get your customers' phone numbers, so you can't tell them about a new dish or a festival special." },
      { type: "h2", text: "What your own website is good at" },
      { type: "ul", items: ["Orders from regulars with no commission", "Your customer list, so you can message them directly", "Your brand, photos and story, not a row in a list", "Table bookings and party enquiries, which apps don't handle well"] },
      { type: "h2", text: "How to use both" },
      { type: "p", text: "Keep the apps for discovery. Then give every app customer a reason to order direct next time: a small card in the bag with your website or WhatsApp QR, a direct-order discount, or a loyalty offer. Even moving a quarter of your repeat orders adds up quickly." },
      { type: "tip", text: "Try the commission calculator on our home page with your own numbers to see what moving some orders direct is worth." },
    ],
    cta: { label: "Open the commission calculator", href: "/#calculator" },
  },
  {
    slug: "google-business-profile-for-restaurants",
    title: "How to set up your Google Business Profile as a restaurant",
    description:
      "When someone searches \"restaurant near me\", your Google Business Profile is what they see first. A checklist to get it right.",
    category: "Getting found",
    published: "2026-11-17",
    readMinutes: 5,
    draft: true,
    body: [
      { type: "p", text: "Your Google Business Profile is the box with your name, photos, rating and directions that appears on Google Search and Maps. For most restaurants it's seen more often than the website itself, so it's worth an hour to get it right." },
      { type: "h2", text: "The basics" },
      { type: "ul", items: ["Claim or create the profile and complete Google's verification", "Use your real restaurant name, with no extra keywords stuffed in", "Pick the most accurate primary category, such as \"South Indian restaurant\" or \"Café\"", "Set the exact map pin, phone number and opening hours, including holiday hours"] },
      { type: "h2", text: "Photos and menu" },
      { type: "ul", items: ["Add bright photos of your best dishes, the inside, the outside and the entrance", "Link your menu to your website's menu page so it stays up to date", "Add new photos regularly: fresh photos help your profile look active"] },
      { type: "h2", text: "Link it to your website" },
      { type: "p", text: "Add your website, and your booking or ordering link if you have one. When your profile and website show the same name, address and phone number, it's easier for Google and for customers to trust both." },
      { type: "h2", text: "Reviews" },
      { type: "p", text: "Ask happy guests for a review, for example with a QR code on the bill. Reply to every review, good or bad, politely and briefly. Never buy or fake reviews: it breaks Google's rules and customers can usually tell." },
      { type: "tip", text: "Every Quest Hunter plan includes Google Business Profile setup, linked to your new website." },
    ],
    cta: { label: "See the plans", href: "/#plans" },
  },
  {
    slug: "restaurant-website-menu-checklist",
    title: "What to put on your restaurant website menu",
    description:
      "A good online menu answers guests' questions before they call. Here's what to include, from veg / non-veg marks to photos and languages.",
    category: "Menus",
    published: "2026-11-17",
    readMinutes: 4,
    draft: true,
    body: [
      { type: "p", text: "The menu is the most visited page on almost every restaurant website. Guests want to know three things fast: what you serve, how much it costs, and whether it suits them." },
      { type: "h2", text: "Must-haves" },
      { type: "ul", items: ["Prices for every dish, kept up to date", "Clear veg and non-veg marks (and Jain or egg options if you have them)", "Categories that match how people order: starters, mains, breads, drinks, desserts", "Spice level or a short description for anything unfamiliar"] },
      { type: "h2", text: "Photos" },
      { type: "p", text: "You don't need a photo of every dish. Good photos of your ten best-sellers do more than average photos of everything. Natural light, a clean plate and a plain background work well." },
      { type: "h2", text: "Text, not a scanned PDF" },
      { type: "p", text: "A photo or PDF of your printed menu is hard to read on a phone and Google can't read it at all. A real text menu loads fast, can be searched, and is easy to update when prices change." },
      { type: "h2", text: "Languages" },
      { type: "p", text: "If many of your guests are more comfortable in Hindi or Marathi, offer the menu in that language too. A simple language switch at the top is enough." },
      { type: "tip", text: "Open any of our live demos on your phone to see these ideas in a working menu." },
    ],
    cta: { label: "Try the live demos", href: "/demos/" },
  },
  {
    slug: "how-table-qr-ordering-works",
    title: "How table QR ordering works, and when it's worth it",
    description:
      "Guests scan, order and track from their table. What QR ordering changes for your staff and kitchen, and which restaurants it suits best.",
    category: "QR ordering",
    published: "2026-11-17",
    readMinutes: 4,
    draft: true,
    body: [
      { type: "p", text: "With table QR ordering, each table has its own QR code. Guests scan it with their phone camera, browse your menu, place an order and see its status, all without installing an app." },
      { type: "h2", text: "What changes for your team" },
      { type: "ul", items: ["Orders reach the kitchen instantly, with the table number and notes", "Fewer mistakes from handwritten orders", "Waiters spend more time serving and less time taking orders", "You can edit prices and mark dishes out of stock from your phone"] },
      { type: "h2", text: "When it works best" },
      { type: "ul", items: ["Busy dine-in restaurants and cafés where guests wait to order", "Places with many tables and a small floor team", "Food courts, rooftop cafés and resorts where tables are spread out"] },
      { type: "h2", text: "When it might not be right" },
      { type: "p", text: "If most of your guests prefer a waiter's recommendation, or you run a small place with a few tables, a QR menu (view only) may be enough. You can always add ordering later." },
      { type: "tip", text: "See the full guest, owner and kitchen flow on our QR ordering page." },
    ],
    cta: { label: "See how QR ordering works", href: "/qr-ordering/" },
  },
]
