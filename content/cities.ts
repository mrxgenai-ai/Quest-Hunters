import type { Faq } from "./faqs"
import type { PlanId } from "./plans"

export type City = {
  slug: string
  name: string
  /** Older / alternative name people still search for. */
  alsoKnownAs?: string
  metaTitle: string
  metaDescription: string
  hero: { title: string; subtitle: string }
  /** How Quest Hunter works with clients in this city. */
  howWeWork: { title: string; desc: string }
  intro: string[]
  needs: { title: string; desc: string }[]
  recommended: { planId: PlanId; why: string }
  areas: string[]
  faqs: Faq[]
}

// Write each city's copy for that city. Pages that only swap the name can be
// treated as low quality by search engines.
export const cities: City[] = [
  {
    slug: "chhatrapati-sambhajinagar",
    name: "Chhatrapati Sambhajinagar",
    alsoKnownAs: "Aurangabad",
    metaTitle: "Websites in Chhatrapati Sambhajinagar (Aurangabad)",
    metaDescription:
      "Local team building websites for Sambhajinagar shops, startups, restaurants, clinics and hotels, plus social media and WhatsApp automation.",
    hero: {
      title: "Websites for Chhatrapati Sambhajinagar businesses, built by a team down the road.",
      subtitle:
        "From Nirala Bazar shops and CIDCO clinics to Waluj startups and hotels on the Ellora road, we build websites that bring enquiries, bookings and orders straight to you.",
    },
    howWeWork: {
      title: "We're local. We can sit with you.",
      desc: "This is our home city, so we can visit your shop or office, photograph your products, collect your content in person and train your team on site.",
    },
    intro: [
      "Chhatrapati Sambhajinagar has two kinds of customers: locals who already know the city, and visitors heading to Ajanta, Ellora, Bibi Ka Maqbara and Daulatabad who search on their phones for what's nearby. The Waluj and Shendra industrial belts add a steady stream of businesses looking for suppliers and services.",
      "All of them look you up on Google before they call or visit. A fast website with your products or services, photos, location and a WhatsApp button turns that search into a customer.",
    ],
    needs: [
      {
        title: "Shops that want to sell beyond the street",
        desc: "A product catalogue with WhatsApp enquiry or a full online store, so customers across the city can order without visiting.",
      },
      {
        title: "Hotels, clinics and salons that run on bookings",
        desc: "Room, table or appointment requests that arrive on WhatsApp with the date and details, so you can confirm in one reply.",
      },
      {
        title: "Startups and suppliers near Waluj and Shendra",
        desc: "A clear, professional site that explains what you do and collects leads, so bigger clients take you seriously.",
      },
    ],
    recommended: {
      planId: "automation",
      why: "Most businesses here get a mix of walk-ins, calls and visitors. Automation adds bookings and instant WhatsApp alerts to everything in Basic.",
    },
    areas: ["CIDCO", "Nirala Bazar", "Jalna Road", "Cantonment", "Garkheda", "Osmanpura", "Waluj", "Shendra", "Paithan Road", "Khuldabad & Ellora"],
    faqs: [
      {
        q: "Can you visit our business in Chhatrapati Sambhajinagar?",
        a: "Yes. We're based here, so we can meet you at your shop or office, collect your content and photos, and train your team in person.",
      },
      {
        q: "Will my website show up for people searching near Ellora or Ajanta?",
        a: "We set up and connect your Google Business Profile, add your location, hours and services, and build the site so Google can read it easily. Rankings depend on many things, including reviews, so we'll also show you how to collect them.",
      },
    ],
  },
  {
    slug: "jalna",
    name: "Jalna",
    metaTitle: "Website Development in Jalna",
    metaDescription:
      "Websites for Jalna traders, shops, restaurants and service businesses: catalogues, Google Maps, WhatsApp enquiries and bookings. Live in 7 days.",
    hero: {
      title: "Websites for Jalna businesses that want more than walk-ins.",
      subtitle:
        "Traders, seed and steel suppliers, shops and family restaurants in Jalna can take enquiries and orders online, without a big marketing budget.",
    },
    howWeWork: {
      title: "An hour away, on WhatsApp the rest of the time.",
      desc: "We're based in Chhatrapati Sambhajinagar, about an hour's drive from Jalna. Most of the work happens over WhatsApp, and we can come to you for the kickoff and handover.",
    },
    intro: [
      "Jalna is a busy business town, known for its seed companies, steel rolling mills and traders, with plenty of people travelling through on the highway. Many businesses here run on word of mouth, and a lot of them still don't have a website at all.",
      "That's an opportunity. A simple, fast website with your products, location and a WhatsApp button helps you show up when someone searches, and lets regular customers and dealers reach you without a phone call.",
    ],
    needs: [
      {
        title: "Get found by buyers and travellers",
        desc: "A Google Maps listing linked to your website, with photos, opening hours and what you sell.",
      },
      {
        title: "Take bulk and dealer enquiries properly",
        desc: "An enquiry form for bulk orders, dealer requests and quotes, sent straight to your WhatsApp with all the details.",
      },
      {
        title: "Keep it simple to run",
        desc: "Everything works from your phone. No computer, no technical staff, no app for your customers to download.",
      },
    ],
    recommended: {
      planId: "basic",
      why: "If you don't have a website yet, Basic gets you online fast with your products, gallery, Maps and WhatsApp. You can add bookings or a store later and only pay the difference.",
    },
    areas: ["Old Jalna", "New Jalna", "Mantha Road", "Ambad Road", "Aurangabad Road", "MIDC Jalna", "Badnapur", "Ambad"],
    faqs: [
      {
        q: "Do you work with businesses in Jalna?",
        a: "Yes. We're about an hour away in Chhatrapati Sambhajinagar. We handle most things over WhatsApp and can visit for the first meeting and the handover.",
      },
      {
        q: "We don't have good product photos. Can we still start?",
        a: "Yes. Start with a list of what you sell and a few phone photos. We'll tell you exactly which shots to take, or arrange a photoshoot when we visit.",
      },
    ],
  },
  {
    slug: "ahilyanagar",
    name: "Ahilyanagar",
    alsoKnownAs: "Ahmednagar",
    metaTitle: "Website Development in Ahilyanagar (Ahmednagar)",
    metaDescription:
      "Websites for Ahilyanagar and the Shirdi route: hotels, shops, restaurants and services, with bookings, WhatsApp enquiries and local promotion.",
    hero: {
      title: "Websites for Ahilyanagar businesses and the pilgrimage route.",
      subtitle:
        "Whether you serve locals in the city or visitors heading to Shirdi and Shani Shingnapur, customers should be able to find you, see what you offer and book in a minute.",
    },
    howWeWork: {
      title: "Remote-first, with visits when it matters.",
      desc: "We work with Ahilyanagar clients over WhatsApp and video calls from Chhatrapati Sambhajinagar, and travel in for photoshoots or training when the project needs it.",
    },
    intro: [
      "Ahilyanagar sits on the route to two of Maharashtra's busiest pilgrimage towns, Shirdi and Shani Shingnapur. Families and groups plan these trips in advance, and they look for reliable places to stay, eat, shop and travel on the way.",
      "That makes clear information your biggest selling point: what you offer, prices shown upfront, timings, location and a quick way to book or enquire.",
    ],
    needs: [
      {
        title: "Hotels, lodges and travel services",
        desc: "Room and tour enquiries with dates and group size, arriving on WhatsApp so you can confirm before guests set off.",
      },
      {
        title: "Shops on the pilgrimage route",
        desc: "A catalogue of what you sell, with directions and timings, so visitors can find you and order ahead.",
      },
      {
        title: "Local businesses in the city",
        desc: "Clinics, coaching classes and service businesses in Savedi or Tarakpur that want appointments and enquiries online.",
      },
    ],
    recommended: {
      planId: "automation",
      why: "Visitors plan ahead. Automation's bookings with instant WhatsApp alerts mean you can confirm a group or an appointment in one message.",
    },
    areas: ["Savedi", "Tarakpur", "Market Yard", "Kedgaon", "Bhingar", "MIDC Ahilyanagar", "Shirdi", "Shani Shingnapur", "Rahuri"],
    faqs: [
      {
        q: "Is it Ahilyanagar or Ahmednagar on the website?",
        a: "Both. We use Ahilyanagar as the main name and mention Ahmednagar too, because many people still search with the old name.",
      },
      {
        q: "Can you build a site for a hotel near Shirdi?",
        a: "Yes. We can build one site that covers your rooms and any restaurant or travel services, with separate enquiry buttons for each, all arriving on WhatsApp.",
      },
    ],
  },
  {
    slug: "pune",
    name: "Pune",
    metaTitle: "Website Development for Pune Startups, Stores & Cafés",
    metaDescription:
      "Websites, online stores and social media for Pune startups, retail brands and cafés. Sell direct and automate WhatsApp and email, delivered remotely.",
    hero: {
      title: "Pune startups, stores and cafés: own your customers, not just your listing.",
      subtitle:
        "In a city full of marketplaces and delivery apps, your own website and store lets customers buy direct, pay by UPI and hear from you on WhatsApp and email.",
    },
    howWeWork: {
      title: "Fully remote, fully on WhatsApp.",
      desc: "We work with Pune clients remotely from Chhatrapati Sambhajinagar: calls, reviews and handover over WhatsApp and video. You get the same written proposal, two review rounds and support.",
    },
    intro: [
      "Pune moves fast. New startups launch from Baner and Hinjewadi, D2C brands sell from Kothrud and Wakad, and cafés and cloud kitchens open across Koregaon Park and Viman Nagar all the time. Most depend on marketplaces and apps that take a cut of every sale.",
      "You don't have to leave them. But your repeat customers can buy from your own site instead. Every order that moves is money you keep, and a customer whose number and email you actually have.",
    ],
    needs: [
      {
        title: "Startup landing pages that convert",
        desc: "A fast one-page site that explains your product in seconds, shows pricing and collects sign-ups or demo requests.",
      },
      {
        title: "Direct selling for D2C brands and cloud kitchens",
        desc: "Your own store with UPI and card payments, delivery or pickup, and order updates on WhatsApp.",
      },
      {
        title: "Social media and email that keep customers coming",
        desc: "A Grow plan for Instagram, WhatsApp broadcasts and email offers, so customers come back without paying for each one again.",
      },
    ],
    recommended: {
      planId: "ecommerce",
      why: "If online sales are most of your business, E-commerce gives you a store, payments, delivery and WhatsApp order updates, without per-order commission.",
    },
    areas: ["Koregaon Park", "Baner", "Viman Nagar", "Kothrud", "Hinjewadi", "Wakad", "Aundh", "Kalyani Nagar", "Hadapsar", "FC Road"],
    faqs: [
      {
        q: "You're not in Pune. How does the project work?",
        a: "Remotely. We do the first call on WhatsApp or video, send a written proposal within 24 hours, share progress links for your review, and hand over with a recorded walkthrough.",
      },
      {
        q: "Should I stop selling on marketplaces and delivery apps?",
        a: "Not necessarily. Many businesses keep them for new customers and move regulars to their own site. We'll help you decide which customers to bring direct first.",
      },
    ],
  },
]

export const cityIndex = cities.map(({ slug, name }) => ({ slug, name }))
