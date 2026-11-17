import Image from "next/image"
import type { ReactNode } from "react"
import { Check, ChefHat, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

/* Illustrated product screens. All decorative (aria-hidden); the text next to each mockup explains it. */

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span className={cn("grid size-2.5 shrink-0 place-items-center border", veg ? "border-veg" : "border-nonveg")}>
      <span className={cn("size-1 rounded-full", veg ? "bg-veg" : "bg-nonveg")} />
    </span>
  )
}

/** Shows a real screenshot when `src` is set, otherwise the illustration. */
export function Screenshot({ src, alt, children, className }: { src?: string; alt: string; children: ReactNode; className?: string }) {
  if (src) {
    return (
      <div className={cn("relative", className)}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
      </div>
    )
  }
  return (
    <div className={className} aria-hidden="true">
      {children}
    </div>
  )
}

/* ---------- guest phone screens ---------- */

export function GuestBrowse() {
  const items = [
    { name: "Chicken 65", price: "₹260", veg: false },
    { name: "Paneer Tikka", price: "₹240", veg: true },
    { name: "Veg Manchurian", price: "₹210", veg: true },
  ]
  return (
    <div className="px-3 pt-7 pb-4 text-[11px]">
      <p className="font-heading text-sm font-semibold">Spice Table</p>
      <p className="text-[10px] text-muted-foreground">Table 7 · Dine-in</p>
      <div className="mt-2 flex gap-1.5">
        {["Starters", "Mains", "Drinks"].map((c, i) => (
          <span key={c} className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", i === 0 ? "bg-ink text-white" : "bg-muted")}>
            {c}
          </span>
        ))}
      </div>
      <ul className="mt-2.5 space-y-2">
        {items.map((m) => (
          <li key={m.name} className="flex items-center gap-2">
            <span className="size-9 shrink-0 rounded-lg bg-gradient-to-br from-orange-200 to-orange-300" />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1 font-semibold">
                <VegMark veg={m.veg} /> <span className="truncate">{m.name}</span>
              </span>
              <span className="text-muted-foreground">{m.price}</span>
            </span>
            <span className="rounded-md border border-brand px-2 py-0.5 text-[10px] font-bold text-brand-strong">ADD</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function GuestCart() {
  return (
    <div className="px-3 pt-7 pb-4 text-[11px]">
      <p className="font-heading text-sm font-semibold">Your order</p>
      <p className="text-[10px] text-muted-foreground">Table 7</p>
      <ul className="mt-2.5 space-y-2.5">
        {[
          { name: "Chicken 65", qty: 1, price: "₹260", veg: false },
          { name: "Paneer Tikka", qty: 2, price: "₹480", veg: true },
        ].map((m) => (
          <li key={m.name} className="flex items-center gap-2">
            <VegMark veg={m.veg} />
            <span className="flex-1 truncate font-semibold">{m.name}</span>
            <span className="flex items-center gap-1 rounded-md border px-1">
              <Minus className="size-2.5" />
              {m.qty}
              <Plus className="size-2.5" />
            </span>
            <span className="w-9 text-right">{m.price}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 rounded-md bg-muted px-2 py-1.5 text-[10px] text-muted-foreground italic">Note: less spicy, please</p>
      <div className="mt-2.5 flex justify-between border-t pt-2 font-semibold">
        <span>Total</span>
        <span>₹740</span>
      </div>
      <div className="mt-2.5 rounded-full bg-brand py-2 text-center font-semibold text-white">Place order</div>
    </div>
  )
}

export function GuestStatus() {
  const steps = [
    { label: "Order received", time: "8:02 pm", done: true },
    { label: "Preparing", time: "8:04 pm", done: true, current: true },
    { label: "On its way to your table", time: "", done: false },
  ]
  return (
    <div className="px-3 pt-7 pb-4 text-[11px]">
      <p className="font-heading text-sm font-semibold">Order #24</p>
      <p className="text-[10px] text-muted-foreground">Table 7 · 3 items</p>
      <ol className="mt-3 space-y-0">
        {steps.map((s, i) => (
          <li key={s.label} className="relative flex gap-2.5 pb-3.5">
            {i < steps.length - 1 && (
              <span className={cn("absolute top-4 left-[7px] h-full w-0.5", s.done ? "bg-brand" : "bg-border")} />
            )}
            <span
              className={cn(
                "relative z-10 grid size-4 shrink-0 place-items-center rounded-full",
                s.done ? "bg-brand text-white" : "border-2 border-border bg-card",
                s.current && "ring-4 ring-brand/20",
              )}
            >
              {s.done && <Check className="size-2.5" strokeWidth={3} />}
            </span>
            <span>
              <span className={cn("block font-semibold", !s.done && "text-muted-foreground")}>{s.label}</span>
              {s.time && <span className="text-[10px] text-muted-foreground">{s.time}</span>}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-1 rounded-full border py-2 text-center font-semibold">Order more</div>
    </div>
  )
}

/* ---------- owner console ---------- */

export function ConsoleMock() {
  const orders = [
    { table: 7, items: "Chicken 65, Paneer Tikka ×2", status: "Preparing", tone: "bg-amber-100 text-amber-900" },
    { table: 3, items: "Veg Manchurian, Jeera Rice", status: "New", tone: "bg-brand-soft text-accent-foreground" },
    { table: 12, items: "Masala Chai ×4", status: "Served", tone: "bg-green-100 text-green-900" },
  ]
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-black/10">
      <div className="flex items-center gap-1.5 border-b bg-muted px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ml-3 text-[11px] text-muted-foreground">Owner console</span>
      </div>
      <div className="grid gap-4 p-4 text-xs sm:grid-cols-[1.4fr_1fr] sm:p-5">
        <div>
          <p className="font-semibold">Live orders</p>
          <ul className="mt-2 space-y-2">
            {orders.map((o) => (
              <li key={o.table} className="flex items-center gap-3 rounded-xl border p-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink font-heading text-sm font-semibold text-white">
                  T{o.table}
                </span>
                <span className="min-w-0 flex-1 truncate">{o.items}</span>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold", o.tone)}>{o.status}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold">Menu</p>
          <ul className="mt-2 divide-y rounded-xl border">
            {[
              { name: "Chicken Biryani", price: "₹320", on: false },
              { name: "Paneer Tikka", price: "₹240", on: true },
              { name: "Chicken 65", price: "₹260", on: true },
            ].map((m) => (
              <li key={m.name} className="flex items-center gap-2 p-2.5">
                <span className={cn("flex-1 truncate", !m.on && "text-muted-foreground line-through")}>{m.name}</span>
                <span className="text-muted-foreground">{m.price}</span>
                <span className={cn("flex h-4 w-7 items-center rounded-full p-0.5", m.on ? "justify-end bg-brand" : "bg-border")}>
                  <span className="size-3 rounded-full bg-white" />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 rounded-xl bg-brand-soft p-2.5 text-[11px] font-semibold text-accent-foreground">
            Offer live: Happy hour 4–7 pm, 20% off drinks
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- kitchen screen ---------- */

export function KitchenMock() {
  const cols = [
    { title: "New", tone: "bg-brand", tickets: [{ t: 3, items: ["Veg Manchurian", "Jeera Rice"], note: "" }] },
    { title: "Preparing", tone: "bg-amber-500", tickets: [{ t: 7, items: ["Chicken 65", "Paneer Tikka ×2"], note: "Less spicy" }] },
    { title: "Ready", tone: "bg-green-600", tickets: [{ t: 12, items: ["Masala Chai ×4"], note: "" }] },
  ]
  return (
    <div className="rounded-2xl bg-ink p-2.5 shadow-2xl shadow-black/30 sm:p-3">
      <div className="rounded-xl bg-[#2a2522] p-3 text-white sm:p-4">
        <div className="flex items-center justify-between text-xs text-white/70">
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <ChefHat className="size-4" /> Kitchen
          </span>
          <span>8:05 pm</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white/80 uppercase sm:text-xs">
                <span className={cn("size-2 rounded-full", c.tone)} />
                {c.title}
              </p>
              {c.tickets.map((tk) => (
                <div key={tk.t} className="mt-2 rounded-lg bg-white p-2 text-[10px] text-ink sm:p-2.5 sm:text-xs">
                  <p className="font-heading text-base font-semibold sm:text-lg">Table {tk.t}</p>
                  <ul className="mt-1 space-y-0.5">
                    {tk.items.map((i) => (
                      <li key={i} className="truncate">
                        {i}
                      </li>
                    ))}
                  </ul>
                  {tk.note && <p className="mt-1 rounded bg-amber-100 px-1 py-0.5 font-semibold text-amber-900">{tk.note}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-white/15" />
    </div>
  )
}

/* ---------- table QR card (hero) ---------- */

/** A stylised QR code. Decorative only, not scannable. */
export function TableQrCard() {
  // 9x9 pattern; 1 = dark module. Finder squares in three corners.
  const rows = [
    "111010111",
    "101001101",
    "111011111",
    "000100000",
    "110111011",
    "001010100",
    "111001011",
    "101011001",
    "111010110",
  ]
  return (
    <div className="w-40 rounded-2xl bg-card p-4 text-center shadow-xl shadow-black/15 ring-1 ring-black/5">
      <p className="text-[10px] font-bold tracking-[0.16em] text-brand-strong uppercase">Table 7</p>
      <div className="mx-auto mt-2 grid w-24 grid-cols-9 gap-px">
        {rows.join("").split("").map((v, i) => (
          <span key={i} className={cn("aspect-square rounded-[1px]", v === "1" ? "bg-ink" : "bg-transparent")} />
        ))}
      </div>
      <p className="mt-2 text-[11px] font-semibold">Scan to order</p>
      <p className="text-[10px] text-muted-foreground">No app needed</p>
    </div>
  )
}
