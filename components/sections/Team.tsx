import Image from "next/image"
import { SectionCTA } from "@/components/CTA"
import { Section, SectionHeader } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { team } from "@/content/home"

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function Team() {
  return (
    <Section id="team" labelledBy="team-title">
      <SectionHeader id="team-title" eyebrow={team.eyebrow} title={team.title} />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.members.map((m) => (
          <li key={m.name} data-reveal className="overflow-hidden rounded-2xl border bg-card">
            <div className="relative aspect-[4/3] bg-brand-soft">
              {m.photo ? (
                <Image src={m.photo} alt={`Photo of ${m.name}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              ) : (
                <div className="grid h-full place-items-center" role="img" aria-label={`Photo of ${m.name} coming soon`}>
                  <span className="grid size-24 place-items-center rounded-full bg-card font-heading text-3xl font-semibold text-brand-strong shadow-sm">
                    {initials(m.name)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold">{m.name}</h3>
              <p className="text-sm font-semibold text-brand-strong">{m.role}</p>
              <p className="mt-3 text-muted-foreground">{m.bio}</p>
            </div>
          </li>
        ))}
      </ul>
      <SectionCTA>
        <WhatsAppButton location="team" size="lg">
          Say hi to the team
        </WhatsAppButton>
      </SectionCTA>
    </Section>
  )
}
