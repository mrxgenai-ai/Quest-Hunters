"use client"

import Link from "next/link"
import { lazy, Suspense, type ReactNode } from "react"
import { buttonStyles } from "@/components/Button"
import { cn } from "@/lib/utils"
import { useAfterLoad, useMedia, useMotionOK } from "@/lib/useMotionOK"

const StarBorder = lazy(() => import("@/components/reactbits/StarBorder"))
const Magnet = lazy(() => import("@/components/reactbits/Magnet"))

const FINE_POINTER = "(hover: hover) and (pointer: fine)"

/**
 * The page's main call to action. On desktops with a mouse, after the page has
 * loaded, it gets a travelling star on its border (React Bits StarBorder) and
 * leans towards the cursor (React Bits Magnet). Everywhere else, and before
 * that, it's the normal ember button. Same size either way, so nothing shifts.
 */
export function QuestCTA({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const motionOK = useMotionOK()
  const loaded = useAfterLoad()
  const fine = useMedia(FINE_POINTER)
  const plain = (
    <Link href={href} className={cn(buttonStyles({ size: "lg" }), className)}>
      {children}
    </Link>
  )
  if (!motionOK || !loaded || !fine) return plain

  return (
    <Suspense fallback={plain}>
      <Magnet padding={60} magnetStrength={4} maxOffset={10} wrapperClassName="inline-block" innerClassName="inline-block">
        <StarBorder
          as={Link}
          href={href}
          radius={999}
          thickness={1.5}
          color="#22d3ee"
          duration={5}
          glow={0.7}
          backgroundColor="var(--ember)"
          textColor="var(--night)"
          borderColor="rgb(11 15 26 / 0.25)"
          className={cn("h-12 gap-2 px-6 py-0 text-base font-semibold whitespace-nowrap hover:brightness-105", className)}
        >
          {children}
        </StarBorder>
      </Magnet>
    </Suspense>
  )
}
