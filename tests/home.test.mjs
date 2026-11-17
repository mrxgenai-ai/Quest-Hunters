// The home page "book": contents links, quest path, effects and their fallbacks.
import assert from "node:assert/strict"
import { after, before, describe, it } from "node:test"
import { launch, open, PHONE, scrollTo, startServer, wait } from "./helpers.mjs"

let server, browser
before(async () => {
  server = await startServer()
  browser = await launch()
})
after(async () => {
  await browser?.close()
  await server?.close()
})

const PROMISE = "We build your website and grow your business online."
const dotY = (page) =>
  page.$eval("[data-quest-dot]", (g) => Number((g.getAttribute("transform") ?? "").match(/translate\(\S+ (\S+)\)/)?.[1] ?? -1))
const dashOffset = (page) => page.$eval("[data-quest-path] path:nth-of-type(2)", (p) => parseFloat(p.style.strokeDashoffset))
const indicator = (page) => page.$eval("[data-quest-indicator]", (e) => e.textContent)

describe("book structure", () => {
  it("has a cover, contents and four chapters with Roman numerals", async () => {
    const page = await open(browser, server.base + "/")
    assert.equal(await page.$eval("h1", (h) => h.textContent), "Quest Hunter")
    const chapters = await page.$$eval("section[data-chapter]", (s) => s.map((x) => x.dataset.chapter))
    assert.deepEqual(chapters, ["I", "II", "III", "IV"])
    const running = await page.$$eval("section[data-chapter] > p:first-child", (p) => p.map((x) => x.textContent.replace(/\s+/g, " ").trim()))
    assert.match(running[1], /^Quest Hunter · Chapter II\s*p\. 02$/)
    await page.close()
  })

  it("links every contents entry to its chapter", async () => {
    const page = await open(browser, server.base + "/")
    const hrefs = await page.$$eval("#contents ol a", (as) => as.map((a) => a.getAttribute("href")))
    assert.deepEqual(hrefs, ["#who-we-are", "#what-we-provide", "#how-the-quest-works", "#begin-your-quest"])
    for (const href of hrefs) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }))
      await page.click(`#contents a[href="${href}"]`)
      await wait(300)
      const top = await page.$eval(href, (el) => el.getBoundingClientRect().top)
      assert.ok(top > -5 && top < 140, `${href} landed at ${top}px`)
    }
    await page.close()
  })
})

describe("quest path", () => {
  it("draws the path, moves the dot and highlights the current chapter as you scroll", async () => {
    const page = await open(browser, server.base + "/")
    assert.equal(await page.$$eval("[data-pin]", (g) => g.length), 4)

    await scrollTo(page, "#who-we-are [data-quest-anchor]", 380)
    await wait(400)
    const y1 = await dotY(page)
    const o1 = await dashOffset(page)
    assert.equal(await indicator(page), "Chapter I of IV")
    assert.deepEqual(await page.$$eval("[data-pin][data-active]", (g) => g.map((x) => x.dataset.pin)), ["who-we-are"])

    await scrollTo(page, "#how-the-quest-works [data-quest-anchor]", 380)
    await wait(400)
    assert.ok((await dotY(page)) > y1 + 300, "dot moved down")
    assert.ok((await dashOffset(page)) < o1, "more of the accent path is drawn")
    assert.equal(await indicator(page), "Chapter III of IV")

    await scrollTo(page, "#begin-your-quest [data-quest-anchor]", 380)
    await wait(400)
    assert.equal(await indicator(page), "Chapter IV of IV")
    await page.close()
  })

  it("hides the chapter indicator on the cover", async () => {
    const page = await open(browser, server.base + "/")
    const opacity = await page.$eval("[data-quest-indicator]", (e) => getComputedStyle(e).opacity)
    assert.equal(opacity, "0")
    await page.close()
  })

  it("recomputes when the window is resized", async () => {
    const page = await open(browser, server.base + "/")
    const before = await page.$eval("[data-pin='begin-your-quest']", (g) => g.getAttribute("transform"))
    await page.setViewport({ width: 900, height: 860 })
    await wait(500)
    const after = await page.$eval("[data-pin='begin-your-quest']", (g) => g.getAttribute("transform"))
    assert.notEqual(after, before)
    await page.close()
  })
})

describe("effects on a desktop with motion allowed", () => {
  it("mounts the Aurora background, decrypts the promise and blurs in headings", async () => {
    const page = await open(browser, server.base + "/")
    await wait(4000)
    assert.ok(await page.$(".cover-aurora canvas"), "Aurora canvas")
    assert.equal(await page.$eval("#cover-title + p .sr-only", (e) => e.textContent), PROMISE)
    await scrollTo(page, "#begin-your-quest h2", 300)
    await wait(1200)
    assert.ok(await page.$("#begin-your-quest h2 .blur-text"), "BlurText heading")
    assert.ok(await page.$eval("#begin-your-quest [data-reveal='circle']", (d) => d.classList.contains("is-visible")), "photo revealed")
    assert.deepEqual(page.errors, [])
    await page.close()
  })
})

describe("fallbacks", () => {
  it("reduced motion: no WebGL, plain text, no clipping, path still works", async () => {
    const page = await open(browser, server.base + "/", { media: [{ name: "prefers-reduced-motion", value: "reduce" }] })
    await wait(3500)
    assert.equal(await page.$(".cover-aurora"), null)
    assert.equal(await page.$(".blur-text"), null)
    assert.equal(await page.$eval("#cover-title + p", (e) => e.textContent), PROMISE)
    assert.equal(await page.$eval("[data-reveal='circle'] > *", (e) => getComputedStyle(e).clipPath), "none")
    assert.equal(await page.$$eval("[data-pin]", (g) => g.length), 4)
    await page.close()
  })

  it("phone: static cover gradient instead of WebGL, no sideways scroll", async () => {
    const page = await open(browser, server.base + "/", { viewport: PHONE })
    await wait(3500)
    assert.equal(await page.$(".cover-aurora"), null)
    assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 390)
    await page.close()
  })

  it("no JavaScript: all text and photos are there", async () => {
    const page = await open(browser, server.base + "/", { js: false })
    const h2 = await page.$$eval("section[data-chapter] h2", (h) => h.map((x) => x.textContent.replace(/\s+/g, " ").trim()))
    assert.deepEqual(h2, ["Chapter I: Who we are", "Chapter II: What we provide", "Chapter III: How the quest works", "Chapter IV: Begin your quest"])
    assert.equal(await page.$eval("#cover-title + p", (e) => e.textContent), PROMISE)
    assert.equal(await page.$eval("[data-reveal='circle'] > *", (e) => getComputedStyle(e).clipPath), "none")
    await page.close()
  })
})
