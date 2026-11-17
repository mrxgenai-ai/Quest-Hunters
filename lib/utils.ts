export { cn } from "cn"

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })

/** ₹12,000 style formatting (Indian digit grouping). */
export function formatINR(value: number) {
  return inr.format(Math.round(value))
}
