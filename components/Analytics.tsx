import Script from "next/script"
import { siteConfig } from "@/config/site"

/** Google Analytics 4. Renders nothing unless NEXT_PUBLIC_GA_ID is set. */
export function Analytics() {
  const id = siteConfig.gaId
  if (!id) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  )
}
