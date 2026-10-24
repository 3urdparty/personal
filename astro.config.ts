import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import { satteri } from "@astrojs/markdown-satteri"
import {
  blockExpressiveCode,
  inlineExpressiveCode,
} from "./src/lib/expressive-code"
import { temmlMath } from "./src/lib/math"
import { calloutDirective } from "./src/lib/callout"
import { externalLinks } from "./src/lib/external-links"
import { headingNamespace } from "./src/lib/heading-namespace"
import { headingAnchors } from "./src/lib/heading-anchors"
import { rehypeBasePath } from "./src/plugins/rehype-base-path"
import { rehypeTableScroll } from "./src/plugins/rehype-table-scroll"
import { remarkMermaid } from "./src/plugins/remark-mermaid"
import { remarkReadingTime } from "./src/plugins/remark-reading-time"

const BASE_PATH = process.env.BASE_PATH || "/"

export default defineConfig({
  site: "https://astro-erudite.vercel.app",
  base: BASE_PATH,
  compressHTML: true,
  prefetch: { prefetchAll: true },
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/posts\/[^/]+\/[^/]+\/?$/.test(page) &&
        !/\/authors\/[^/]+\/?$/.test(page) &&
        !page.includes("/tags/"),
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    processor: satteri({
      features: { directive: true, math: true },
      mdastPlugins: [
        remarkMermaid,
        remarkReadingTime,
        calloutDirective,
        inlineExpressiveCode,
        temmlMath,
      ],
      hastPlugins: [
        externalLinks,
        blockExpressiveCode,
        rehypeTableScroll,
        rehypeBasePath(BASE_PATH),
        headingNamespace,
        headingAnchors,
      ],
    }),
  },
})
