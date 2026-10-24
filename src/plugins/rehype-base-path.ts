import { defineHastPlugin } from "satteri"

export function rehypeBasePath(base: string) {
  const prefix = base.replace(/\/+$/, "")
  return defineHastPlugin({
    name: "base-path",
    element: [
      {
        filter: ["a"],
        visit(node, ctx) {
          const href = node.properties.href
          if (
            prefix &&
            typeof href === "string" &&
            href.startsWith("/") &&
            !href.startsWith("//") &&
            !href.startsWith(`${prefix}/`)
          ) {
            ctx.setProperty(node, "href", `${prefix}${href}`)
          }
        },
      },
      {
        filter: ["img"],
        visit(node, ctx) {
          const src = node.properties.src
          if (
            prefix &&
            typeof src === "string" &&
            src.startsWith("/") &&
            !src.startsWith("//") &&
            !src.startsWith(`${prefix}/`)
          ) {
            ctx.setProperty(node, "src", `${prefix}${src}`)
          }
        },
      },
    ],
  })
}
