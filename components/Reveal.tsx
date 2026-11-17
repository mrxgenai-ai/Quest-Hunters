"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Fades in elements marked with `data-reveal` as they scroll into view.
 * Mounted once in the root layout. Without JS, everything is simply visible.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    document.documentElement.classList.add("reveal-ready")
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
