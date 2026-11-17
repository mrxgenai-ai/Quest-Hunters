// Home page = "The Quest Hunter book": cover, contents, four chapters, epilogue.
// Only the introduction lives here; details live on the other pages.
// "Why we started" is a draft in our words: review it and make it yours.

export const homeMeta = {
  title: "Quest Hunter: We Build Your Website and Grow Your Business Online",
  description:
    "Websites, social media and WhatsApp & email automation for startups, shops, restaurants and service businesses. Based in Sambhajinagar, working worldwide.",
}

export const cover = {
  kicker: "A field guide to growing online",
  title: "Quest Hunter",
  promise: "We build your website and grow your business online.",
  readCta: { label: "Begin reading", href: "#contents" },
  startCta: { label: "Start your quest", href: "/contact/" },
  meta: ["Est. Chhatrapati Sambhajinagar", "Remote worldwide"],
}

export type Chapter = {
  id: string
  numeral: string
  /** Page-number style label shown in the contents. */
  page: string
  title: string
  summary: string
}

export const chapters: Chapter[] = [
  { id: "who-we-are", numeral: "I", page: "01", title: "Who we are", summary: "Three people, one promise, and why we started." },
  { id: "what-we-provide", numeral: "II", page: "02", title: "What we provide", summary: "BUILD your website. GROW your business." },
  { id: "how-the-quest-works", numeral: "III", page: "03", title: "How the quest works", summary: "Four steps from first call to launch." },
  { id: "begin-your-quest", numeral: "IV", page: "04", title: "Begin your quest", summary: "Tell us where you want to go." },
]

export const contents = {
  eyebrow: "Contents",
  title: "In this book",
}

export const chapterOne = {
  intro:
    "Quest Hunter is a small team of engineers from Chhatrapati Sambhajinagar that builds websites and helps businesses grow online. We work with startups, shop owners, restaurants and service businesses, in our own city and anywhere in the world.",
  whyTitle: "Why we started",
  why: [
    "Too many good businesses are invisible online, or rent their customers from marketplaces and apps that take a cut of every sale.",
    "We started Quest Hunter to change that: give every business its own fast website, its own customer list, and a simple monthly system to keep customers coming back.",
  ],
  helpTitle: "Who we help",
  help: ["Startups", "Retail & clothing stores", "Electronics shops", "Restaurants & cafés", "Clinics, salons & studios", "Service businesses"],
  teamTitle: "The crew",
  /** Shown under the crew heading. */
  teamNote: "All three of us are B.Tech engineers in IT and AI & ML.",
  team: [
    {
      name: "Mudassir Shaikh",
      role: "Founder & Lead Developer",
      bio: "Designs and builds every site, and makes sure it loads fast on a cheap phone and a slow network.",
      photo: "",
    },
    {
      name: "Abhay Chonde",
      role: "Automation Lead",
      bio: "Sets up bookings, WhatsApp and email automations, payments and order flows so your team does less by hand.",
      photo: "",
    },
    {
      name: "Krishna Bhosle",
      role: "Client Partner & Developer",
      bio: "Your first call and your main contact, from the free demo to launch day and every month after, and part of the team that builds your site.",
      photo: "",
    },
  ],
}

export const chapterTwo = {
  intro:
    "Everything we do fits into two lines of work. BUILD gets you a website that does the work. GROW keeps customers finding you, every month.",
  build: {
    label: "Build",
    title: "Your website",
    desc: "Basic, Automation and E-commerce websites, plus add-ons like QR ordering and booking systems.",
    from: "From ₹12,000 + GST",
  },
  grow: {
    label: "Grow",
    title: "Your growth",
    desc: "Social media, WhatsApp and email automation, local promotion and a monthly report.",
    from: "Starter · Growth · Pro",
  },
  cta: { label: "Explore services", href: "/services/" },
}

export const chapterThree = {
  intro: "Every quest needs a route. Ours has four stops, and you always know which one you're at.",
  cta: { label: "See the full route", href: "/how-it-works/" },
}

export const chapterFour = {
  intro:
    "Tell us about your business and where you want it to go. We'll reply on WhatsApp within 2 hours (10am–8pm IST) with ideas and a free demo.",
  contactCta: { label: "Start your quest", href: "/contact/" },
  whatsappLabel: "Message us on WhatsApp",
}

export const epilogue = {
  title: "Epilogue",
  text: "Every business has a story worth finding online. We'd like to help write the next chapter of yours.",
}

/**
 * One photo per chapter (Unsplash License: free to use; credit is a courtesy
 * we keep). Files are in public/images/chapters/<chapter id>-640.webp and -960.webp.
 */
export const chapterPhotos: Record<string, { alt: string; credit: string; creditUrl: string }> = {
  "who-we-are": {
    alt: "The rock-cut temples of Ellora near Chhatrapati Sambhajinagar, carved into a green hillside",
    credit: "Arundhati Pathak",
    creditUrl: "https://unsplash.com/@arundhativisuals",
  },
  "what-we-provide": {
    alt: "A laptop on a desk at night with a lamp and the city lights behind it",
    credit: "Avtar Singh",
    creditUrl: "https://unsplash.com/@avtar9w",
  },
  "how-the-quest-works": {
    alt: "A compass and ruler lying on a map",
    credit: "Hendrik Morkel",
    creditUrl: "https://unsplash.com/@hendrikmorkel",
  },
  "begin-your-quest": {
    alt: "A winding mountain road at sunrise with sunbeams over the hills",
    credit: "Akshat Jhingran",
    creditUrl: "https://unsplash.com/@akshat_jhingran",
  },
}
