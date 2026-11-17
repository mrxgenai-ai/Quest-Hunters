import { currencyConfig } from "@/config/site"
import { pricePlaceholder } from "@/content/plans"
import { cn, formatINR } from "@/lib/utils"

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

/**
 * A price in INR with an optional USD twin. Both are in the HTML; CSS shows the
 * one picked with <CurrencySwitch> (see `.cur-usd` in globals.css). A null price
 * shows the placeholder label, so unconfirmed numbers are never invented.
 */
export function Price({
  inr,
  usdKey,
  suffix,
  inrSuffix = "+ GST",
  className,
  amountClassName,
}: {
  /** Rupees, before GST. null = not decided. */
  inr: number | null
  /** Key in currencyConfig.usdPrices. Omit for INR only. */
  usdKey?: string
  /** Shown after either currency, e.g. "/month". */
  suffix?: string
  /** Shown after the INR price only. */
  inrSuffix?: string
  className?: string
  amountClassName?: string
}) {
  const usdValue = usdKey ? currencyConfig.usdPrices[usdKey] : undefined
  return (
    <span className={className}>
      <span data-cur="inr">
        <span className={amountClassName}>{inr === null ? pricePlaceholder : formatINR(inr)}</span>
        {suffix && inr !== null && <span>{suffix}</span>}
        {inr !== null && inrSuffix && <span className="text-[0.8em] opacity-80"> {inrSuffix}</span>}
      </span>
      {usdKey && currencyConfig.usdEnabled && (
        <span data-cur="usd">
          <span className={cn(amountClassName)}>
            {usdValue == null ? currencyConfig.usdPlaceholder : usd.format(usdValue)}
          </span>
          {suffix && usdValue != null && <span>{suffix}</span>}
        </span>
      )}
    </span>
  )
}
