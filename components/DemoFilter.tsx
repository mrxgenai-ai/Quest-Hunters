"use client"

import { useCallback, useEffect, useState } from "react"
import { categorySlug, demoCategories, type DemoCategory } from "@/content/demos"
import { cn } from "@/lib/utils"

type Filter = "All" | DemoCategory

const fromHash = (hash: string): Filter =>
  (Object.entries(categorySlug).find(([, slug]) => `#${slug}` === hash)?.[0] as DemoCategory | undefined) ?? "All"

/**
 * Filter chips for the demo grid. The cards themselves are server-rendered
 * (all visible without JS); this only toggles their `hidden` attribute.
 */
export function DemoFilter({ gridId, counts }: { gridId: string; counts: Record<Filter, number> }) {
  const [active, setActive] = useState<Filter>("All")

  const apply = useCallback(
    (f: Filter) => {
      setActive(f)
      document.querySelectorAll<HTMLElement>(`#${gridId} > [data-category]`).forEach((el) => {
        el.hidden = f !== "All" && el.dataset.category !== f
      })
    },
    [gridId],
  )

  // Support deep links like /demos/#automation (used by the plan cards).
  useEffect(() => {
    const sync = () => apply(fromHash(window.location.hash))
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [apply])

  function choose(f: Filter) {
    apply(f)
    const hash = f === "All" ? "" : `#${categorySlug[f]}`
    history.replaceState(null, "", `${window.location.pathname}${hash}`)
  }

  return (
    <div>
      <div role="group" aria-label="Filter demos by plan" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {demoCategories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            aria-controls={gridId}
            onClick={() => choose(c)}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors",
              active === c ? "border-ink bg-ink text-white" : "border-input bg-card hover:bg-muted",
            )}
          >
            {c}
            <span className={cn("text-xs tabular-nums", active === c ? "text-white/70" : "text-muted-foreground")}>
              {counts[c]}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {active === "All" ? `Showing all ${counts.All} demos` : `Showing ${counts[active]} ${active} demo${counts[active] === 1 ? "" : "s"}`}
      </p>
    </div>
  )
}
