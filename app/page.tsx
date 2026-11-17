import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react"
import { DecryptLine } from "@/components/book/AnimatedText"
import { Chapter } from "@/components/book/Chapter"
import { CoverAurora } from "@/components/book/CoverAurora"
import { QuestPath } from "@/components/book/QuestPath"
import { QuestCTA } from "@/components/effects/QuestCTA"
import { ButtonLink } from "@/components/Button"
import { JsonLd } from "@/components/JsonLd"
import GlareHover from "@/components/reactbits/GlareHover"
import ShinyText from "@/components/reactbits/ShinyText"
import { Container } from "@/components/Section"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { whatsappMessages } from "@/config/site"
import { buildProcess } from "@/content/howItWorks"
import {
  chapterFour,
  chapterOne,
  chapterThree,
  chapterTwo,
  chapters,
  contents,
  cover,
  epilogue,
  homeMeta,
} from "@/content/home"
import { pageMetadata } from "@/lib/metadata"
import { organizationSchema } from "@/lib/schema"

export const metadata: Metadata = pageMetadata({
  title: homeMeta.title,
  description: homeMeta.description,
  path: "/",
  absoluteTitle: true,
})

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default function HomePage() {
  const [one, two, three, four] = chapters
  const total = chapters[chapters.length - 1].numeral

  return (
    <>
      {/* ───────── Cover ───────── */}
      <section aria-labelledby="cover-title" className="cover-backdrop relative isolate overflow-hidden text-white">
        <CoverAurora />
        <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between py-10 sm:py-14">
          <p className="flex justify-between font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">
            <ShinyText text={cover.kicker} color="#a3a8b5" shineColor="#ffffff" speed={3} delay={2} glow={0} />
            <span className="hidden sm:inline">19.88° N · 75.34° E</span>
          </p>

          <div className="py-16">
            <h1 id="cover-title" className="text-[3.6rem] leading-[0.92] font-semibold tracking-tight text-[#ece9e2] sm:text-8xl lg:text-[9rem]">
              {cover.title}
            </h1>
            <p className="mt-6 max-w-2xl font-mono text-base text-pretty text-white/85 sm:text-xl">
              <DecryptLine text={cover.promise} />
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <QuestCTA href={cover.startCta.href}>
                {cover.startCta.label} <ArrowRight aria-hidden="true" />
              </QuestCTA>
              <ButtonLink
                href={cover.readCta.href}
                size="lg"
                className="border border-white/25 bg-white/5 text-white backdrop-blur hover:bg-white/10"
              >
                {cover.readCta.label} <ArrowDown aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <p className="flex flex-wrap justify-between gap-2 border-t border-white/10 pt-4 font-mono text-[11px] tracking-[0.12em] text-white/60 uppercase">
            {cover.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
        </Container>
      </section>

      {/* ───────── Contents ───────── */}
      <section id="contents" aria-labelledby="contents-title" className="bg-night pb-20 text-white sm:pb-28">
        <Container className="border-t border-white/10 pt-16 sm:pt-20">
          <p className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">{contents.eyebrow}</p>
          <h2 id="contents-title" className="mt-3 text-4xl font-semibold sm:text-5xl">
            {contents.title}
          </h2>
          <ol className="mt-10 grid gap-3">
            {chapters.map((c) => (
              <li key={c.id}>
                <GlareHover
                  width="100%"
                  background="transparent"
                  borderRadius="1rem"
                  borderColor="rgb(255 255 255 / 0.1)"
                  glareColor="#22d3ee"
                  glareOpacity={0.22}
                  glareSize={40}
                  rimGlint={false}
                  className="border transition-colors focus-within:border-signal hover:border-white/25"
                >
                  <Link
                    href={`#${c.id}`}
                    className="flex w-full items-baseline gap-4 px-5 py-5 outline-none focus-visible:outline-none sm:gap-6 sm:px-6"
                  >
                    <span className="w-10 shrink-0 font-heading text-3xl font-semibold text-ember sm:w-14 sm:text-4xl">{c.numeral}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xl font-semibold sm:text-2xl">{c.title}</span>
                      <span className="text-sm text-white/65">{c.summary}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 self-center border-b border-dotted border-white/25 sm:block"
                    />
                    <span className="font-mono text-sm text-white/65 tabular-nums">
                      <span className="sr-only">Page </span>
                      {c.page}
                    </span>
                  </Link>
                </GlareHover>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───────── Chapters, with the quest path down the side ───────── */}
      <Container>
        <div className="relative pl-12 sm:pl-20 lg:pl-28" data-book>
          <QuestPath />

          <Chapter chapter={one} total={total} intro={chapterOne.intro}>
            <div className="mt-14 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold">{chapterOne.whyTitle}</h3>
                {chapterOne.why.map((p) => (
                  <p key={p.slice(0, 20)} className="mt-4 text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{chapterOne.helpTitle}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {chapterOne.help.map((h) => (
                    <li key={h} className="rounded-full border bg-card px-4 py-2 text-sm font-medium">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className="mt-16 text-2xl font-semibold">{chapterOne.teamTitle}</h3>
            <p className="mt-2 text-muted-foreground">{chapterOne.teamNote}</p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {chapterOne.team.map((m) => (
                <li key={m.name} data-reveal className="rounded-2xl border bg-card p-6">
                  {m.photo ? (
                    <Image src={m.photo} alt={`Photo of ${m.name}`} width={72} height={72} className="size-18 rounded-full object-cover" />
                  ) : (
                    <span
                      role="img"
                      aria-label={`Photo of ${m.name} coming soon`}
                      className="grid size-16 place-items-center rounded-full bg-night font-heading text-2xl font-semibold text-ember ring-2 ring-ember/40"
                    >
                      {initials(m.name)}
                    </span>
                  )}
                  <h4 className="mt-4 font-heading text-2xl font-semibold">{m.name}</h4>
                  <p className="font-mono text-xs tracking-wide text-brand uppercase">{m.role}</p>
                  <p className="mt-3 text-muted-foreground">{m.bio}</p>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter chapter={two} total={total} intro={chapterTwo.intro}>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {[chapterTwo.build, chapterTwo.grow].map((l, i) => (
                <article
                  key={l.label}
                  data-reveal
                  className={
                    i === 0
                      ? "rounded-2xl border bg-card p-7"
                      : "rounded-2xl border border-night bg-night p-7 text-white"
                  }
                >
                  <p className={i === 0 ? "font-mono text-xs tracking-[0.18em] text-brand uppercase" : "font-mono text-xs tracking-[0.18em] text-ember uppercase"}>
                    {l.label}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold">{l.title}</h3>
                  <p className={i === 0 ? "mt-3 text-muted-foreground" : "mt-3 text-white/75"}>{l.desc}</p>
                  <p className="mt-5 font-mono text-sm">{l.from}</p>
                </article>
              ))}
            </div>
            <ButtonLink href={chapterTwo.cta.href} size="lg" className="mt-10">
              {chapterTwo.cta.label} <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </Chapter>

          <Chapter chapter={three} total={total} intro={chapterThree.intro}>
            <ol className="mt-14 grid gap-5 sm:grid-cols-2">
              {buildProcess.steps.map((s, i) => (
                <li key={s.title} data-reveal className="relative rounded-2xl border bg-card p-6">
                  <span className="font-mono text-xs tracking-[0.18em] text-brand uppercase">Stop 0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </li>
              ))}
            </ol>
            <ButtonLink href={chapterThree.cta.href} variant="outline" size="lg" className="mt-10">
              {chapterThree.cta.label} <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </Chapter>

          <Chapter chapter={four} total={total} intro={chapterFour.intro}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={chapterFour.contactCta.href} size="lg">
                {chapterFour.contactCta.label} <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <WhatsAppButton location="home_chapter_iv" message={whatsappMessages.default} size="lg">
                {chapterFour.whatsappLabel}
              </WhatsAppButton>
            </div>
          </Chapter>
        </div>
      </Container>

      {/* ───────── Epilogue ───────── */}
      <section aria-labelledby="epilogue-title" className="border-t py-20 text-center">
        <Container>
          <h2 id="epilogue-title" className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            {epilogue.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-heading text-2xl text-pretty sm:text-3xl">{epilogue.text}</p>
          <p aria-hidden="true" className="mt-6 font-heading text-2xl text-brand">
            ⁂
          </p>
          <Link
            href="/services/"
            className="mt-4 inline-flex items-center gap-1 py-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
          >
            Keep reading: our services <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>

      <JsonLd data={organizationSchema()} />
    </>
  )
}
