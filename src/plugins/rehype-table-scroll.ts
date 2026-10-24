import { h } from "hastscript"
import { defineHastPlugin } from "satteri"

export const rehypeTableScroll = defineHastPlugin({
  name: "table-scroll",
  element: {
    filter: ["table"],
    visit(node, ctx) {
      ctx.wrapNode(node, h("div", { className: "table-scroll" }))
    },
  },
})
