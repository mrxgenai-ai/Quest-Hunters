"use client"

import { useEffect, useSyncExternalStore } from "react"
import { currencyConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type Currency = "inr" | "usd"
const KEY = "qh-currency"
const listeners = new Set<() => void>()

function read(): Currency {
  try {
    return localStorage.getItem(KEY) === "usd" ? "usd" : "inr"
  } catch {
    return "inr" // storage blocked
  }
}

function write(c: Currency) {
  try {
    localStorage.setItem(KEY, c)
  } catch {
    // ignore: the choice just won't be remembered
  }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

/** ₹ / $ toggle for <Price>. Remembers the choice in this browser only. */
export function CurrencySwitch({ className }: { className?: string }) {
  const cur = useSyncExternalStore(subscribe, read, () => "inr" as Currency)

  useEffect(() => {
    document.documentElement.classList.toggle("cur-usd", cur === "usd")
    return () => document.documentElement.classList.remove("cur-usd")
  }, [cur])

  if (!currencyConfig.usdEnabled) return null

  return (
    <fieldset className={cn("inline-flex rounded-full border bg-card p-1", className)}>
      <legend className="sr-only">Show prices in</legend>
      {(
        [
          ["inr", "₹ INR"],
          ["usd", "$ USD"],
        ] as const
      ).map(([c, label]) => (
        <button
          key={c}
          type="button"
          aria-pressed={cur === c}
          onClick={() => write(c)}
          className={cn(
            "h-9 rounded-full px-4 text-sm font-semibold transition-colors",
            cur === c ? "bg-ink text-white" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {label}
        </button>
      ))}
    </fieldset>
  )
}
