import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Static HTML export: deploy the `out/` folder to Vercel, Hostinger or any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    // Inline the (small) Tailwind CSS into each page so the first paint
    // doesn't wait for a separate CSS request on slow mobile networks.
    inlineCss: true,
  },
}

export default nextConfig
