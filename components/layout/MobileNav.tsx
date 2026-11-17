"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { buttonStyles } from "@/components/Button"
import { headerCta, mainNav } from "@/content/site"
import { cn } from "@/lib/utils"

/** Mobile menu on native <dialog>: built-in focus trap, Esc to close and backdrop. */
export function MobileNav() {
  const ref = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()

  const open = () => ref.current?.showModal()
  const close = () => ref.current?.close()

  // Close when navigating to another page.
  useEffect(() => {
    ref.current?.close()
  }, [pathname])

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="grid size-11 place-items-center rounded-full border border-input bg-card lg:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>
      <dialog
        ref={ref}
        aria-label="Menu"
        onClick={(e) => e.target === ref.current && close()}
        className="m-0 ml-auto h-dvh max-h-dvh w-[86%] max-w-sm bg-background p-0 text-foreground backdrop:bg-black/40 open:flex open:flex-col lg:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b px-5">
          <span className="font-heading text-lg font-semibold">Menu</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full hover:bg-muted"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col overflow-y-auto px-5 pb-8">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close} className="border-b py-4 text-lg font-medium">
              {item.label}
            </Link>
          ))}
          <Link href={headerCta.href} onClick={close} className={cn(buttonStyles({ size: "lg" }), "mt-8")}>
            {headerCta.label}
          </Link>
        </nav>
      </dialog>
    </>
  )
}
