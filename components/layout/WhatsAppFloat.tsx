import { whatsappMessages } from "@/config/site"
import { whatsappLink } from "@/lib/whatsapp"
import { TrackedLink } from "@/components/TrackedLink"
import { WhatsAppIcon } from "@/components/icons"

/** Floating WhatsApp button shown on every page. */
export function WhatsAppFloat() {
  return (
    <TrackedLink
      href={whatsappLink(whatsappMessages.default)}
      external
      event="whatsapp_click"
      params={{ location: "floating_button" }}
      aria-label="Chat with Quest Hunter on WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-[#0f7a40] pr-5 pl-4 font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 hover:bg-[#0b6534] sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
      <span className="text-sm">WhatsApp</span>
    </TrackedLink>
  )
}
