import type { APIRoute } from "astro"
import { withBase } from "@/utils/path"

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase("/sitemap-index.xml"), site)
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`)
}
