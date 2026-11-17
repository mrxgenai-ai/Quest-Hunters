// Shared helpers for the browser tests: a tiny static server for out/ and a
// Chrome launcher. Run `npm run build` first, then `npm test`.
import { existsSync, readFileSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, normalize } from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer-core"

const OUT = fileURLToPath(new URL("../out/", import.meta.url))

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
}

/** Serves out/ the way a static host does (folders → index.html, 404.html otherwise). */
export function startServer() {
  if (!existsSync(join(OUT, "index.html"))) {
    throw new Error("out/ is missing. Run `npm run build` before `npm test`.")
  }
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname)
    let file = normalize(join(OUT, path))
    if (!file.startsWith(normalize(OUT))) {
      res.writeHead(403).end()
      return
    }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html")
    if (!existsSync(file)) {
      res.writeHead(404, { "content-type": TYPES[".html"] }).end(readFileSync(join(OUT, "404.html")))
      return
    }
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file))
  })
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address()
      resolve({ base: `http://127.0.0.1:${port}`, close: () => new Promise((r) => server.close(r)) })
    })
  })
}

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean)

/** Launches the installed Chrome (set CHROME_PATH if it's somewhere else). */
export function launch() {
  const executablePath = CHROME_PATHS.find((p) => existsSync(p))
  if (!executablePath) throw new Error("Chrome not found. Set CHROME_PATH to your Chrome or Chromium executable.")
  return puppeteer.launch({
    executablePath,
    headless: true,
    // Software WebGL so the cover's Aurora background can render in headless mode.
    args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
  })
}

export const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export const DESKTOP = { width: 1366, height: 860 }
export const PHONE = { width: 390, height: 844, isMobile: true, hasTouch: true }

/** Opens a page, waits for the network to settle and turns off smooth scrolling. */
export async function open(browser, url, { viewport = DESKTOP, media = [], js = true } = {}) {
  const page = await browser.newPage()
  page.errors = []
  page.on("pageerror", (e) => page.errors.push(e.message))
  page.on("console", (m) => m.type() === "error" && page.errors.push(m.text()))
  await page.setJavaScriptEnabled(js)
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }, ...media])
  await page.setViewport(viewport)
  await page.goto(url, { waitUntil: "networkidle0" })
  // Smooth scrolling never "finishes" in headless Chrome, so jump instead.
  if (js) await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" })
  return page
}

/** Scrolls so `selector` sits `offset` px from the top of the viewport. */
export function scrollTo(page, selector, offset = 80) {
  return page.evaluate(
    (s, o) => {
      const el = document.querySelector(s)
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o, behavior: "instant" })
    },
    selector,
    offset,
  )
}

/** Clicks the first button whose text starts with `text`. */
export function clickButton(page, text) {
  return page.evaluate((t) => {
    const b = [...document.querySelectorAll("button")].find((x) => x.textContent.trim().startsWith(t))
    if (!b) throw new Error(`No button starting with "${t}"`)
    b.click()
  }, text)
}
