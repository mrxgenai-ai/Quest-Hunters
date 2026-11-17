"use client"

import { useEffect, useRef, useState } from "react"

type Pin = { id: string; numeral: string; x: number; y: number }

/**
 * The "quest path": a winding route drawn down the side of the book.
 *
 * - A grey dashed base path, plus an ember copy that is revealed with
 *   stroke-dashoffset as you scroll.
 * - A glowing cyan dot sits where the path is level with the middle of the
 *   viewport.
 * - Chapter numerals are pinned to the path; the current one is highlighted
 *   and a "Chapter II of IV" indicator follows you.
 *
 * Measures its parent (the element with the chapters) with a ResizeObserver.
 * Scroll work is done once per frame with requestAnimationFrame from a passive
 * listener. Anchors are elements inside the parent with `data-quest-anchor`
 * (the chapter id) and `data-numeral`.
 */
export function QuestPath() {
  const svgRef = useRef<SVGSVGElement>(null)
  const accentRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGGElement>(null)
  const geo = useRef<{ total: number; ys: Float32Array; lens: Float32Array; height: number } | null>(null)
  const [d, setD] = useState("")
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [pins, setPins] = useState<Pin[]>([])
  const [active, setActive] = useState(-1)
  const [inBook, setInBook] = useState(false)
  const activeRef = useRef(-1)
  const inBookRef = useRef(false)

  // 1. Build the path from the chapter anchors whenever the layout changes.
  useEffect(() => {
    const svg = svgRef.current
    const host = svg?.parentElement
    if (!svg || !host) return

    const build = () => {
      const w = svg.getBoundingClientRect().width
      const h = host.offsetHeight
      const hostTop = host.getBoundingClientRect().top
      const mid = w / 2
      const swing = Math.max(6, w * 0.32)
      const anchors = [...host.querySelectorAll<HTMLElement>("[data-quest-anchor]")]
      const nextPins: Pin[] = anchors.map((el) => {
        const r = el.getBoundingClientRect()
        return { id: el.dataset.questAnchor ?? "", numeral: el.dataset.numeral ?? "", x: mid, y: r.top - hostTop + r.height / 2 }
      })

      // Waypoints: start, then each pin with a bend left/right between pins, then the end.
      const pts: [number, number][] = [[mid, 0]]
      let prevY = 0
      nextPins.forEach((p, i) => {
        pts.push([mid + (i % 2 ? swing : -swing), (prevY + p.y) / 2])
        pts.push([p.x, p.y])
        prevY = p.y
      })
      pts.push([mid + (nextPins.length % 2 ? swing : -swing), (prevY + h) / 2])
      pts.push([mid, h])

      // Vertical tangents at every waypoint keep the curve moving downwards only.
      let path = `M${pts[0][0]},${pts[0][1]}`
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1]
        const [x1, y1] = pts[i]
        const dy = (y1 - y0) / 2
        path += ` C${x0},${y0 + dy} ${x1},${y1 - dy} ${x1},${y1}`
      }

      setSize({ w, h })
      setPins(nextPins)
      setD(path)
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(host)
    window.addEventListener("resize", build)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", build)
    }
  }, [])

  // 2. Sample the path once per layout so scrolling only needs a binary search.
  useEffect(() => {
    const accent = accentRef.current
    if (!accent || !d) return
    const total = accent.getTotalLength()
    const n = Math.max(32, Math.ceil(total / 6))
    const ys = new Float32Array(n + 1)
    const lens = new Float32Array(n + 1)
    for (let i = 0; i <= n; i++) {
      const l = (total * i) / n
      lens[i] = l
      ys[i] = accent.getPointAtLength(l).y
    }
    geo.current = { total, ys, lens, height: size.h }
    accent.style.strokeDasharray = `${total}`
    accent.style.strokeDashoffset = `${total}`
    window.dispatchEvent(new Event("scroll"))
  }, [d, size.h])

  // 3. Follow the scroll position.
  useEffect(() => {
    const svg = svgRef.current
    const host = svg?.parentElement
    if (!svg || !host) return
    let frame = 0

    const update = () => {
      frame = 0
      const g = geo.current
      const accent = accentRef.current
      const dot = dotRef.current
      if (!g || !accent || !dot) return
      const target = window.innerHeight / 2 - host.getBoundingClientRect().top

      // Binary search the sampled y values for the viewport middle.
      let lo = 0
      let hi = g.ys.length - 1
      if (target <= g.ys[0]) hi = 0
      else if (target >= g.ys[hi]) lo = hi
      else {
        while (hi - lo > 1) {
          const m = (lo + hi) >> 1
          if (g.ys[m] < target) lo = m
          else hi = m
        }
      }
      const len = g.lens[hi]
      accent.style.strokeDashoffset = `${g.total - len}`
      const p = accent.getPointAtLength(len)
      dot.setAttribute("transform", `translate(${p.x} ${p.y})`)

      const within = target > 0 && target < g.height
      if (within !== inBookRef.current) {
        inBookRef.current = within
        setInBook(within)
      }
      let idx = -1
      host.querySelectorAll<HTMLElement>("[data-quest-anchor]").forEach((el, i) => {
        const r = el.getBoundingClientRect()
        if (r.top + r.height / 2 <= window.innerHeight / 2 + 1) idx = i
      })
      if (idx !== activeRef.current) {
        activeRef.current = idx
        setActive(idx)
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const current = pins[active]
  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden="true"
        data-quest-path
        className="pointer-events-none absolute top-0 left-0 h-full w-9 overflow-visible sm:w-14 lg:w-20"
        viewBox={size.w ? `0 0 ${size.w} ${size.h}` : undefined}
        preserveAspectRatio="none"
      >
        {d && (
          <>
            <path d={d} fill="none" className="stroke-border" strokeWidth={2} strokeDasharray="3 7" strokeLinecap="round" />
            <path ref={accentRef} d={d} fill="none" className="stroke-ember" strokeWidth={2.5} strokeLinecap="round" />
            {pins.map((p, i) => (
              <g key={p.id} transform={`translate(${p.x} ${p.y})`} data-pin={p.id} data-active={i === active || undefined}>
                <circle
                  r={15}
                  className={i <= active ? "fill-ember stroke-ember" : "fill-background stroke-border"}
                  strokeWidth={2}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`font-heading text-[11px] font-semibold ${i <= active ? "fill-night" : "fill-muted-foreground"}`}
                >
                  {p.numeral}
                </text>
              </g>
            ))}
            <g ref={dotRef} data-quest-dot>
              <circle r={11} className="fill-signal/20" />
              <circle r={5} className="fill-signal quest-dot-glow" />
            </g>
          </>
        )}
      </svg>
      <p
        aria-hidden="true"
        data-quest-indicator
        className={`fixed bottom-5 left-4 z-30 rounded-full border border-white/10 bg-night/90 px-4 py-2 font-mono text-xs tracking-wide text-white shadow-lg backdrop-blur transition-opacity duration-300 sm:left-6 ${
          inBook && current ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {current ? `Chapter ${current.numeral} of ${pins[pins.length - 1]?.numeral ?? ""}` : ""}
      </p>
    </>
  )
}
