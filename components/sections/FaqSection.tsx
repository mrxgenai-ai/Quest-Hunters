import { SectionCTA } from "@/components/CTA"
import { Faq } from "@/components/Faq"
import { Section, SectionHeader } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { homeFaqs } from "@/content/faqs"

export function FaqSection() {
  return (
    <Section id="faq" labelledBy="faq-title" tone="muted">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeader id="faq-title" eyebrow="FAQ" title="Questions owners ask us." />
          <SectionCTA className="mt-8 hidden lg:flex">
            <WhatsAppButton location="faq" message="Hi Quest Hunter, I have a question about a website for my restaurant.">
              Ask your own question
            </WhatsAppButton>
          </SectionCTA>
        </div>
        <div>
          <Faq items={homeFaqs} idPrefix="home-faq" />
          <SectionCTA className="lg:hidden">
            <WhatsAppButton location="faq" message="Hi Quest Hunter, I have a question about a website for my restaurant." size="lg">
              Ask your own question
            </WhatsAppButton>
          </SectionCTA>
        </div>
      </div>
    </Section>
  )
}
