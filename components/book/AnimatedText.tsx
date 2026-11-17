"use client"

import { lazy, Suspense } from "react"
import { useAfterLoad, useMotionOK } from "@/lib/useMotionOK"

// React Bits effects are loaded only when motion is allowed, after the page is
// interactive. Until then (and without JavaScript) the plain text is shown.
const DecryptedText = lazy(() => import("@/components/reactbits/DecryptedText"))
const BlurText = lazy(() => import("@/components/reactbits/BlurText"))

/** A line that "decrypts" into place when it scrolls into view (React Bits DecryptedText). */
export function DecryptLine({ text }: { text: string }) {
  const motionOK = useMotionOK()
  const loaded = useAfterLoad()
  if (!motionOK || !loaded) return <>{text}</>
  return (
    <Suspense fallback={text}>
      <DecryptedText
        text={text}
        animateOn="view"
        sequential
        speed={28}
        revealDirection="start"
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#*"
        encryptedClassName="text-signal"
      />
    </Suspense>
  )
}

/** Words that sharpen from a blur as they scroll into view (React Bits BlurText). */
export function BlurWords({ text, className }: { text: string; className?: string }) {
  const motionOK = useMotionOK()
  const loaded = useAfterLoad()
  if (!motionOK || !loaded) return <>{text}</>
  return (
    <Suspense fallback={text}>
      <BlurText text={text} animateBy="words" direction="bottom" delay={90} blur={8} distance={18} className={className} />
    </Suspense>
  )
}
