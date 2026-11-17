import type { ReactNode } from "react"
import { chapterPhotos, type Chapter as ChapterData } from "@/content/home"
import { BlurWords } from "./AnimatedText"

/** Photo with a circular reveal and a credit line. Loaded lazily, never the LCP. */
function ChapterPhoto({ id }: { id: string }) {
  const photo = chapterPhotos[id]
  if (!photo) return null
  return (
    <figure className="w-full">
      <div data-reveal="circle">
        <div className="overflow-hidden rounded-3xl bg-muted">
        {/* Plain <img> with srcset: the static export can't resize images on the fly. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/chapters/${id}-960.webp`}
          srcSet={`/images/chapters/${id}-640.webp 640w, /images/chapters/${id}-960.webp 960w`}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 70vw, 85vw"
          width={960}
          height={720}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] h-auto w-full object-cover"
        />
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted-foreground">
        Photo:{" "}
        <a href={`${photo.creditUrl}?utm_source=quest_hunter&utm_medium=referral`} className="underline-offset-2 hover:underline">
          {photo.credit}
        </a>{" "}
        /{" "}
        <a href="https://unsplash.com/?utm_source=quest_hunter&utm_medium=referral" className="underline-offset-2 hover:underline">
          Unsplash
        </a>
      </figcaption>
    </figure>
  )
}

/**
 * One chapter of the book: running header with page number, Roman numeral
 * (pinned to the quest path), animated title, drop-cap intro and a photo.
 */
export function Chapter({
  chapter,
  total,
  intro,
  children,
}: {
  chapter: ChapterData
  total: string
  intro: string
  children: ReactNode
}) {
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      data-chapter={chapter.numeral}
      className="border-t py-16 first:border-t-0 sm:py-24"
    >
      <p className="flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
        <span>Quest Hunter · Chapter {chapter.numeral}</span>
        <span aria-hidden="true" className="tabular-nums">
          p. {chapter.page}
        </span>
      </p>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-14">
        <div>
          <p
            aria-hidden="true"
            data-quest-anchor={chapter.id}
            data-numeral={chapter.numeral}
            className="font-heading text-7xl leading-none font-semibold text-brand sm:text-8xl"
          >
            {chapter.numeral}
          </p>
          <p className="mt-4 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            Chapter {chapter.numeral} of {total}
          </p>
          <h2 id={`${chapter.id}-title`} className="mt-2 text-4xl leading-tight font-semibold sm:text-5xl">
            <span className="sr-only">Chapter {chapter.numeral}: </span>
            <BlurWords text={chapter.title} />
          </h2>
          <p className="drop-cap mt-8 max-w-2xl text-lg text-pretty sm:text-xl">{intro}</p>
        </div>
        <ChapterPhoto id={chapter.id} />
      </div>

      {children}
    </section>
  )
}
