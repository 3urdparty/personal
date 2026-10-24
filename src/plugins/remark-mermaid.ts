import { defineMdastPlugin } from "satteri"

const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

export const remarkMermaid = defineMdastPlugin({
  name: "mermaid",
  code(node, ctx) {
    if (node.lang !== "mermaid") return
    const astro = ctx.data.astro
    if (astro) astro.frontmatter.hasMermaid = true
    return {
      rawHtml: `<pre class="mermaid" data-pagefind-ignore>${escapeHtml(node.value)}</pre>`,
    }
  },
})
