import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { brand } from "@/content/site"

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
          background: "#0b0f1a",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(249,115,22,0.35), transparent 45%), radial-gradient(circle at 70% 95%, rgba(34,211,238,0.22), transparent 45%)",
          color: "#e8e6e1",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect x="1" y="1" width="62" height="62" rx="16" fill="#0b0f1a" stroke="#2a3348" strokeWidth="2" />
            <circle cx="30" cy="30" r="14" fill="none" stroke="#f97316" strokeWidth="6" />
            <path d="M38 38l10 10" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            <circle cx="30" cy="30" r="3.5" fill="#22d3ee" />
          </svg>
          <div style={{ fontSize: 38, fontFamily: "Fraunces" }}>Quest Hunter</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#fdba74", letterSpacing: 3, textTransform: "uppercase" }}>
            Websites · Social media · Automation
          </div>
          <div style={{ fontSize: 72, fontFamily: "Fraunces", lineHeight: 1.08, letterSpacing: -1.5 }}>{brand.tagline}</div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {brand.shareChips.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.06)",
                border: "2px solid #2a3348",
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
