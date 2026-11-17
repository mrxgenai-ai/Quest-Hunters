/**
 * Normalises a phone number for WhatsApp (country code + number, digits only).
 *
 * - Indian mobiles work without a country code: "98765 43210", "09876543210",
 *   "+91 98765-43210" → "919876543210".
 * - Other countries need a country code: "+44 7700 900123" or "0044 7700 900123"
 *   → "447700900123".
 *
 * Returns null when the number can't be valid.
 */
export function normalisePhone(input: string): string | null {
  const trimmed = input.trim()
  const international = trimmed.startsWith("+") || trimmed.startsWith("00")
  let digits = trimmed.replace(/\D/g, "")
  if (trimmed.startsWith("00")) digits = digits.slice(2)

  if (!international) {
    // Indian number without a country code.
    if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1)
    if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2)
    return /^[6-9]\d{9}$/.test(digits) ? `91${digits}` : null
  }

  // Indian number written with +91: check it's a real mobile.
  if (digits.startsWith("91") && digits.length === 12) return /^91[6-9]\d{9}$/.test(digits) ? digits : null
  // E.164 allows up to 15 digits; the shortest real numbers are about 8.
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null
}

/** "919876543210" → "+91 98765 43210"; other countries → "+447700900123". */
export function formatPhone(digits: string): string {
  if (digits.startsWith("91") && digits.length === 12) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  return `+${digits}`
}
