// Site-wide checks: every page reachable, no broken internal links, unique
// titles and descriptions, one H1, canonical URLs, valid JSON-LD, sitemap and
// robots, navigation order, social image.
import assert from "node:assert/strict"
import { after, before, describe, it } from "node:test"
import { launch, open, startServer } from "./helpers.mjs"

let server, browser
const pages = new Map()

before(async () => {
  server = await startServer()
  browser = await launch()

  // Crawl from the home page through every internal link.
  const queue = ["/"]
  const page = await browser.newPage()
  while (queue.length) {
    const path = queue.shift()
    if (pages.has(path)) continue
    const res = await page.goto(server.base + path, { waitUntil: "domcontentloaded" })
    const info = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
      robots: document.querySelector('meta[name="robots"]')?.content ?? "",
      ogImage: document.querySelector('meta[property="og:image"]')?.content ?? "",
      h1: document.querySelectorAll("h1").length,
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
    }))
    pages.set(path, { status: res?.status() ?? 0, ...info })
    for (const href of info.links) {
      if (!href.startsWith("/")) continue
      const next = href.split("#")[0]
      if (next && !pages.has(next) && !queue.includes(next)) queue.push(next)
    }
  }
  await page.close()
})

after(async () => {
  await browser?.close()
  await server?.close()
})

describe("crawl", () => {
  it("reaches every main page", () => {
    for (const p of ["/", "/services/", "/demos/", "/how-it-works/", "/contact/", "/faq/", "/qr-ordering/", "/guides/", "/privacy/", "/terms/"]) {
      assert.ok(pages.has(p), `${p} is not linked from anywhere`)
    }
  })

  it("has no broken internal links", () => {
    const broken = [...pages].filter(([, p]) => p.status !== 200).map(([path, p]) => `${path} → ${p.status}`)
    assert.deepEqual(broken, [])
  })

  it("gives every page one H1, a description and a canonical URL to itself", () => {
    for (const [path, p] of pages) {
      assert.equal(p.h1, 1, `${path}: ${p.h1} H1s`)
      assert.ok(p.description.length >= 70 && p.description.length <= 160, `${path}: description is ${p.description.length} characters`)
      assert.ok(p.canonical.endsWith(path), `${path}: canonical ${p.canonical}`)
      assert.ok(p.ogImage.endsWith("/og.png"), `${path}: og:image ${p.ogImage}`)
    }
  })

  it("keeps titles short and unique", () => {
    const seen = new Map()
    for (const [path, p] of pages) {
      assert.ok(p.title.length <= 75, `${path}: title is ${p.title.length} characters: ${p.title}`)
      assert.ok(!seen.has(p.title), `${path} and ${seen.get(p.title)} share the title "${p.title}"`)
      seen.set(p.title, path)
    }
  })

  it("has unique descriptions", () => {
    const seen = new Map()
    for (const [path, p] of pages) {
      assert.ok(!seen.has(p.description), `${path} and ${seen.get(p.description)} share a description`)
      seen.set(p.description, path)
    }
  })

  it("has valid JSON-LD on every page", () => {
    for (const [path, p] of pages) for (const json of p.jsonLd) assert.doesNotThrow(() => JSON.parse(json), `${path}: invalid JSON-LD`)
  })

  it("puts the right structured data on key pages", () => {
    const types = (path) =>
      pages.get(path).jsonLd.flatMap((j) => {
        const d = JSON.parse(j)
        return [d["@type"], ...(d["@graph"] ?? []).map((g) => g["@type"])].flat().filter(Boolean)
      })
    assert.ok(types("/").includes("Organization"), "home: Organization")
    assert.ok(types("/services/").includes("Service"), "services: Service")
    assert.ok(types("/faq/").includes("FAQPage"), "faq: FAQPage")
    assert.ok(types("/how-it-works/").includes("HowTo"), "how-it-works: HowTo")
    assert.ok(types("/demos/").includes("CollectionPage"), "demos: CollectionPage")
    for (const p of ["/services/", "/demos/", "/how-it-works/", "/contact/", "/faq/"]) assert.ok(types(p).includes("BreadcrumbList"), `${p}: BreadcrumbList`)
  })

  it("marks draft guides noindex and keeps them out of the sitemap", async () => {
    const res = await fetch(server.base + "/sitemap.xml")
    const xml = await res.text()
    for (const [path, p] of pages) {
      if (!path.startsWith("/guides/") || path === "/guides/") continue
      const listed = xml.includes(`${path}</loc>`)
      if (p.robots.includes("noindex")) assert.ok(!listed, `${path} is noindex but in the sitemap`)
      else assert.ok(listed, `${path} is indexable but missing from the sitemap`)
    }
  })

  it("lists every indexable page in the sitemap", async () => {
    const xml = await (await fetch(server.base + "/sitemap.xml")).text()
    const listed = [...xml.matchAll(/<loc>[^<]*?(\/[^<]*)<\/loc>/g)].map((m) => new URL(m[0].replace(/<\/?loc>/g, "")).pathname)
    for (const [path, p] of pages) if (!p.robots.includes("noindex")) assert.ok(listed.includes(path), `${path} missing from sitemap`)
    for (const path of listed) assert.ok(pages.has(path), `sitemap lists ${path}, which no page links to`)
  })

  it("serves robots.txt pointing at the sitemap", async () => {
    const txt = await (await fetch(server.base + "/robots.txt")).text()
    assert.match(txt, /Sitemap: .*\/sitemap\.xml/)
  })

  it("serves a 1200×630 social image", async () => {
    const res = await fetch(server.base + "/og.png")
    assert.equal(res.status, 200)
    const buf = Buffer.from(await res.arrayBuffer())
    assert.equal(buf.readUInt32BE(16), 1200)
    assert.equal(buf.readUInt32BE(20), 630)
  })
})

describe("navigation", () => {
  it("shows Services · Demos · How it works · Contact · FAQ and a Start your quest button", async () => {
    const page = await open(browser, server.base + "/")
    const nav = await page.$$eval('nav[aria-label="Main"] a', (as) => as.map((a) => a.textContent.trim()))
    assert.deepEqual(nav, ["Services", "Demos", "How it works", "Contact", "FAQ"])
    const cta = await page.$eval('header a[href="/contact/"]:not(nav a)', (a) => a.textContent.trim())
    assert.equal(cta, "Start your quest")
    await page.close()
  })

  it("has the same links in the mobile menu", async () => {
    const page = await open(browser, server.base + "/", { viewport: { width: 390, height: 844, isMobile: true, hasTouch: true } })
    await page.click('button[aria-label="Open menu"]')
    const links = await page.$$eval('dialog nav a', (as) => as.map((a) => a.textContent.trim()))
    assert.deepEqual(links, ["Services", "Demos", "How it works", "Contact", "FAQ", "Start your quest"])
    await page.close()
  })
})
