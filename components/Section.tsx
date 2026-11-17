import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>
}

export function Section({
  id,
  tone = "default",
  className,
  children,
  labelledBy,
}: {
  id?: string
  tone?: "default" | "card" | "muted" | "dark"
  className?: string
  children: ReactNode
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-20 sm:py-28",
        tone === "card" && "bg-card",
        tone === "muted" && "bg-muted",
        tone === "dark" && "bg-ink text-white",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-xs font-bold tracking-[0.16em] text-brand-strong uppercase", className)}>{children}</p>
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  dark,
}: {
  id?: string
  eyebrow?: string
  title: string
  subtitle?: ReactNode
  align?: "left" | "center"
  className?: string
  dark?: boolean
}) {
  return (
    <div data-reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={dark ? "text-orange-300" : undefined}>{eyebrow}</Eyebrow>}
      <h2 id={id} className="mt-3 text-3xl leading-tight font-semibold sm:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-pretty sm:text-lg", dark ? "text-white/75" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
