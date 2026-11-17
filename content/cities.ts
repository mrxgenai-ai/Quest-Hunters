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

export const cities: City[] = [
  {
    slug: "chhatrapati-sambhajinagar",
    name: "Chhatrapati Sambhajinagar",
    alsoKnownAs: "Aurangabad",
    metaTitle: "Restaurant Website Development in Chhatrapati Sambhajinagar (Aurangabad)",
    metaDescription:
      "Local web team in Chhatrapati Sambhajinagar building websites for restaurants, cafes, hotels and resorts. Table booking, online ordering and QR menus with no commission. Live in 7 days.",
    hero: {
      title: "Restaurant websites in Chhatrapati Sambhajinagar, built by a team down the road.",
      subtitle:
        "From Nirala Bazar cafés to resorts on the Ellora road, we build websites that bring bookings and orders straight to you, not through an app that takes a cut.",
    },
    howWeWork: {
      title: "We're local. We can sit with you.",
      desc: "This is our home city, so we can visit your restaurant, photograph your dishes, collect your menu in person and train your staff on site.",
    },
    intro: [
      "Chhatrapati Sambhajinagar gets two very different kinds of diners: locals who already know where they like to eat, and visitors heading to Ajanta, Ellora, Bibi Ka Maqbara and Daulatabad who are searching on their phones for somewhere good nearby.",
      "Both groups look you up on Google before they come. A fast website with your menu, photos, location and a WhatsApp button turns that search into a visit, and a booking form means you don't miss tables when the phone is busy.",
    ],
    needs: [
      {
        title: "Show up for tourists searching nearby",
        desc: "A Google Business Profile linked to a proper website, with your menu and photos, so visitors near the caves and monuments find you first.",
      },
      {
        title: "Resorts and hotels need bookings, not just a brochure",
        desc: "Room and table enquiries that arrive on WhatsApp with the date and party size, so your front desk can confirm in one reply.",
      },
      {
        title: "Local regulars want to order direct",
        desc: "Online ordering with UPI and delivery or pickup lets regulars skip the app, and you keep the full bill.",
      },
    ],
    recommended: {
      planId: "automation",
      why: "Most restaurants here get a mix of walk-ins, tourists and group bookings. Automation adds table booking with instant WhatsApp alerts to everything in Basic.",
    },
    areas: ["CIDCO", "Nirala Bazar", "Jalna Road", "Cantonment", "Garkheda", "Osmanpura", "Waluj", "Paithan Road", "Khuldabad & Ellora"],
    faqs: [
      {
        q: "Can you visit our restaurant in Chhatrapati Sambhajinagar?",
        a: "Yes. We're based here, so we can meet you at your restaurant, collect your menu and photos, and train your staff in person.",
      },
      {
        q: "Will my website show up for tourists searching near Ellora or Ajanta?",
        a: "We set up and connect your Google Business Profile, add your location, hours and menu, and build the site so Google can read it easily. Rankings depend on many things, including reviews, so we'll also show you how to collect them.",
      },
    ],
  },
  {
    slug: "jalna",
    name: "Jalna",
    metaTitle: "Restaurant Website Development in Jalna",
    metaDescription:
      "Websites for restaurants, family dining and sweet shops in Jalna. Digital menu, Google Maps, WhatsApp orders and table booking, built by a team an hour away in Chhatrapati Sambhajinagar.",
    hero: {
      title: "Websites for Jalna restaurants that want more than walk-ins.",
      subtitle:
        "Family restaurants, highway dhabas and sweet shops in Jalna can take orders and bookings online without paying commission to an app.",
    },
    howWeWork: {
      title: "An hour away, on WhatsApp the rest of the time.",
      desc: "We're based in Chhatrapati Sambhajinagar, about an hour's drive from Jalna. Most of the work happens over WhatsApp, and we can come to you for the kickoff and handover.",
    },
    intro: [
      "Jalna is a busy business town, with traders, seed and steel companies, and plenty of people travelling through on the highway. Many restaurants here run on word of mouth and walk-ins, and a lot of them still don't have a website at all.",
      "That's an opportunity. A simple, fast website with your menu, location and a WhatsApp button helps you show up when someone searches for a family restaurant or a place to eat on the way, and lets regulars order without a phone call.",
    ],
    needs: [
      {
        title: "Get found by people passing through",
        desc: "A Google Maps listing linked to your website, with photos and opening hours, for travellers searching for a place to stop.",
      },
      {
        title: "Take bulk and party orders properly",
        desc: "An enquiry form for family functions, office lunches and festival orders, sent straight to your WhatsApp with all the details.",
      },
      {
        title: "Keep it simple to run",
        desc: "Everything works from your phone. No computer, no technical staff, no app for your customers to download.",
      },
    ],
    recommended: {
      planId: "basic",
      why: "If you don't have a website yet, Basic gets you online fast with a menu, gallery, Maps and WhatsApp. You can add booking or ordering later and only pay the difference.",
    },
    areas: ["Old Jalna", "New Jalna", "Mantha Road", "Ambad Road", "Aurangabad Road", "MIDC Jalna", "Badnapur", "Ambad"],
    faqs: [
      {
        q: "Do you work with restaurants in Jalna?",
        a: "Yes. We're about an hour away in Chhatrapati Sambhajinagar. We handle most things over WhatsApp and can visit for the first meeting and the handover.",
      },
      {
        q: "We don't have good photos of our food. Can we still start?",
        a: "Yes. Start with your menu and a few phone photos. We'll tell you exactly which shots to take, or arrange a photoshoot when we visit.",
      },
    ],
  },
  {
    slug: "ahilyanagar",
    name: "Ahilyanagar",
    alsoKnownAs: "Ahmednagar",
    metaTitle: "Restaurant Website Development in Ahilyanagar (Ahmednagar)",
    metaDescription:
      "Restaurant, hotel and café websites for Ahilyanagar and the Shirdi and Shani Shingnapur route. Menus, Maps, WhatsApp booking and online ordering, with no commission.",
    hero: {
      title: "Restaurant and hotel websites for Ahilyanagar and the pilgrimage route.",
      subtitle:
        "Whether you serve locals in the city or pilgrims heading to Shirdi and Shani Shingnapur, guests should be able to find you, see your menu and book in a minute.",
    },
    howWeWork: {
      title: "Remote-first, with visits when it matters.",
      desc: "We work with Ahilyanagar clients over WhatsApp and video calls from Chhatrapati Sambhajinagar, and travel in for photoshoots or training when the project needs it.",
    },
    intro: [
      "Ahilyanagar sits on the route to two of Maharashtra's busiest pilgrimage towns, Shirdi and Shani Shingnapur. Families and groups plan these trips in advance, and they look for clean, reliable places to eat and stay on the way.",
      "That makes clear information your biggest selling point: veg options marked clearly, prices shown upfront, timings, parking and a quick way to book for a large group.",
    ],
    needs: [
      {
        title: "Pure-veg and veg / non-veg clarity",
        desc: "Menus with clear veg and non-veg marks, and a pure-veg badge if that's you, so pilgrim families can decide at a glance.",
      },
      {
        title: "Group and family bookings",
        desc: "A booking form that asks for party size, date and time, so tour groups and large families can reserve before they arrive.",
      },
      {
        title: "Hotels with restaurants",
        desc: "One site for your rooms and your dining, with enquiries for both landing on the same WhatsApp number.",
      },
    ],
    recommended: {
      planId: "automation",
      why: "Groups plan ahead. Automation's table booking with instant WhatsApp alerts means you can confirm a 20-person lunch in one message.",
    },
    areas: ["Savedi", "Tarakpur", "Market Yard", "Kedgaon", "Bhingar", "MIDC Ahilyanagar", "Shirdi", "Shani Shingnapur", "Rahuri"],
    faqs: [
      {
        q: "Is it Ahilyanagar or Ahmednagar on the website?",
        a: "Both. We use Ahilyanagar as the main name and mention Ahmednagar too, because many people still search with the old name.",
      },
      {
        q: "Can you build a site for a hotel near Shirdi?",
        a: "Yes. We can build one site that covers your rooms and your restaurant, with separate enquiry buttons for each, both arriving on WhatsApp.",
      },
    ],
  },
  {
    slug: "pune",
    name: "Pune",
    metaTitle: "Restaurant, Café & Cloud Kitchen Website Development in Pune",
    metaDescription:
      "Websites and direct online ordering for Pune cafés, restaurants and cloud kitchens. Cut delivery-app commission with your own ordering site, UPI payments and WhatsApp order updates.",
    hero: {
      title: "Pune cafés and cloud kitchens: stop paying commission on your regulars.",
      subtitle:
        "In a city full of delivery apps, your own ordering website lets repeat customers order direct, pay by UPI and get order updates on WhatsApp.",
    },
    howWeWork: {
      title: "Fully remote, fully on WhatsApp.",
      desc: "We work with Pune clients remotely from Chhatrapati Sambhajinagar: calls, reviews and handover over WhatsApp and video. You get the same written proposal, two review rounds and support.",
    },
    intro: [
      "Pune's food scene moves fast, with new cafés and cloud kitchens opening across Koregaon Park, Baner, Viman Nagar, Kothrud and Hinjewadi all the time. Most of them depend heavily on delivery apps, and that commission comes out of every order.",
      "You don't have to leave the apps. But your regulars, the people who order every week, can order from your own website instead. Every order that moves is money you keep, and a customer whose number you actually have.",
    ],
    needs: [
      {
        title: "Direct ordering for repeat customers",
        desc: "Your own ordering site with UPI and card payments, delivery or pickup, and live order status on WhatsApp.",
      },
      {
        title: "A brand that stands out from the app listing",
        desc: "A site that shows your story, photos and specials, which an app listing can't, and gives people a reason to choose you.",
      },
      {
        title: "Multiple brands from one kitchen",
        desc: "Running two or three brands from one cloud kitchen? We can plan a site for each, or one site with separate menus.",
      },
    ],
    recommended: {
      planId: "ecommerce",
      why: "If delivery is most of your business, E-commerce gives you ordering, payments, delivery and pickup, and live WhatsApp status, without per-order commission.",
    },
    areas: ["Koregaon Park", "Baner", "Viman Nagar", "Kothrud", "Hinjewadi", "Wakad", "Aundh", "Kalyani Nagar", "Hadapsar", "FC Road"],
    faqs: [
      {
        q: "You're not in Pune. How does the project work?",
        a: "Remotely. We do the first call on WhatsApp or video, send a written proposal within 24 hours, share progress links for your review, and hand over with a recorded walkthrough.",
      },
      {
        q: "Should I leave Zomato and Swiggy?",
        a: "Not necessarily. Many owners keep the apps for new customers and move regulars to their own site. Try our commission calculator to see what that could be worth.",
      },
    ],
  },
]

export const cityIndex = cities.map(({ slug, name }) => ({ slug, name }))
