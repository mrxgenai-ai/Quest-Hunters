import { JsonLd } from "@/components/JsonLd"
import { CommissionCalculator } from "@/components/sections/CommissionCalculator"
import { Contact } from "@/components/sections/Contact"
import { DemosPreview } from "@/components/sections/DemosPreview"
import { FaqSection } from "@/components/sections/FaqSection"
import { Hero } from "@/components/sections/Hero"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Plans } from "@/components/sections/Plans"
import { Team } from "@/components/sections/Team"
import { Trust } from "@/components/sections/Trust"
import { WhyUs } from "@/components/sections/WhyUs"
import { organizationSchema, planServicesSchema } from "@/lib/schema"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Plans />
      <DemosPreview />
      <HowItWorks />
      <WhyUs />
      <CommissionCalculator />
      <Trust />
      <Team />
      <FaqSection />
      <Contact />
      <JsonLd data={organizationSchema()} />
      <JsonLd data={planServicesSchema()} />
    </>
  )
}
