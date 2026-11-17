import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { hero } from "@/content/site"

// Social preview image (WhatsApp, Facebook, LinkedIn, X), generated at build time as /og.png.
// Referenced from every page through lib/metadata.ts.
export const dynamic = "force-static"

const size = { width: 1200, height: 630 }

export async function GET() {
  // Fraunces SemiBold (SIL Open Font License), the site's heading font.
  const fraunces = await readFile(join(process.cwd(), "assets/fonts/Fraunces-SemiBold.ttf"))
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#faf7f2",
          color: "#1c1917",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "#ffedd5",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#c2410c" />
            <circle cx="30" cy="30" r="14" fill="none" stroke="#fff" strokeWidth="6" />
            <path d="M38 38l10 10" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 38, fontFamily: "Fraunces" }}>Quest Hunter</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#9a3412", letterSpacing: 3, textTransform: "uppercase" }}>
            Restaurant websites · Chhatrapati Sambhajinagar
          </div>
          <div style={{ fontSize: 72, fontFamily: "Fraunces", lineHeight: 1.08, letterSpacing: -1.5 }}>{hero.title}</div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {hero.trust.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 9999,
                background: "#ffffff",
                border: "2px solid #e7e1d8",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: fraunces, weight: 600, style: "normal" }] },
  )
}
