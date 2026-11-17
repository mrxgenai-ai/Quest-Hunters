"use client"

import { useId, useRef, useState, type FormEvent } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/Button"
import { WhatsAppIcon } from "@/components/icons"
import { contact } from "@/content/home"
import { planInterestOptions } from "@/content/plans"
import { track } from "@/lib/analytics"
import { normaliseIndianMobile } from "@/lib/phone"
import { cn } from "@/lib/utils"
import { whatsappLink } from "@/lib/whatsapp"

const field =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-ring/40 aria-invalid:border-destructive"

export function ContactForm({
  defaultPlan,
  source = "home",
  messagePlaceholder = "Type of place, area, what you'd like guests to be able to do…",
}: {
  defaultPlan?: string
  source?: string
  messagePlaceholder?: string
}) {
  const uid = useId()
  const ids = {
    name: `${uid}-name`,
    restaurant: `${uid}-restaurant`,
    phone: `${uid}-phone`,
    phoneHint: `${uid}-phone-hint`,
    plan: `${uid}-plan`,
    message: `${uid}-message`,
  }
  const phoneRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const phone = normaliseIndianMobile(String(data.get("phone") ?? ""))
    if (!phone) {
      setError("Enter a 10-digit Indian mobile number, for example 98765 43210.")
      phoneRef.current?.focus()
      return
    }
    setError(null)

    const get = (k: string) => String(data.get(k) ?? "").trim()
    const plan = get("plan")
    const lines = [
      "Hi Quest Hunter, I'd like a free demo for my restaurant.",
      "",
      get("name") && `Name: ${get("name")}`,
      get("restaurant") && `Restaurant: ${get("restaurant")}`,
      `Phone: +91 ${phone.slice(0, 5)} ${phone.slice(5)}`,
      plan && `Interested in: ${plan}`,
      get("message") && `\n${get("message")}`,
    ].filter(Boolean)

    track("form_submit", { plan: plan || "none", source })
    const url = whatsappLink(lines.join("\n"))
    const win = window.open(url, "_blank")
    if (!win) window.location.href = url
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-describedby={`${uid}-privacy`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={ids.name} className="text-sm font-semibold">
            Your name <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id={ids.name} name="name" autoComplete="name" className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor={ids.restaurant} className="text-sm font-semibold">
            Restaurant name <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id={ids.restaurant} name="restaurant" autoComplete="organization" className={field} />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor={ids.phone} className="text-sm font-semibold">
          Phone / WhatsApp <span className="text-brand-strong">*</span>
        </label>
        <div className="flex">
          <span className="grid h-12 place-items-center rounded-l-xl border border-r-0 border-input bg-muted px-3 text-sm font-semibold text-muted-foreground">
            +91
          </span>
          <input
            ref={phoneRef}
            id={ids.phone}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required
            aria-required="true"
            aria-invalid={error ? true : undefined}
            aria-describedby={ids.phoneHint}
            placeholder="98765 43210"
            className={cn(field, "rounded-l-none")}
            onChange={() => error && setError(null)}
          />
        </div>
        <p id={ids.phoneHint} className={cn("text-xs", error ? "font-semibold text-destructive" : "text-muted-foreground")}>
          {error ?? "We reply on WhatsApp. No spam, no calls unless you ask."}
        </p>
      </div>

      <div className="grid gap-2">
        <label htmlFor={ids.plan} className="text-sm font-semibold">
          Plan interest
        </label>
        <select id={ids.plan} name="plan" defaultValue={defaultPlan ?? planInterestOptions[0]} className={cn(field, "appearance-auto")}>
          {planInterestOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor={ids.message} className="text-sm font-semibold">
          Message <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={4}
          placeholder={messagePlaceholder}
          className={cn(field, "h-auto py-3")}
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        <WhatsAppIcon /> {contact.submitLabel}
      </Button>

      <div role="status" aria-live="polite">
        {sent && (
          <p className="flex items-start gap-2 rounded-xl bg-brand-soft p-4 text-sm font-semibold text-accent-foreground">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {contact.success}
          </p>
        )}
      </div>
      <p id={`${uid}-privacy`} className="text-center text-xs text-muted-foreground">
        {contact.privacyNote}
      </p>
    </form>
  )
}
