import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** The call-to-action row that closes a section. */
export function SectionCTA({
  children,
  note,
  className,
  align = "left",
}: {
  children: ReactNode
  note?: ReactNode
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div data-reveal className={cn("mt-12 flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", align === "center" && "sm:justify-center")}>
        {children}
      </div>
      {note && <p className="text-sm text-muted-foreground">{note}</p>}
    </div>
  )
}
