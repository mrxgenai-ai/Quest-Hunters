import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Shows a real photo when `src` is set, otherwise a warm placeholder of the same size.
 * Drop photos into /public/images and pass the path, e.g. src="/images/hero.webp".
 */
export function ImagePlaceholder({
  src,
  alt,
  label = "Food photo",
  tint = "#f5d9b8",
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src?: string
  alt: string
  label?: string
  tint?: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    )
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative grid place-items-center overflow-hidden", className)}
      style={{
        backgroundColor: tint,
        backgroundImage:
          "radial-gradient(circle at 30% 30%, rgb(255 255 255 / 0.55), transparent 55%), radial-gradient(circle at 75% 80%, rgb(194 65 12 / 0.22), transparent 50%)",
      }}
    >
      <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/75 px-3 py-1 text-[11px] font-semibold text-ink/75">
        <ImageIcon className="size-3.5" aria-hidden="true" />
        {label}
      </span>
    </div>
  )
}
