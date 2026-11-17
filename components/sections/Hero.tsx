import { ArrowRight, Check } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"
import { MiniSite, PhoneFrame } from "@/components/PhoneFrame"
import { Container, Eyebrow } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { WhatsAppIcon } from "@/components/icons"
import { whatsappMessages } from "@/config/site"
import { hero } from "@/content/site"

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      <ImagePlaceholder
        alt=""
        label="Your signature dish"
        tint="#f2c9a0"
        className="aspect-[4/5] w-[82%] rounded-3xl sm:aspect-[4/4.4]"
        priority
      />
      <PhoneFrame className="absolute right-0 bottom-[-6%] w-[52%] max-w-[250px]">
        <MiniSite name="Your Restaurant" tint="#f5d9b8" cta="Book a table" />
      </PhoneFrame>
      <div className="absolute top-[8%] right-[2%] w-[58%] max-w-[260px] rounded-2xl bg-card p-3 shadow-xl shadow-black/10 ring-1 ring-black/5 sm:p-3.5">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          <span className="grid size-5 place-items-center rounded-full bg-[#0f7a40] text-white">
            <WhatsAppIcon className="size-3" />
          </span>
          WhatsApp · now
        </div>
        <p className="mt-1.5 text-sm leading-snug font-semibold">New table booking</p>
        <p className="text-xs text-muted-foreground">Table for 4 · Tonight, 8:30 pm</p>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-20%] h-[38rem] w-[38rem] rounded-full bg-brand-soft blur-3xl"
      />
      <Container className="relative grid items-center gap-14 pt-10 pb-24 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pt-20 lg:pb-28">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="mt-4 text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl lg:text-[4.25rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label} <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <WhatsAppButton location="hero" message={whatsappMessages.quote} size="lg">
              {hero.secondaryCta.label}
            </WhatsAppButton>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm font-medium sm:flex sm:flex-wrap sm:gap-x-6">
            {hero.trust.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <HeroVisual />
      </Container>
    </section>
  )
}
