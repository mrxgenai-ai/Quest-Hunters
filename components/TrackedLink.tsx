"use client"

import type { ComponentProps } from "react"
import { track } from "@/lib/analytics"

type Props = ComponentProps<"a"> & {
  event: Parameters<typeof track>[0]
  params?: Record<string, string | number>
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean
}

/** An <a> that reports a GA4 event when clicked. */
export function TrackedLink({ event, params, external, onClick, ...props }: Props) {
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
      onClick={(e) => {
        track(event, params)
        onClick?.(e)
      }}
    />
  )
}
