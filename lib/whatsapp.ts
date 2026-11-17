import { siteConfig, whatsappMessages } from "@/config/site"

export function whatsappLink(text: string = whatsappMessages.default) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`
}
