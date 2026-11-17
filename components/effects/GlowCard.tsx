import type { CSSProperties, ReactNode } from "react"
import SpotlightCard from "@/components/reactbits/SpotlightCard"
import { cn } from "@/lib/utils"

/**
 * A card with a soft ember spotlight that follows the mouse (React Bits
 * SpotlightCard), styled with our tokens. On touch screens it is a normal card.
 * Keyboard focus inside the card lights it up too.
 */
export function GlowCard({
  dark,
  className,
  children,
  ...rest
}: {
  dark?: boolean
  className?: string
  children: ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">) {
  return (
    <SpotlightCard
      theme={dark ? "dark" : "light"}
      spotlightColor="#f97316"
      intensity={dark ? 0.22 : 0.12}
      spotlightSize={420}
      className={cn("rounded-2xl p-0!", dark ? "text-white" : "text-card-foreground", className)}
      style={
        {
          "--spotlight-card-surface": dark ? "var(--night)" : "var(--card)",
          "--spotlight-card-border": dark ? "rgb(255 255 255 / 0.14)" : "var(--border)",
          "--spotlight-card-shadow": dark ? "0 24px 48px -24px rgb(11 15 26 / 0.6)" : "none",
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </SpotlightCard>
  )
}
