"use client"

type EventName = "whatsapp_click" | "plan_click" | "demo_open" | "form_submit"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Sends a GA4 event. Does nothing when GA isn't configured or is blocked. */
export function track(event: EventName, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", event, params)
}
