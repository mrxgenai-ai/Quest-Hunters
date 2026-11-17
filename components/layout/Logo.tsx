import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Logo({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 rounded-lg", className)} aria-label={`${siteConfig.name} home`}>
      <svg viewBox="0 0 64 64" className="size-9 shrink-0" aria-hidden="true">
        <rect x="1" y="1" width="62" height="62" rx="16" fill="#0b0f1a" stroke="#2a3348" strokeWidth="2" />
        <circle cx="30" cy="30" r="14" fill="none" stroke="#f97316" strokeWidth="6" />
        <path d="M38 38l10 10" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
        <circle cx="30" cy="30" r="3.5" fill="#22d3ee" />
      </svg>
      <span className={cn("font-heading text-xl font-semibold tracking-tight", onDark ? "text-white" : "text-foreground")}>
        Quest Hunter
      </span>
    </Link>
  )
}
