"use client"

import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}

/**
 * true once the page is running in the browser AND the visitor hasn't asked
 * for reduced motion. Always false during the static render, so the HTML
 * contains plain, readable text.
 */
export function useMotionOK() {
  return useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(QUERY).matches,
    () => false,
  )
}

/** true in the browser when a media query matches (false in the static HTML). */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

let idleDone = false
let idleScheduled = false
const idleListeners = new Set<() => void>()

function whenIdle() {
  if (idleDone || idleScheduled || typeof window === "undefined") return
  idleScheduled = true
  const fire = () => {
    idleDone = true
    idleListeners.forEach((l) => l())
  }
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(fire, { timeout: 2500 })
    else window.setTimeout(fire, 600)
  }
  if (document.readyState === "complete") schedule()
  else window.addEventListener("load", schedule, { once: true })
}

/**
 * true once the page has fully loaded and the browser is idle. Effects that
 * pull in extra JavaScript wait for this, so they never compete with the
 * first paint (keeps LCP fast on slow phones).
 */
export function useAfterLoad() {
  return useSyncExternalStore(
    (cb) => {
      idleListeners.add(cb)
      whenIdle()
      return () => idleListeners.delete(cb)
    },
    () => idleDone,
    () => false,
  )
}
