# Quest Hunter website

Website for Quest Hunter, a small team of engineers in Chhatrapati Sambhajinagar who **build websites** (one-time projects) and **help businesses grow online** (monthly plans). We work with startups, retail stores, restaurants and service businesses, both locally and remotely worldwide.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**, exported as a **static site** (`out/` folder) so it can be hosted on Vercel, Hostinger or any static host.

> **Before launch:** work through [Placeholders to replace](#placeholders-to-replace). Every item there is a guess, a dummy value or a decision that's still open.

## Setup

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build → static files in `out/` (then `scripts/fix-export-segments.mjs` runs automatically to fix prefetch file names when building on Windows) |
| `npm run start` | Serves `out/` locally to check the production build |
| `npm run lint` | oxlint + TypeScript type check |
| `npm test` | Browser tests against the built `out/` folder (see [Tests](#tests)) |

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, e.g. `https://www.yourdomain.com`. Used for canonical links, sitemap, Open Graph and structured data. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID (`G-XXXXXXX`). Leave empty to disable tracking. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Where the contact form's **Send enquiry** button delivers, e.g. a [Formspree](https://formspree.io) form URL `https://formspree.io/f/xxxxxxx`. Leave empty and the button opens the visitor's email app addressed to `siteConfig.email` instead. |

## Pages

| Route | What it is |
| --- | --- |
| `/` | The home page "book": cover, contents, Chapters I–IV and an epilogue, with the quest path drawing down the side as you scroll |
| `/services/` | BUILD plans and add-ons, GROW services and tiers, bundles, who we work with, INR/USD switch |
| `/demos/` | Demo sites, filterable by business type and plan (filters are kept in the URL, e.g. `/demos/#type=restaurant&plan=automation`) |
| `/how-it-works/` | The 4 build steps and the monthly Grow cycle |
| `/contact/` | Contact form (sends to WhatsApp), local and worldwide reach |
| `/faq/` | FAQ in 4 groups |
| `/qr-ordering/` | QR ordering add-on |
| `/guides/`, `/guides/<slug>/` | Guides |
| `/website-development/<city>/` | Local city pages |
| `/privacy/`, `/terms/` | Legal pages |

## Where to change things

All text, prices and contact details live in `config/` and `content/`. You shouldn't need to touch components to change wording.

| What | File |
| --- | --- |
| WhatsApp number, phone, email, domain, address, reply hours, "local · worldwide" line | `config/site.ts` → `siteConfig` |
| USD prices and the ₹/$ switch (turn it off with `usdEnabled: false`) | `config/site.ts` → `currencyConfig` |
| Pre-filled WhatsApp messages | `config/site.ts` → `whatsappMessages` |
| Navigation, header button, tagline, footer links | `content/site.ts` |
| BUILD plans (Basic / Automation / E-commerce), INR prices, add-ons, care plan, GST rate | `content/plans.ts` |
| What "[PRICE]" says while a price isn't decided (e.g. change it to "Ask us") | `content/plans.ts` → `pricePlaceholder` |
| GROW services, Starter / Growth / Pro tiers, bundles, who we work with, why us, reviews | `content/services.ts` |
| Home page book: cover, chapters, team, epilogue, chapter photos and credits | `content/home.ts` |
| Demo sites, their URLs, business types and filters | `content/demos.ts` |
| How it works (build steps + Grow cycle) | `content/howItWorks.ts` |
| Contact page and form text, "I'm interested in" options | `content/contact.ts` |
| FAQ (4 groups) | `content/faqs.ts` |
| City pages | `content/cities.ts` (add an entry to create a new city page) |
| Guides | `content/guides.ts` (add an entry to publish a new guide) |
| QR ordering page | `content/qrOrdering.ts` |
| Privacy and terms | `content/legal.ts` |
| Colours (night, paper, ember, signal) and dark mode | `app/globals.css` (`:root` tokens and the `prefers-color-scheme: dark` block) |
| Logo / favicon | `components/layout/Logo.tsx`, `app/icon.svg` |
| Social share image | `app/og.png/route.tsx` |

### Prices

- **INR prices** are in `content/plans.ts` (BUILD) and `content/services.ts` (GROW, bundles). They're starting prices before GST.
- `null` means **not decided**. The site then shows `[PRICE]`. Never put in a number that isn't confirmed.
- **USD prices** are in `config/site.ts` → `currencyConfig.usdPrices`, keyed by the same ids (`basic`, `starter`, `website-plus-grow`, …). `null` shows `$ [PRICE]`.
- The visitor's ₹/$ choice is remembered in their browser.

### Photos

- **Chapter photos** (home page): `public/images/chapters/<chapter-id>-640.webp` and `-960.webp`. Alt text and photographer credit are in `content/home.ts` → `chapterPhotos`. To swap a photo, replace both files (same names, same 4:3 shape) and update the credit.
- **Team photos**: put a square `.webp` (about 200×200) in `public/images/team/` and set `photo: "/images/team/<name>.webp"` in `content/home.ts`. Until then, initials are shown.
- **Demo screenshots**: put a `.webp` in `public/images/demos/` and set `image` on the demo in `content/demos.ts`. Until then, an illustrated phone preview is shown.
- Keep photos as `.webp`, under ~200 KB, sized for where they appear.

### Reviews

The trust section shows an honest "coming soon" message until you have real reviews. To show them, fill in `trust.reviews`, `trust.results` and `trust.googleRating` in `content/services.ts`, then set `showReviews: true`. Only publish real reviews you have permission to use.

### Guides and drafts

Guides marked `draft: true` are live on the site, but search engines are told not to index them (`noindex`) and they're left out of the sitemap. Review the text, then set `draft: false`. This is also why Lighthouse shows SEO 66 on draft guides: it's intentional.

Write each city page's copy specifically for that city. Pages that only swap the city name can be treated as low-quality by search engines.

## Placeholders to replace

Everything below is a dummy value, a suggestion or an open decision. Search the code for `PLACEHOLDER` and `[PRICE]` to find most of them.

### Contact and domain: must change before launch

| Item | Where | Current value |
| --- | --- | --- |
| Domain | `.env.local` → `NEXT_PUBLIC_SITE_URL` (fallback in `config/site.ts`) | `https://questhunter.example` |
| WhatsApp number | `config/site.ts` → `whatsappNumber` | `910000000000` |
| Phone shown on site | `config/site.ts` → `phoneDisplay` | `+91 00000 00000` |
| Email | `config/site.ts` → `email` | `hello@questhunter.example` |
| Office address / PIN code | `config/site.ts` → `address` | empty (only the city is shown) |
| Instagram | `config/site.ts` → `social.instagram` | empty (hidden) |
| Google Analytics | `.env.local` → `NEXT_PUBLIC_GA_ID` | empty (tracking off) |
| Enquiry form service | `.env.local` → `NEXT_PUBLIC_FORM_ENDPOINT` | empty (Send enquiry opens the visitor's email app) |

### Prices not decided (shown as `[PRICE]`)

| Item | Where |
| --- | --- |
| GROW Starter, Growth and Pro monthly prices | `content/services.ts` → `growTiers[].priceMonthly` |
| "Website + 3 months of Grow" bundle | `content/services.ts` → `bundles[].priceFrom` |
| Booking system add-on | `content/plans.ts` → `addons` (`booking-system`) |
| All USD prices: Basic, Automation, E-commerce, QR ordering, booking system, care plan, Starter, Growth, Pro, bundle | `config/site.ts` → `currencyConfig.usdPrices` |

The INR prices that **are** filled in came from v1 and should be re-confirmed: Basic ₹12,000, Automation ₹30,000, E-commerce ₹75,000, QR ordering ₹15,000 + ₹999/month, care plan from ₹999/month (`content/plans.ts`).

### Content to confirm

| Item | Where | Note |
| --- | --- | --- |
| What each GROW tier includes | `content/services.ts` → `growTiers[].includes` | My suggested split, not agreed |
| "Why we started" | `content/home.ts` → `chapterOne.why` | Written for you; rewrite in your own words |
| Team bios | `content/home.ts` → `chapterOne.team` | Check each person is happy with theirs |
| Payment terms ("advance + balance before launch", monthly billing) | `content/faqs.ts` → "How do I pay?" | Match your real terms |
| Timelines (7 days / 14 days / 3–4 weeks) | `content/faqs.ts`, `content/plans.ts` | Carried over from v1 |
| Demo site URLs | `content/demos.ts` → `url` | `*.demo.questhunter.example`. Point them at live demos. |
| Demo screenshots | `content/demos.ts` → `image` | Illustrated previews until set |
| Team photos | `content/home.ts` → `photo` | Initials until set |
| Privacy policy and terms | `content/legal.ts` | Placeholder text. Have it reviewed; it is not legal advice. |
| 4 guides (all `draft: true`) | `content/guides.ts` | Review, then publish |
| Reviews, results, Google rating | `content/services.ts` → `trust` | Hidden (`showReviews: false`) until you have real ones |

## Design and decisions

**Look ("Midnight Atlas").** Night `#0b0f1a`, paper `#f7f5f0`, ember `#f97316` for fills (always with dark text on it) and `#c2410c` for orange text (passes contrast), and signal cyan `#22d3ee` for glows only. Dark mode follows the visitor's device setting.

**Fonts.** Headings use Fraunces (one weight, self-hosted, `display: optional` so it never causes layout shift). Body and mono text use the device's system fonts. We tested Geist: it pushed mobile LCP over 2.5 s and Geist Mono caused layout shift, so we switched to system fonts (approved).

**The book home page.** The home page reads like a book: cover → contents → Chapters I–IV → epilogue. The quest path (`components/book/QuestPath.tsx`) is a hand-built SVG, not a library. It:

- draws itself as you scroll;
- moves a glowing dot down the page;
- lights up each chapter's pin;
- shows "Chapter X of IV";
- recalculates on resize.

Chapters mark their position with `data-quest-anchor`.

**React Bits effects and their budget.** The effects are copied into `components/reactbits/` from the [React Bits](https://reactbits.dev) registry (`components.json` → `@react-bits`). The only new dependency is `motion`; there's no GSAP.

| Effect | Where | When it runs |
| --- | --- | --- |
| Aurora (WebGL) | Home cover background | Desktop with a mouse only, after the page has loaded. Phones get a static gradient. |
| DecryptedText | Home cover promise line | After load |
| ShinyText | Home cover kicker line (not the H1: it delayed LCP) | After load |
| BlurText | Chapter headings | After load, when scrolled into view |
| GlareHover | Contents entries | Always (CSS only) |
| SpotlightCard | Plan cards, Grow tiers, contact form | Always (via `components/effects/GlowCard.tsx`) |
| TiltedCard | Demo previews | Mouse/trackpad only, not touch |
| StarBorder + Magnet | Main "Start your quest" button on home and services | Desktop with a mouse only |
| ScrollStack | Build steps on `/how-it-works/` | Always, using normal page scroll |

Rules all effects follow:

- **Reduced motion:** if the visitor has "reduce motion" on, no effect runs and the plain text and images are shown.
- **Loading:** text effects load only after the page has finished loading (`lib/useMotionOK.ts`), so they never slow the first paint.
- **No JavaScript:** every word and photo is still in the HTML without JavaScript.
- **Adding an effect:** run `npx shadcn@latest add @react-bits/<Name>-TS-TW`, move the file into `components/reactbits/`, and wrap it the same way (lazy-load, motion check, plain fallback).

**Other decisions.**

- The commission calculator from v1 is removed. We don't take commission, so a calculator about it was off-message for a general agency.
- The site is a static export: no server, cheap hosting, nothing to break.
- Prices are never made up: anything undecided shows `[PRICE]`.
- Reviews stay hidden until they're real.
- The contact form needs a phone number and a business email, and has two buttons. **Send on WhatsApp** opens WhatsApp with the details filled in. **Send enquiry** posts the form to a form service (Formspree) if `NEXT_PUBLIC_FORM_ENDPOINT` is set; otherwise it opens the visitor's email app addressed to us. Indian numbers can be typed without +91, and international numbers need a `+` or `00`.
- To get enquiries straight to your inbox: create a free form at [formspree.io](https://formspree.io), set its URL as `NEXT_PUBLIC_FORM_ENDPOINT`, rebuild, then send one test enquiry and confirm it in Formspree.

## Tests

Browser tests run against the built site with [puppeteer-core](https://pptr.dev) and your installed Chrome.

```bash
npm run build
npm test
```

Chrome is found automatically in the usual install folders. If it isn't, set `CHROME_PATH` to `chrome.exe` (or Chromium/Edge):

```bash
CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe" npm test
```

| File | What it checks |
| --- | --- |
| `tests/site.test.mjs` | Crawls every page from the home page: no broken links, one H1, description length, short unique titles, canonical, OG image, valid JSON-LD, sitemap and robots, nav order, mobile menu |
| `tests/home.test.mjs` | Book structure, contents links, quest path (dot, drawing, chapter indicator, resize), effects on desktop, reduced-motion / phone / no-JavaScript fallbacks |
| `tests/pages.test.mjs` | Demo filters and URL sync, ₹/$ switch, `[PRICE]` placeholders, StarBorder desktop-only, contact form (required phone and email, both send buttons), FAQ groups, how-it-works steps, no sideways scroll at 390 px |
| `tests/analytics.test.mjs` | The 4 analytics events fire with the right parameters |

## Analytics events

When `NEXT_PUBLIC_GA_ID` is set, these GA4 events are sent:

| Event | When | Parameters |
| --- | --- | --- |
| `whatsapp_click` | Any WhatsApp button | `location` |
| `plan_click` | "Choose plan" on a plan card | `plan` |
| `demo_open` | "Open live demo" | `demo`, `category` |
| `form_submit` | Contact form sent | `plan`, `source`, `method` (`whatsapp` or `email`) |

## Deploy

### Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project** and import the repository. The framework is detected as Next.js automatically.
3. Add the environment variables from `.env.example` under **Settings → Environment Variables**.
4. Deploy, then connect your domain under **Settings → Domains**.

### Hostinger (or any static host)

1. Set `NEXT_PUBLIC_SITE_URL` (and `NEXT_PUBLIC_GA_ID`) in `.env.local`.
2. Run `npm run build`.
3. Upload the **contents** of the `out/` folder to `public_html` using Hostinger's File Manager (zip it, upload, extract) or FTP. Include the hidden `.htaccess` file: it sets caching, compression, the 404 page, HTTPS redirect and security headers.
4. Enable SSL for the domain in Hostinger before relying on the HTTPS redirect.
5. URLs end with a slash (`/demos/`) so every page works as a plain folder with an `index.html`.

## SEO checklist after launch

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain and rebuild. It's used in canonical links, `sitemap.xml`, `robots.txt`, Open Graph and structured data.
2. Add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://yourdomain/sitemap.xml`.
3. Link the website from your Google Business Profile.
4. Test a page's social preview by pasting its URL into a WhatsApp chat (the image is `/og.png`, generated from `app/og.png/route.tsx`).
5. Check structured data with Google's [Rich Results Test](https://search.google.com/test/rich-results).

## Performance notes

**Targets.** Mobile 90+, desktop 95+, accessibility, best practices and SEO all 100, LCP under 2.5 s, CLS 0.

**Last Lighthouse run** (static build, 2026-11-18):

- **Mobile performance:** 94–98.
- **Desktop performance:** 100 on every page.
- **Accessibility, best practices and SEO:** 100 (draft guides score 66 on SEO because they're `noindex` on purpose).
- **CLS:** 0 everywhere.

**Mobile LCP is 2.3–2.9 s, simulated.** Lighthouse estimates it for a slow phone by adding up all the JavaScript the page loads. In the browser, the headline actually appears in about 0.3 s. To bring the estimate down further, ship less JavaScript per page.

**Keeping the site fast:**

- No UI-library JavaScript for basics: the FAQ uses `<details>` and the mobile menu uses `<dialog>`.
- CSS is inlined into each page (`experimental.inlineCss`), so first paint doesn't wait for a stylesheet.
- Keep the H1 plain text. Don't put animated or gradient text effects on it.
- Load new effects after the page has loaded, like the existing ones (`useAfterLoad` in `lib/useMotionOK.ts`).

## Credits

Chapter photos are from [Unsplash](https://unsplash.com) (Unsplash License), by Arundhati Pathak, Avtar Singh, Hendrik Morkel and Akshat Jhingran. The credits are shown under each photo and stored in `content/home.ts`.

Visual effects adapted from [React Bits](https://reactbits.dev) (MIT + Commons Clause).
