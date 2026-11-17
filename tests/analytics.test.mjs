// GA4 events: whatsapp_click, plan_click, demo_open, form_submit.
// A stub gtag records events, so this works without a real GA ID.
import assert from "node:assert/strict"
import { after, before, describe, it } from "node:test"
import { launch, startServer } from "./helpers.mjs"

let server, browser
before(async () => {
  server = await startServer()
  browser = await launch()
})
after(async () => {
  await browser?.close()
  await server?.close()
})

async function openWithStub(path) {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => {
    window.__events = []
    window.gtag = (...args) => window.__events.push(args)
    window.open = () => ({})
  })
  await page.setViewport({ width: 1366, height: 860 })
  await page.goto(server.base + path, { waitUntil: "networkidle0" })
  // Stop link clicks from navigating away so the recorded events can be read.
  await page.evaluate(() => document.addEventListener("click", (e) => e.target.closest("a") && e.preventDefault()))
  return page
}

const events = (page) => page.evaluate(() => window.__events.filter((e) => e[0] === "event").map((e) => [e[1], e[2]]))

describe("analytics events", () => {
  it("whatsapp_click with location", async () => {
    const page = await openWithStub("/contact/")
    await page.click('a[href^="https://wa.me/"]')
    assert.deepEqual((await events(page))[0], ["whatsapp_click", { location: "contact_page" }])
    await page.close()
  })

  it("plan_click with plan id", async () => {
    const page = await openWithStub("/services/")
    await page.$eval('#build [aria-labelledby="plan-automation"] a[href^="https://wa.me/"]', (a) => a.click())
    await page.$eval('#grow [aria-labelledby="tier-growth"] a[href^="https://wa.me/"]', (a) => a.click())
    assert.deepEqual(await events(page), [
      ["plan_click", { plan: "automation" }],
      ["plan_click", { plan: "grow_growth" }],
    ])
    await page.close()
  })

  it("demo_open with demo, category and plan", async () => {
    const page = await openWithStub("/demos/")
    await page.$eval('#demo-grid li[data-type="clothing"] a[target="_blank"]', (a) => a.click())
    assert.deepEqual((await events(page))[0], ["demo_open", { demo: "threadline", category: "clothing", plan: "ecommerce" }])
    await page.close()
  })

  it("form_submit with plan, source and method", async () => {
    const page = await openWithStub("/contact/")
    await page.type("input[name=phone]", "98765 43210")
    await page.type("input[name=email]", "owner@test.com")
    await page.select("select[name=plan]", "Website: Automation")
    await page.click('form button[value="whatsapp"]')
    assert.deepEqual((await events(page)).at(-1), ["form_submit", { plan: "Website: Automation", source: "contact_page", method: "whatsapp" }])
    await page.close()
  })
})
