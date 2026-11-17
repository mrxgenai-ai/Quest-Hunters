import type { ReactNode } from "react"
import { whatsappMessages } from "@/config/site"
import { whatsappLink } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"
import { buttonStyles, type ButtonStyleProps } from "./Button"
import { TrackedLink } from "./TrackedLink"
import { WhatsAppIcon } from "./icons"

type Props = ButtonStyleProps & {
  children: ReactNode
  message?: string
  /** Where on the site the click happened, for analytics. */
  location: string
  className?: string
}

export function WhatsAppButton({
  children,
  message = whatsappMessages.default,
  location,
  variant = "whatsapp",
  size,
  className,
}: Props) {
  return (
    <TrackedLink
      href={whatsappLink(message)}
      external
      event="whatsapp_click"
      params={{ location }}
      className={cn(buttonStyles({ variant, size }), className)}
    >
      <WhatsAppIcon />
      {children}
    </TrackedLink>
  )
}
