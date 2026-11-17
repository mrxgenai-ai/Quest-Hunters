// PLACEHOLDER legal text. Have it reviewed before launch; it is not legal advice.

export type LegalSection = { heading: string; paragraphs: string[] }

export const privacy = {
  metaTitle: "Privacy Policy",
  title: "Privacy policy",
  updated: "2026-11-17",
  intro:
    "This page explains what information Quest Hunter collects through this website and how we use it. Placeholder text: to be reviewed before launch.",
  sections: [
    {
      heading: "What we collect",
      paragraphs: [
        "When you send an enquiry, the details you type (name, restaurant name, phone number, plan interest and message) are placed into a WhatsApp message on your own device. Nothing is stored on this website's servers; you choose whether to send it.",
        "If analytics is switched on, Google Analytics collects anonymous usage data such as pages visited, device type and approximate location, using cookies.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use your contact details only to reply to your enquiry and, if you become a client, to deliver and support your project. We don't sell or rent your information.",
        "Analytics data helps us understand which pages are useful so we can improve the site.",
      ],
    },
    {
      heading: "Third-party services",
      paragraphs: [
        "Messages you send us on WhatsApp are handled under WhatsApp's own privacy policy. Analytics is provided by Google under Google's privacy policy. Demo websites linked from this site are run by us but are separate sites.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "You can block or delete cookies in your browser settings. To ask what information we hold about you, or to have it deleted, contact us using the details on this site.",
      ],
    },
  ] as LegalSection[],
}

export const terms = {
  metaTitle: "Terms & Conditions",
  title: "Terms & conditions",
  updated: "2026-11-17",
  intro: "These terms cover your use of this website. Placeholder text: to be reviewed before launch.",
  sections: [
    {
      heading: "Prices and quotes",
      paragraphs: [
        "Prices on this website are starting prices in Indian rupees and exclude 18% GST unless stated otherwise. The scope, timeline and final price of any project are confirmed in a written proposal, which takes priority over this website.",
      ],
    },
    {
      heading: "Demo websites",
      paragraphs: [
        "The demo restaurants on this site are fictional and built by Quest Hunter to show what we can make. They are not client projects. Orders and bookings placed in demos are for demonstration only.",
      ],
    },
    {
      heading: "Timelines",
      paragraphs: [
        "Timelines such as \"live in 7 days\" assume we receive your content (menu, photos, logo, approvals) on time. Your proposal states the timeline for your project.",
      ],
    },
    {
      heading: "Ownership",
      paragraphs: [
        "Once a project is paid for, you own your domain, your content and your website. Details are set out in your project agreement.",
      ],
    },
    {
      heading: "Using this website",
      paragraphs: [
        "Content on this website is provided for general information. We try to keep it accurate but can't guarantee it is always complete or up to date.",
      ],
    },
  ] as LegalSection[],
}
