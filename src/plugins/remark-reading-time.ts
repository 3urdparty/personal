import { defineMdastPlugin } from "satteri"

const WORDS_PER_MINUTE = 200

export const remarkReadingTime = defineMdastPlugin({
  name: "reading-time",
  text(node, ctx) {
    const previous = Number(ctx.data.readingWordCount ?? 0)
    const words = node.value.trim().match(/\S+/g)?.length ?? 0
    const total = previous + words
    ctx.data.readingWordCount = total
    const astro = ctx.data.astro
    if (astro) {
      const minutes = Math.max(1, Math.ceil(total / WORDS_PER_MINUTE))
      astro.frontmatter.minutesRead = `${minutes} min read`
    }
  },
})
