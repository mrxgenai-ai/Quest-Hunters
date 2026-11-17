/**
 * Normalises an Indian mobile number to 10 digits.
 * Accepts "98765 43210", "+91 98765-43210", "09876543210", "919876543210".
 * Returns null when it isn't a valid Indian mobile number (must start with 6–9).
 */
export function normaliseIndianMobile(input: string): string | null {
  let digits = input.replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1)
  return /^[6-9]\d{9}$/.test(digits) ? digits : null
}
