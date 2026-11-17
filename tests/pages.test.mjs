// Inner pages: demos filters, currency switch, contact form, FAQ, effects and
// their touch / reduced-motion fallbacks, and no sideways scroll on phones.
import assert from "node:assert/strict"
import { after, before, describe, it } from "node:test"
import { clickButton, launch, open, PHONE, scrollTo, startServer, wait } from "./helpers.mjs"

let server, browser
before(async () => {
  server = await startServer()
  browser = await launch()
})
after(async () => {
  await browser?.close()
  await server?.close()
})

const visibleDemos = (page) =>
  page.$$eval("#demo-grid > li", (ls) => ls.filter((l) => !l.hidden).map((l) => `${l.dataset.type}/${l.dataset.plan}`))

describe("demos", () => {
  it("filters by business type and plan, and syncs the URL", async () => {
    const page = await open(browser, server.base + "/demos/")
    assert.equal((await visibleDemos(page)).length, 4)
    await clickButton(page, "Restaurant")
    assert.deepEqual(await visibleDemos(page), ["restaurant/automation"])
    assert.equal(await page.evaluate(() => location.hash), "#type=restaurant")
    await clickButton(page, "Basic")
    assert.deepEqual(await visibleDemos(page), [])
    assert.ok(await page.evaluate(() => document.body.innerText.includes("No demo matches both filters")))
    await clickButton(page, "Show all demos")
    assert.equal((await visibleDemos(page)).length, 4)
    await page.close()
  })

  it("opens pre-filtered from a plan card link", async () => {
    const page = await open(browser, server.base + "/demos/#plan=automation")
    assert.deepEqual(await visibleDemos(page), ["electronics/automation", "restaurant/automation"])
    await page.close()
  })

  it("keeps the fictional demo note", async () => {
    const page = await open(browser, server.base + "/demos/")
    assert.ok(await page.evaluate(() => document.body.innerText.includes("fictional demo businesses")))
    await page.close()
  })

  it("tilts previews only with a mouse", async () => {
    const desk = await open(browser, server.base + "/demos/")
    await wait(3000)
    assert.ok(await desk.$(".tilted-card"), "tilt on desktop")
    await desk.close()
    const phone = await open(browser, server.base + "/demos/", { viewport: PHONE })
    await wait(3000)
    assert.equal(await phone.$(".tilted-card"), null, "no tilt on touch")
    await phone.close()
  })
})

describe("services", () => {
  const shown = (page, scope) =>
    page.$$eval(`${scope} [data-cur]`, (els) => els.filter((e) => getComputedStyle(e).display !== "none").map((e) => e.textContent.trim()))

  it("shows INR by default and [PRICE] placeholders for undecided prices", async () => {
    const page = await open(browser, server.base + "/services/")
    assert.ok((await shown(page, "#build")).some((t) => t.startsWith("₹12,000")))
    const tiers = await page.$$eval('#grow article [data-cur="inr"]', (els) => els.map((e) => e.textContent.trim()))
    assert.equal(tiers.length, 3)
    for (const t of tiers) assert.match(t, /\[PRICE\]/)
    await page.close()
  })

  it("switches to USD and remembers the choice", async () => {
    const page = await open(browser, server.base + "/services/")
    await clickButton(page, "$ USD")
    for (const t of await shown(page, "#build")) assert.ok(t.startsWith("$"), t)
    await page.reload({ waitUntil: "networkidle0" })
    for (const t of await shown(page, "#build")) assert.ok(t.startsWith("$"), t)
    await clickButton(page, "₹ INR")
    await page.close()
  })

  it("links to QR ordering and has the Build, Grow and add-on sections", async () => {
    const page = await open(browser, server.base + "/services/")
    for (const id of ["#build", "#grow", "#add-ons", "#who-we-work-with"]) assert.ok(await page.$(id), id)
    assert.ok(await page.$('a[href="/qr-ordering/"]'))
    await page.close()
  })

  it("adds the star border to the main button on desktop only", async () => {
    const desk = await open(browser, server.base + "/services/")
    await wait(3000)
    await scrollTo(desk, "#services-cta-title", 300)
    assert.ok(await desk.$('section[aria-labelledby="services-cta-title"] a[href="/contact/"] canvas'), "StarBorder canvas")
    await desk.close()
    for (const opts of [{ viewport: PHONE }, { media: [{ name: "prefers-reduced-motion", value: "reduce" }] }]) {
      const page = await open(browser, server.base + "/services/", opts)
      await wait(3000)
      assert.equal(await page.$('section[aria-labelledby="services-cta-title"] a[href="/contact/"] canvas'), null)
      await page.close()
    }
  })
})

describe("contact", () => {
  it("requires phone and email, offers Grow services and has two send buttons", async () => {
    const page = await open(browser, server.base + "/contact/")
    assert.deepEqual(await page.$$eval("form [required]", (els) => els.map((e) => e.name)), ["phone", "email"])
    const options = await page.$$eval("select[name=plan] option", (os) => os.map((o) => o.value))
    assert.ok(options.includes("Grow: social media") && options.includes("Grow: WhatsApp automation"))
    const buttons = await page.$$eval("form button[type=submit]", (bs) => bs.map((b) => b.textContent.trim()))
    assert.deepEqual(buttons, ["Send on WhatsApp", "Send enquiry"])
    await page.close()
  })

  it("checks phone and email, accepts Indian and international numbers and opens WhatsApp", async () => {
    const page = await open(browser, server.base + "/contact/")
    await page.evaluate(() => {
      window.__opened = []
      window.open = (u) => (window.__opened.push(u), {})
    })
    const send = async (phone) => {
      await page.$eval("input[name=phone]", (i) => (i.value = ""))
      await page.type("input[name=phone]", phone)
      await page.click('form button[value="whatsapp"]')
    }
    await send("12345")
    assert.equal(await page.$eval("input[name=phone]", (i) => i.getAttribute("aria-invalid")), "true")
    assert.equal(await page.$eval("input[name=email]", (i) => i.getAttribute("aria-invalid")), "true", "empty email blocks sending")
    assert.equal(await page.evaluate(() => window.__opened.length), 0)

    await page.type("input[name=business]", "Test Ltd")
    await page.select("select[name=plan]", "Grow: social media")
    await page.type("input[name=email]", "owner@test")
    await send("+44 7700 900123")
    assert.equal(await page.$eval("input[name=email]", (i) => i.getAttribute("aria-invalid")), "true", "bad email blocks sending")
    assert.equal(await page.evaluate(() => window.__opened.length), 0)
    await page.type("input[name=email]", ".ltd.com")
    await send("+44 7700 900123")
    await send("98765 43210")
    const texts = await page.evaluate(() => window.__opened.map((u) => decodeURIComponent(u.split("text=")[1])))
    assert.match(texts[0], /Phone: \+447700900123/)
    assert.match(texts[0], /Business: Test Ltd/)
    assert.match(texts[0], /Email: owner@test\.ltd\.com/)
    assert.match(texts[0], /Interested in: Grow: social media/)
    assert.match(texts[1], /Phone: \+91 98765 43210/)
    assert.ok(await page.evaluate(() => document.body.innerText.includes("Krishna will WhatsApp you")))
    await page.close()
  })

  it("Send enquiry falls back to an email when no form service is set", async () => {
    const page = await open(browser, server.base + "/contact/")
    await page.type("input[name=phone]", "98765 43210")
    await page.type("input[name=email]", "owner@test.com")
    await page.click('form button[value="email"]')
    await wait(300)
    assert.ok(await page.evaluate(() => document.body.innerText.includes("Your email app should open")))
    await page.close()
  })

  it("shows local and worldwide reach", async () => {
    const page = await open(browser, server.base + "/contact/")
    assert.ok(await page.evaluate(() => document.body.innerText.includes("remote worldwide")))
    await page.close()
  })
})

describe("faq", () => {
  it("groups questions into four topics", async () => {
    const page = await open(browser, server.base + "/faq/")
    const groups = await page.$$eval("main section[id] h2", (h) => h.map((x) => x.textContent))
    assert.deepEqual(groups, ["Websites", "Marketing & automation", "Payments & GST", "International clients"])
    await page.close()
  })
})

describe("how it works", () => {
  it("shows the four build steps and the monthly Grow cycle", async () => {
    const page = await open(browser, server.base + "/how-it-works/")
    const steps = await page.$$eval("#build-process h3", (h) => h.map((x) => x.textContent))
    assert.deepEqual(steps, ["15-minute call", "Proposal in 24 hours", "Build & review", "Launch"])
    const cycle = await page.$$eval("#grow-cycle h3", (h) => h.map((x) => x.textContent))
    assert.deepEqual(cycle, ["Plan", "Create", "Schedule & automate", "Report"])
    await page.close()
  })
})

describe("phones", () => {
  for (const path of ["/", "/services/", "/demos/", "/how-it-works/", "/contact/", "/faq/", "/qr-ordering/", "/website-development/pune/"]) {
    it(`no sideways scroll at 390px on ${path}`, async () => {
      const page = await open(browser, server.base + path, { viewport: PHONE })
      assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 390)
      await page.close()
    })
  }
})
