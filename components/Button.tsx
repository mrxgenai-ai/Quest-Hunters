import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export const buttonStyles = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.15em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-strong",
        dark: "bg-ink text-white hover:bg-ink/85",
        outline: "border border-input bg-card text-foreground hover:border-foreground/40 hover:bg-muted",
        light: "bg-white text-ink hover:bg-brand-soft",
        whatsapp: "bg-ink text-white hover:bg-ink/85 [&_svg]:text-whatsapp",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
)

export type ButtonStyleProps = VariantProps<typeof buttonStyles>

export function Button({ className, variant, size, ...props }: ComponentProps<"button"> & ButtonStyleProps) {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />
}

export function ButtonLink({ className, variant, size, ...props }: ComponentProps<typeof Link> & ButtonStyleProps) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...props} />
}
