"use client"

import { lazy, Suspense, type ReactNode } from "react"
import { useAfterLoad, useMedia, useMotionOK } from "@/lib/useMotionOK"

const TiltedCard = lazy(() => import("@/components/reactbits/TiltedCard"))

const FINE_POINTER = "(hover: hover) and (pointer: fine)"

/**
 * Tilts the demo preview towards the cursor (React Bits TiltedCard) on
 * desktops with a mouse. It is decoration only: no focus, no role, and the
 * card's real link stays outside it. Touch screens get the static preview.
 */
export function DemoTilt({ children, height }: { children: ReactNode; height: number }) {
  const motionOK = useMotionOK()
  const loaded = useAfterLoad()
  const fine = useMedia(FINE_POINTER)
  const plain = <div style={{ height }}>{children}</div>
  if (!motionOK || !loaded || !fine) return plain

  return (
    <Suspense fallback={plain}>
      <TiltedCard
        containerWidth="100%"
        containerHeight={height}
        imageWidth="100%"
        imageHeight={height}
        radius={0}
        rotateAmplitude={8}
        scaleOnHover={1.03}
        glare={0.25}
        shadow={0}
        showTooltip={false}
      >
        {children}
      </TiltedCard>
    </Suspense>
  )
}
