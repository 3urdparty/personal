import { glob } from "astro/loaders"
import { defineCollection, reference } from "astro:content"
import { z } from "astro/zod"
import type { ImageMetadata } from "astro"

const authors = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/authors",
  }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.url().or(z.string().startsWith("/")),
    bio: z.string().optional(),
    mail: z.email().optional(),
    socials: z.record(z.string(), z.url()).optional(),
  }),
})

const postFields = ({
  image,
}: {
  image: () => z.ZodType<ImageMetadata>
}) =>
  z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    order: z.number().optional(),
    tags: z
      .array(z.string())
      .default([])
      .transform((tags) => [...new Set(tags.map((tag) => tag.toLowerCase()))]),
    authors: z.array(reference("authors")).default([]),
    coverImage: z
      .object({
        alt: z.string(),
        src: image(),
      })
      .optional(),
    externalUrl: z.url().optional(),
    ogImage: z.string().optional(),
    ignore: z.boolean().default(false),
    draft: z.boolean().default(false),
  })

const post = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/post",
  }),
  schema: postFields,
})

const project = defineCollection({
  loader: glob({
    pattern: "*/index.{md,mdx}",
    base: "./src/content/project",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      ignore: z.boolean().default(false),
      draft: z.boolean().default(false),
      image: z.object({ alt: z.string(), src: image() }).optional(),
      links: z
        .object({ repository: z.url().optional(), website: z.url().optional() })
        .default({}),
      order: z.number().default(999),
      stack: z.array(z.string()).default([]),
      status: z.string().optional(),
    }),
})

const projectLog = defineCollection({
  loader: glob({
    pattern: "*/logs/**/[^_]*.{md,mdx}",
    base: "./src/content/project",
  }),
  schema: postFields,
})

export const collections = { authors, post, project, projectLog }
