import { SITE } from "@/consts"
import {
  getAllPosts,
  getPostTags,
  getRegularPosts,
  sortMDByDate,
  type PostEntry,
} from "@/data/post"
import type { CollectionEntry } from "astro:content"

export const pageTitle = (title: string) => `${title} | ${SITE.title}`

export async function getPosts(): Promise<CollectionEntry<"post">[]> {
  return sortMDByDate(
    (await getRegularPosts()).filter(
      ({ id }) => !id.includes("/") || id.endsWith("/index"),
    ),
  )
}

export async function getSubposts(): Promise<
  Map<string, CollectionEntry<"post">[]>
> {
  const posts = (await getRegularPosts()).filter(
    ({ id }) => id.includes("/") && !id.endsWith("/index"),
  )
  posts.sort((a, b) =>
    (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
    a.data.publishDate.getTime() - b.data.publishDate.getTime(),
  )
  return Map.groupBy(posts, (post) => post.id.split("/")[0])
}

export async function getTags(): Promise<Map<string, PostEntry[]>> {
  const posts = sortMDByDate(await getAllPosts())
  const tags = new Map<string, PostEntry[]>()
  for (const post of posts) {
    for (const tag of getPostTags(post)) {
      const tagged = tags.get(tag)
      if (tagged) tagged.push(post)
      else tags.set(tag, [post])
    }
  }
  return new Map(
    [...tags].sort(
      ([a, postsA], [b, postsB]) =>
        postsB.length - postsA.length || a.localeCompare(b),
    ),
  )
}
