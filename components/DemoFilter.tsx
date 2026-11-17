"use client"

import { useCallback, useEffect, useState } from "react"
import { businessTypes, demoPlans, demosPage } from "@/content/demos"
import { cn } from "@/lib/utils"

type State = { type: string; plan: string }
const ALL = "all"

/** Reads deep links like /demos/#type=clothing&plan=ecommerce (also #plan=basic). */
function fromHash(hash: string): State {
  const p = new URLSearchParams(hash.replace(/^#/, ""))
  const type = p.get("type") ?? ALL
  const plan = p.get("plan") ?? ALL
  return {
    type: businessTypes.some((t) => t.id === type) ? type : ALL,
    plan: demoPlans.some((x) => x.id === plan) ? plan : ALL,
  }
}

function toHash({ type, plan }: State) {
  const p = new URLSearchParams()
  if (type !== ALL) p.set("type", type)
  if (plan !== ALL) p.set("plan", plan)
  const s = p.toString()
  return s ? `#${s}` : ""
}

function Chips({
  label,
  options,
  value,
  counts,
  gridId,
  onChoose,
}: {
  label: string
  options: { id: string; label: string }[]
  value: string
  counts: Record<string, number>
  gridId: string
  onChoose: (id: string) => void
}) {
  const all = [{ id: ALL, label: demosPage.filters.all }, ...options]
  return (
    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <p id={`${gridId}-${label}`} className="w-32 shrink-0 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </p>
      <div
        role="group"
        aria-labelledby={`${gridId}-${label}`}
        className="-mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {all.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            aria-controls={gridId}
            onClick={() => onChoose(o.id)}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors",
              value === o.id ? "border-ink bg-ink text-white" : "border-input bg-card hover:bg-muted",
            )}
          >
            {o.label}
            <span className={cn("text-xs tabular-nums", value === o.id ? "text-white/70" : "text-muted-foreground")}>
              {counts[o.id] ?? 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Two filter rows (business type, plan) for the demo grid. The cards are
 * server-rendered and all visible without JS; this only toggles `hidden`.
 */
export function DemoFilter({
  gridId,
  typeCounts,
  planCounts,
}: {
  gridId: string
  typeCounts: Record<string, number>
  planCounts: Record<string, number>
}) {
  const [state, setState] = useState<State>({ type: ALL, plan: ALL })
  const [shown, setShown] = useState<number | null>(null)

  const apply = useCallback(
    (s: State) => {
      setState(s)
      let n = 0
      document.querySelectorAll<HTMLElement>(`#${gridId} > [data-type]`).forEach((el) => {
        const match = (s.type === ALL || el.dataset.type === s.type) && (s.plan === ALL || el.dataset.plan === s.plan)
        el.hidden = !match
        if (match) n++
      })
      setShown(n)
    },
    [gridId],
  )

  useEffect(() => {
    const sync = () => apply(fromHash(window.location.hash))
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [apply])

  function choose(next: State) {
    apply(next)
    history.replaceState(null, "", `${window.location.pathname}${toHash(next)}`)
  }

  return (
    <div className="grid min-w-0 gap-4">
      <Chips
        label={demosPage.filters.typeLabel}
        options={businessTypes}
        value={state.type}
        counts={typeCounts}
        gridId={gridId}
        onChoose={(type) => choose({ ...state, type })}
      />
      <Chips
        label={demosPage.filters.planLabel}
        options={demoPlans}
        value={state.plan}
        counts={planCounts}
        gridId={gridId}
        onChoose={(plan) => choose({ ...state, plan })}
      />
      <p className="sr-only" aria-live="polite">
        {shown === null ? "" : `Showing ${shown} demo${shown === 1 ? "" : "s"}`}
      </p>
      {shown === 0 && (
        <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
          No demo matches both filters yet.{" "}
          <button type="button" onClick={() => choose({ type: ALL, plan: ALL })} className="font-semibold text-brand-strong underline underline-offset-4">
            Show all demos
          </button>
        </p>
      )}
    </div>
  )
}
