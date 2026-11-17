"use client"

import { useId, useState } from "react"
import { ArrowRight } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { Section, SectionHeader } from "@/components/Section"
import { calculator } from "@/content/home"
import { carePlan, GST_RATE, plans, type PlanId } from "@/content/plans"
import { cn, formatINR } from "@/lib/utils"

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  help,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  help?: string
}) {
  const id = useId()
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
        <output htmlFor={id} className="font-heading text-xl font-semibold tabular-nums">
          {value}%
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={help ? `${id}-help` : undefined}
        className="mt-3 h-11 w-full cursor-pointer accent-brand"
      />
      {help && (
        <p id={`${id}-help`} className="text-xs text-muted-foreground">
          {help}
        </p>
      )}
    </div>
  )
}

export function CommissionCalculator() {
  const d = calculator.defaults
  const [sales, setSales] = useState<number>(d.monthlySales)
  const [commission, setCommission] = useState<number>(d.commissionPct)
  const [share, setShare] = useState<number>(d.sharePct)
  const [planId, setPlanId] = useState<PlanId>(d.planId)
  const salesId = useId()

  const plan = plans.find((p) => p.id === planId) ?? plans[plans.length - 1]
  const monthlyLost = sales * (commission / 100)
  const yearlyLost = monthlyLost * 12
  const gateway = planId === "ecommerce" ? calculator.gatewayPct : 0
  const monthlySaving = sales * (share / 100) * ((commission - gateway) / 100) - carePlan.monthlyFrom
  const planCost = plan.priceFrom * (1 + GST_RATE)
  const payback = monthlySaving > 0 ? planCost / monthlySaving : null

  let paybackText: string
  if (payback === null) paybackText = "Not at these numbers yet"
  else if (payback < 1) paybackText = "Under 1 month"
  else if (payback > 36) paybackText = "Over 3 years"
  else paybackText = `${payback.toFixed(1)} months`

  return (
    <Section id="calculator" labelledBy="calc-title" tone="dark">
      <SectionHeader id="calc-title" eyebrow={calculator.eyebrow} title={calculator.title} subtitle={calculator.subtitle} dark />

      <div data-reveal className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Inputs */}
        <form className="space-y-8 rounded-2xl bg-card p-6 text-foreground sm:p-8" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor={salesId} className="text-sm font-semibold">
              Monthly sales through delivery apps
            </label>
            <div className="mt-2 flex h-12 items-center rounded-xl border border-input bg-background px-4 focus-within:outline-3 focus-within:outline-ring">
              <span className="text-muted-foreground" aria-hidden="true">
                ₹
              </span>
              <input
                id={salesId}
                type="number"
                inputMode="numeric"
                min={0}
                step={1000}
                value={sales === 0 ? "" : sales}
                onChange={(e) => setSales(Math.max(0, Number(e.target.value) || 0))}
                className="w-full bg-transparent pl-2 font-heading text-xl font-semibold tabular-nums outline-none"
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">Zomato + Swiggy combined, before their cut.</p>
          </div>

          <Slider label="Commission you pay" value={commission} min={5} max={35} onChange={setCommission} />
          <Slider
            label="Orders you could move to your own site"
            value={share}
            min={5}
            max={100}
            step={5}
            onChange={setShare}
            help={calculator.shareHelp}
          />

          <fieldset>
            <legend className="text-sm font-semibold">Plan</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {plans.map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "flex h-11 cursor-pointer items-center justify-center rounded-full border text-sm font-semibold transition-colors has-focus-visible:outline-3 has-focus-visible:outline-ring",
                    planId === p.id ? "border-ink bg-ink text-white" : "border-input bg-background hover:bg-muted",
                  )}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={p.id}
                    checked={planId === p.id}
                    onChange={() => setPlanId(p.id)}
                    className="sr-only"
                  />
                  {p.name}
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        {/* Results */}
        <div className="flex flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/15 sm:p-8" aria-live="polite">
          <dl className="grid grid-cols-2 gap-6">
            <div>
              <dt className="text-sm text-white/70">Lost to commission each month</dt>
              <dd className="mt-1 font-heading text-3xl font-semibold tabular-nums sm:text-4xl">{formatINR(monthlyLost)}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/70">Lost each year</dt>
              <dd className="mt-1 font-heading text-3xl font-semibold text-orange-300 tabular-nums sm:text-4xl">
                {formatINR(yearlyLost)}
              </dd>
            </div>
            <div className="col-span-2 border-t border-white/15 pt-6">
              <dt className="text-sm text-white/70">You keep each month if {share}% of orders come direct</dt>
              <dd className="mt-1 font-heading text-3xl font-semibold tabular-nums">
                {formatINR(Math.max(0, monthlySaving))}
              </dd>
            </div>
            <div className="col-span-2 rounded-xl bg-brand p-5">
              <dt className="text-sm text-white/90">
                {plan.name} website ({formatINR(planCost)} incl. GST) pays for itself in
              </dt>
              <dd className="mt-1 font-heading text-4xl font-semibold">{paybackText}</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs text-white/60">{calculator.assumptions}</p>
          <ButtonLink href="/#contact" variant="light" size="lg" className="mt-6 w-full sm:w-auto sm:self-start">
            {calculator.cta.label} <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
