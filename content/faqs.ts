export type Faq = { q: string; a: string }

export const faqPage = {
  metaTitle: "FAQ: Websites, Marketing, Payments & GST",
  metaDescription:
    "Answers about Quest Hunter websites, social media and automation, payments and GST, and working with clients outside India.",
  eyebrow: "FAQ",
  title: "Questions people ask us.",
  subtitle: "Can't find yours? Ask us on WhatsApp and a real person will reply.",
}

export const faqGroups: { id: string; title: string; items: Faq[] }[] = [
  {
    id: "websites",
    title: "Websites",
    items: [
      {
        q: "How long does it take to go live?",
        a: "Basic sites go live in about 7 days, Automation in about 14 days, and E-commerce in 3–4 weeks. The clock starts once we have your content: products or services, photos and logo. If you don't have them ready, we help.",
      },
      {
        q: "I'm not technical. Will I be able to manage it?",
        a: "Yes. Enquiries, bookings and orders arrive on WhatsApp, and the owner dashboard works like a simple app on your phone. We train you and your team at handover.",
      },
      {
        q: "I already have a website. Can you help?",
        a: "Yes. Send us the link and we'll do a free audit: speed on mobile, Google visibility, and what's stopping visitors from enquiring or buying. Then we suggest whether to fix it or rebuild.",
      },
      {
        q: "Can I start with Basic and upgrade later?",
        a: "Yes. Every plan is built so you can add bookings, an online store or QR ordering later. You only pay the difference for the new features, not for a new website.",
      },
      {
        q: "Who owns the website and domain?",
        a: "You do. The domain is registered in your name and your customer list is yours. If you ever leave, everything goes with you.",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & automation",
    items: [
      {
        q: "What's included in a Grow plan?",
        a: "Depending on the tier: social media posts, reels, captions and stories, a content calendar, WhatsApp and email automation, Google Business Profile posts, review requests and a monthly report. The services page lists what each tier includes.",
      },
      {
        q: "Do I need a website to take a Grow plan?",
        a: "No. Grow works on its own, for example for social media and WhatsApp. It works best with a website, because that's where your posts and messages send people.",
      },
      {
        q: "Do you use the official WhatsApp Business API?",
        a: "Yes. Automations and broadcast messages run through the official WhatsApp Business API, so your number stays safe. WhatsApp charges its own per-message fees, which are billed separately.",
      },
      {
        q: "Is ad spend included?",
        a: "No. If we run paid ads for you, the ad budget is paid directly to Meta or Google. Our fee covers planning and managing the ads.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & GST",
    items: [
      {
        q: "Are prices inclusive of GST?",
        a: "No. Prices shown are starting prices before GST. 18% GST is added on the invoice for clients in India, and your written proposal shows the final amount.",
      },
      {
        q: "Do you take a commission on orders?",
        a: "Never. You pay for the build and any monthly plan you choose. Payment gateway charges (usually around 2% on online payments) go to the gateway, not to us.",
      },
      {
        q: "How do I pay?",
        a: "Usually in two parts for website builds: an advance to start and the balance before launch. Monthly plans are billed at the start of each month. Your proposal states the exact terms.",
      },
    ],
  },
  {
    id: "international",
    title: "International clients",
    items: [
      {
        q: "Do you work with clients outside India?",
        a: "Yes. We work remotely with clients anywhere: calls on WhatsApp or video, progress links you can review on your phone, and a recorded handover.",
      },
      {
        q: "Can I see prices in US dollars?",
        a: "Yes. Switch the services page to USD. Your written proposal confirms the final price in your currency.",
      },
      {
        q: "Which time zone do you work in?",
        a: "Indian Standard Time (IST). We reply on WhatsApp from 10am to 8pm IST and can schedule calls to suit your time zone.",
      },
    ],
  },
]

/** Questions reused on the city pages (GST and upgrades). */
export const generalFaqs: Faq[] = faqGroups.flatMap((g) => g.items).filter((f) => /GST|upgrade/i.test(f.q))
