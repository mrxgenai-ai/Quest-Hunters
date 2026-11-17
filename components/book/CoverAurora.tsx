"use client"

import { lazy, Suspense, useEffect, useState } from "react"
import { useMedia } from "@/lib/useMotionOK"

const Aurora = lazy(() => import("@/components/reactbits/Aurora"))

/** Large screens with a mouse, and only when the visitor allows motion. */
const DESKTOP_MOTION = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"

/**
 * The cover's WebGL background (React Bits Aurora). It starts only after the
 * page has loaded and the browser is idle, never on phones or with reduced
 * motion, and Aurora itself pauses when it's off-screen or the tab is hidden.
 * The static gradient behind it is the fallback everywhere else.
 */
export function CoverAurora() {
  const allowed = useMedia(DESKTOP_MOTION)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!allowed) return
    let idle: number | undefined
    let timer: number | undefined
    const start = () => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      else timer = window.setTimeout(() => setReady(true), 800)
    }
    if (document.readyState === "complete") start()
    else window.addEventListener("load", start, { once: true })
    return () => {
      window.removeEventListener("load", start)
      if (idle !== undefined) window.cancelIdleCallback(idle)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [allowed])

  if (!allowed || !ready) return null
  return (
    <div aria-hidden="true" className="cover-aurora pointer-events-none absolute inset-0">
      <Suspense fallback={null}>
        <Aurora
          colorStops={["#f97316", "#1e3a8a", "#22d3ee"]}
          amplitude={0.9}
          blend={0.7}
          speed={0.45}
          height={0.38}
          glow={0.35}
          brightness={0.75}
          opacity={0.5}
          mouseInteraction={false}
          dpr={1.5}
        />
      </Suspense>
    </div>
  )
}
