# Quest Hunter website

Marketing site for Quest Hunter, a web agency in Chhatrapati Sambhajinagar that builds websites for restaurants, cafes, cloud kitchens and resorts.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS 4**, exported as a **static site** (`out/` folder) so it can be hosted on Vercel, Hostinger or any static host.

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

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, e.g. `https://www.yourdomain.in`. Used for canonical links, Open Graph and structured data. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID (`G-XXXXXXX`). Leave empty to disable tracking. |

## Editing content

You don't need to touch components to change text, prices or contact details.

| What | File |
| --- | --- |
| WhatsApp number, phone, email, address, reply hours | `config/site.ts` |
| Navigation, hero text, footer links | `content/site.ts` |
| Plans, prices, QR add-on, care plan, form dropdown | `content/plans.ts` |
| Demo restaurants and their URLs | `content/demos.ts` |
| How it works, Why us, calculator, reviews, team, contact text | `content/home.ts` |
| FAQ | `content/faqs.ts` |
| City pages (`/website-development/<city>/`) | `content/cities.ts` — add an entry to create a new city page |
| Guides (`/guides/<slug>/`) | `content/guides.ts` — add an entry to publish a new guide |
| QR ordering page | `content/qrOrdering.ts` |
| Privacy & terms (placeholder text) | `content/legal.ts` |

### Guides and drafts

Guides marked `draft: true` are published on the site but tell search engines not to index them (`noindex`). Review the text, then set `draft: false` so Google can list them.

Write each city page's copy specifically for that city. Pages that only swap the city name can be treated as low-quality by search engines.

**Before launch**, replace every value marked `PLACEHOLDER` in `config/site.ts` and `content/demos.ts`.

### Reviews

The Results section shows an honest "coming soon" message until you have real reviews. To show them, fill in `trust.reviews`, `trust.results` and `trust.googleRating` in `content/home.ts`, then set `showReviews: true`. Only publish real reviews you have permission to use.

### Photos

Placeholders are drawn in code. To use real photos, put optimised `.webp` files in `public/images/` (about 1600px wide for large photos, under 200 KB) and pass the path:

- Team photos: set `photo: "/images/team/mudassir.webp"` in `content/home.ts`.
- Demo screenshots: set `image` on a demo in `content/demos.ts`.

## Analytics events

When `NEXT_PUBLIC_GA_ID` is set, these GA4 events are sent:

| Event | When | Parameters |
| --- | --- | --- |
| `whatsapp_click` | Any WhatsApp button | `location` |
| `plan_click` | "Choose plan" on a plan card | `plan` |
| `demo_open` | "Open live demo" | `demo`, `category` |
| `form_submit` | Contact form sent | `plan`, `source` |

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

The sitemap lists every page except draft guides. Publish a guide (set `draft: false`) and rebuild to add it.

## Performance notes

- No UI library JavaScript: the FAQ uses `<details>` and the mobile menu uses `<dialog>`.
- CSS is inlined into each page (`experimental.inlineCss`), so the first paint doesn't wait for a stylesheet.
- Fonts are self-hosted by `next/font`. The heading font loads one weight only. The ₹ sign is drawn with the device font (see `app/globals.css`) to avoid downloading extra font files.
- Keep photos as `.webp`, under ~200 KB, sized for where they appear.
