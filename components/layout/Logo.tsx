import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Logo({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 rounded-lg", className)} aria-label={`${siteConfig.name} home`}>
      <svg viewBox="0 0 64 64" className="size-9 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#c2410c" />
        <circle cx="30" cy="30" r="14" fill="none" stroke="#fff" strokeWidth="6" />
        <path d="M38 38l10 10" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <span className={cn("font-heading text-xl font-semibold tracking-tight", onDark ? "text-white" : "text-ink")}>
        Quest Hunter
      </span>
    </Link>
  )
}
