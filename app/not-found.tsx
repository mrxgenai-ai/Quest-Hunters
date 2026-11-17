import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { ButtonLink } from "@/components/Button"
import { Container } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <Container className="py-28 text-center sm:py-36">
      <p className="text-xs font-bold tracking-[0.16em] text-brand-strong uppercase">404</p>
      <h1 className="mx-auto mt-3 max-w-xl text-4xl font-semibold sm:text-5xl">This page wandered off the map.</h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        The link may be old, or the page hasn&apos;t been written yet. Head back to the start or message us.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to home <ArrowRight aria-hidden="true" />
        </ButtonLink>
        <WhatsAppButton location="404" size="lg">
          WhatsApp us
        </WhatsAppButton>
      </div>
    </Container>
  )
}
