import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** A simple phone mockup frame for screenshots and illustrated previews. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[2rem] bg-ink p-2 shadow-2xl shadow-black/25", className)}>
      <div className="relative overflow-hidden rounded-[1.6rem] bg-card">
        <div className="absolute top-2 left-1/2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-ink/80" aria-hidden="true" />
        {children}
      </div>
    </div>
  )
}

type PreviewRow = { name: string; price: string; veg?: boolean }

const defaultItems: PreviewRow[] = [
  { name: "Featured product", price: "₹1,200" },
  { name: "Best seller", price: "₹850" },
  { name: "New arrival", price: "₹2,400" },
]

/** Illustrated website shown inside PhoneFrame (until real screenshots exist). */
export function MiniSite({
  name,
  tint = "#f5d9b8",
  cta = "Enquire now",
  items = defaultItems,
}: {
  name: string
  tint?: string
  cta?: string
  items?: PreviewRow[]
}) {
  return (
    <div className="pt-6 text-[11px]" aria-hidden="true">
      <div className="flex items-center justify-between px-3 pb-2">
        <span className="truncate font-heading text-sm font-semibold">{name}</span>
        <span className="flex flex-col gap-0.5">
          <span className="h-0.5 w-3.5 rounded bg-ink" />
          <span className="h-0.5 w-3.5 rounded bg-ink" />
        </span>
      </div>
      <div
        className="mx-3 aspect-[16/10] rounded-xl"
        style={{
          backgroundColor: tint,
          backgroundImage:
            "radial-gradient(circle at 35% 40%, rgb(255 255 255 / 0.6), transparent 45%), radial-gradient(circle at 70% 75%, rgb(194 65 12 / 0.3), transparent 50%)",
        }}
      />
      <ul className="mt-2 divide-y px-3">
        {items.map((m) => (
          <li key={m.name} className="flex items-center gap-2 py-1.5">
            {m.veg !== undefined ? (
              <span className={cn("grid size-2.5 shrink-0 place-items-center border", m.veg ? "border-veg" : "border-nonveg")}>
                <span className={cn("size-1 rounded-full", m.veg ? "bg-veg" : "bg-nonveg")} />
              </span>
            ) : (
              <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: tint }} />
            )}
            <span className="flex-1 truncate font-medium">{m.name}</span>
            <span className="text-muted-foreground">{m.price}</span>
          </li>
        ))}
      </ul>
      <div className="m-3 mt-1 rounded-full bg-ember py-2 text-center font-semibold text-night">{cta}</div>
    </div>
  )
}
