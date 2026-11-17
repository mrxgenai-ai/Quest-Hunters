"use client"

import { useId, useRef, useState, type FormEvent } from "react"
import { CheckCircle2, AlertCircle, Mail } from "lucide-react"
import { Button } from "@/components/Button"
import { WhatsAppIcon } from "@/components/icons"
import { siteConfig } from "@/config/site"
import { contact, serviceInterestOptions } from "@/content/contact"
import { track } from "@/lib/analytics"
import { formatPhone, normalisePhone } from "@/lib/phone"
import { cn } from "@/lib/utils"
import { whatsappLink } from "@/lib/whatsapp"

/** Simple sanity check (something@domain.tld); the real check is replying. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const field =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-ring/40 aria-invalid:border-destructive"

type Via = "whatsapp" | "email"
type Status = { kind: "sent" | "error"; text: string } | null

export function ContactForm({
  defaultPlan,
  source = "contact",
  messagePlaceholder = "What your business does, where you are, and what you'd like help with…",
}: {
  /** Pre-selected option in the "I'm interested in" dropdown. */
  defaultPlan?: string
  source?: string
  messagePlaceholder?: string
}) {
  const uid = useId()
  const ids = {
    name: `${uid}-name`,
    business: `${uid}-business`,
    phone: `${uid}-phone`,
    phoneHint: `${uid}-phone-hint`,
    email: `${uid}-email`,
    emailHint: `${uid}-email-hint`,
    plan: `${uid}-plan`,
    message: `${uid}-message`,
  }
  const phoneRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>(null)
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
    const via: Via = submitter?.value === "email" ? "email" : "whatsapp"
    const form = e.currentTarget
    const data = new FormData(form)
    const get = (k: string) => String(data.get(k) ?? "").trim()
    const phone = normalisePhone(get("phone"))
    const email = get("email")
    const emailOk = EMAIL.test(email)
    setError(phone ? null : contact.phoneError)
    setEmailError(emailOk ? null : email ? contact.emailError : contact.emailMissing)
    setStatus(null)
    if (!phone) return phoneRef.current?.focus()
    if (!emailOk) return emailRef.current?.focus()

    const plan = get("plan")
    const details = {
      name: get("name"),
      business: get("business"),
      phone: formatPhone(phone),
      email,
      plan,
      message: get("message"),
    }
    const lines = [
      details.name && `Name: ${details.name}`,
      details.business && `Business: ${details.business}`,
      `Phone: ${details.phone}`,
      `Email: ${details.email}`,
      plan && `Interested in: ${plan}`,
      details.message && `\n${details.message}`,
    ].filter(Boolean)
    track("form_submit", { plan: plan || "none", source, method: via })

    if (via === "whatsapp") {
      const url = whatsappLink([contact.messageIntro, "", ...lines].join("\n"))
      const win = window.open(url, "_blank")
      if (!win) window.location.href = url
      setStatus({ kind: "sent", text: contact.success })
      return
    }

    // Send enquiry: post to the form service if one is set, otherwise open the
    // visitor's email app with the enquiry written out.
    const subject = `${contact.emailSubject}${details.business ? `: ${details.business}` : ""}`
    if (!siteConfig.formEndpoint) {
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`
      setStatus({ kind: "sent", text: contact.mailtoNote })
      return
    }
    setSending(true)
    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...details, _subject: subject, _replyto: email, source }),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus({ kind: "sent", text: contact.enquirySuccess })
    } catch {
      setStatus({ kind: "error", text: contact.enquiryError })
    } finally {
      setSending(false)
    }
  }

  const options = serviceInterestOptions.includes(defaultPlan ?? "")
    ? serviceInterestOptions
    : defaultPlan
      ? [defaultPlan, ...serviceInterestOptions]
      : serviceInterestOptions

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
          <label htmlFor={ids.business} className="text-sm font-semibold">
            Business name <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id={ids.business} name="business" autoComplete="organization" className={field} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid content-start gap-2">
          <label htmlFor={ids.phone} className="text-sm font-semibold">
            Phone / WhatsApp <span className="text-brand-strong">*</span>
          </label>
          <input
            ref={phoneRef}
            id={ids.phone}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={error ? true : undefined}
            aria-describedby={ids.phoneHint}
            placeholder="98765 43210 or +44 7700 900123"
            className={field}
            onChange={() => error && setError(null)}
          />
          <p id={ids.phoneHint} className={cn("text-xs", error ? "font-semibold text-destructive" : "text-muted-foreground")}>
            {error ?? contact.phoneHint}
          </p>
        </div>
        <div className="grid content-start gap-2">
          <label htmlFor={ids.email} className="text-sm font-semibold">
            Business email <span className="text-brand-strong">*</span>
          </label>
          <input
            ref={emailRef}
            id={ids.email}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            aria-required="true"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={ids.emailHint}
            placeholder="you@yourbusiness.com"
            className={field}
            onChange={() => emailError && setEmailError(null)}
          />
          <p id={ids.emailHint} className={cn("text-xs", emailError ? "font-semibold text-destructive" : "text-muted-foreground")}>
            {emailError ?? contact.emailHint}
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor={ids.plan} className="text-sm font-semibold">
          I&apos;m interested in
        </label>
        <select id={ids.plan} name="plan" defaultValue={defaultPlan ?? options[0]} className={cn(field, "appearance-auto")}>
          {options.map((o) => (
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
        <textarea id={ids.message} name="message" rows={4} placeholder={messagePlaceholder} className={cn(field, "h-auto py-3")} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button type="submit" name="via" value="whatsapp" size="lg" className="w-full">
          <WhatsAppIcon /> {contact.submitLabel}
        </Button>
        <Button type="submit" name="via" value="email" size="lg" variant="outline" className="w-full" disabled={sending}>
          <Mail aria-hidden="true" /> {sending ? contact.enquirySending : contact.enquiryLabel}
        </Button>
      </div>

      <div role="status" aria-live="polite">
        {status && (
          <p
            className={cn(
              "flex items-start gap-2 rounded-xl p-4 text-sm font-semibold",
              status.kind === "sent" ? "bg-brand-soft text-accent-foreground" : "bg-destructive/10 text-destructive",
            )}
          >
            {status.kind === "sent" ? (
              <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            )}
            {status.text}
          </p>
        )}
      </div>
      <p id={`${uid}-privacy`} className="text-center text-xs text-muted-foreground">
        {contact.privacyNote}
      </p>
    </form>
  )
}
