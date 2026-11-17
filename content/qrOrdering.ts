import type { Faq } from "./faqs"

export const qrPage = {
  metaTitle: "Table QR Ordering System for Restaurants",
  metaDescription:
    "Guests scan the QR on their table, order from their phone and track the status live. No app to install. Owner console and kitchen screen included. From ₹15,000 + ₹999/month.",

  hero: {
    eyebrow: "Table QR Ordering",
    title: "Scan. Order. Served. No app needed.",
    subtitle:
      "Guests scan the QR code on their table, order from their own phone and watch the status update live. Your kitchen sees every order the moment it's placed.",
    demoSlug: "spice-table",
    points: ["Works in any phone browser", "Veg / non-veg tags & photos", "Hindi, Marathi or English menu"],
  },

  journey: {
    eyebrow: "The guest's side",
    title: "Three taps from sitting down to ordering.",
    steps: [
      {
        title: "Scan & browse",
        desc: "The QR on the table opens your menu straight away, with photos, prices and veg / non-veg tags. The table number is already filled in.",
      },
      {
        title: "Build the order",
        desc: "Guests add dishes, choose spice level or portions, and leave notes like \"less oil\". They can order more rounds whenever they like.",
      },
      {
        title: "Track live status",
        desc: "Received, preparing, on its way. Guests see each step on their phone, so nobody has to wave down a waiter to ask.",
      },
    ],
  },

  console: {
    eyebrow: "Owner console",
    title: "Run the floor from your phone.",
    subtitle: "Everything you need to manage orders and the menu, without calling anyone.",
    features: [
      { icon: "list", title: "Order queues", desc: "New, preparing and served orders, sorted by table and time." },
      { icon: "pencil", title: "Menu & price edits", desc: "Change dishes, photos and prices yourself. Updates go live instantly." },
      { icon: "toggle", title: "Out-of-stock toggle", desc: "Biryani finished? One tap hides it until you switch it back on." },
      { icon: "tag", title: "Offers", desc: "Run happy-hour prices, combos or a dish of the day on the menu." },
    ],
  },

  kitchen: {
    eyebrow: "Kitchen screen",
    title: "Orders land in the kitchen, not in a waiter's notebook.",
    subtitle:
      "Every order appears on a screen in the kitchen the moment it's placed, with the table number and notes. Cooks tap to move it from new to preparing to ready.",
    points: [
      "Runs on any tablet, laptop or smart TV with a browser",
      "Sound alert for every new order",
      "Big, readable tickets with table number and notes",
    ],
  },

  pricing: {
    eyebrow: "What you pay",
    title: "One setup fee, one small monthly fee.",
    included: [
      "QR codes for every table, ready to print",
      "Digital menu with photos, categories and veg / non-veg tags",
      "Guest ordering with notes and repeat rounds",
      "Live order status for guests",
      "Owner console: orders, menu, prices, stock and offers",
      "Kitchen screen with sound alerts",
      "Setup and staff training",
      "Hosting, updates and support (₹999/month)",
    ],
    quotedSeparately: [
      { title: "Online payment gateway", desc: "For guests paying from the table. Gateway fees go to the payment provider." },
      { title: "POS / billing software integration", desc: "Sending orders into your existing billing system." },
      { title: "Kitchen printer (KOT) integration", desc: "Printing order tickets automatically." },
      { title: "Hardware", desc: "Tablets, screens, printers and printed table stands." },
    ],
  },

  /**
   * Real screenshots, when you have them (put files in public/images/qr/).
   * Leave empty to show the illustrated mockups.
   */
  screenshots: {
    guest: ["", "", ""] as [string, string, string],
    console: "",
    kitchen: "",
  },

  enquiry: {
    eyebrow: "Get started",
    title: "Want QR ordering for your restaurant?",
    subtitle: "Tell us how many tables you have. We'll WhatsApp you a free demo with your own menu.",
  },
}

export const qrFaqs: Faq[] = [
  {
    q: "Do guests need to download an app?",
    a: "No. The QR code opens your menu in the phone's normal browser, on Android or iPhone. Nothing to install, no sign-up.",
  },
  {
    q: "Does this replace my waiters?",
    a: "No. It takes care of ordering, so your staff spend less time writing orders and running back and forth, and more time serving and looking after guests.",
  },
  {
    q: "Can guests pay from the table?",
    a: "Yes, if you add an online payment gateway, which we quote separately. Otherwise guests pay at the counter or to staff as they do today.",
  },
  {
    q: "What do I need for the kitchen screen?",
    a: "Any tablet, laptop or smart TV with a web browser and Wi-Fi. If you don't have one, we can suggest an affordable option.",
  },
  {
    q: "Can I change prices or mark dishes out of stock myself?",
    a: "Yes. From the owner console on your phone you can edit dishes and prices, switch items off when they run out, and set up offers. Changes show up instantly.",
  },
  {
    q: "What does the ₹999/month cover?",
    a: "Hosting, software updates and support. Prices are + 18% GST.",
  },
  {
    q: "Can I get QR ordering without a full website?",
    a: "It's designed as an add-on to any Quest Hunter plan, so your QR menu and website share one menu. If you only want QR ordering, message us and we'll suggest the simplest setup.",
  },
]
