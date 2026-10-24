import { siteConfig } from "@/site.config"
import { withBase } from "@/utils/path"
import { getCollection, type CollectionEntry } from "astro:content"

export type PostEntry =
  | CollectionEntry<"post">
  | CollectionEntry<"projectLog">

export function isProjectLog(
  post: PostEntry,
): post is CollectionEntry<"projectLog"> {
  return post.collection === "projectLog"
}

export function getProjectSlugFromLog(
  post: CollectionEntry<"projectLog">,
): string {
  return post.id.split("/logs/")[0] ?? post.id
}

export function getProjectLogSlug(
  post: CollectionEntry<"projectLog">,
): string {
  return post.id.split("/logs/")[1] ?? post.id
}

export function getProjectTag(post: CollectionEntry<"projectLog">): string {
  return getProjectSlugFromLog(post)
}

export function getPostSlug(post: CollectionEntry<"post">): string {
  return post.id.replace(/\/index$/, "")
}

export function getPostTags(post: PostEntry): string[] {
  const tags = isProjectLog(post)
    ? [getProjectTag(post), ...post.data.tags]
    : post.data.tags
  return [...new Set(tags)]
}

export async function getRegularPosts(): Promise<CollectionEntry<"post">[]> {
  return getCollection(
    "post",
    ({ data }) => !data.ignore && (!import.meta.env.PROD || !data.draft),
  )
}

export async function getAllProjectLogs(): Promise<
  CollectionEntry<"projectLog">[]
> {
  return getCollection(
    "projectLog",
    ({ data }) => !data.ignore && (!import.meta.env.PROD || !data.draft),
  )
}

export async function getAllPosts(): Promise<PostEntry[]> {
  const [posts, projectLogs] = await Promise.all([
    getRegularPosts(),
    getAllProjectLogs(),
  ])
  return [...posts, ...projectLogs]
}

export function getPostPath(post: PostEntry): string {
  if (post.data.externalUrl) return post.data.externalUrl
  if (isProjectLog(post)) {
    return `/projects/${getProjectSlugFromLog(post)}/logs/${getProjectLogSlug(post)}/`
  }
  return `/posts/${getPostSlug(post)}/`
}

export function getPostHref(post: PostEntry): string {
  return withBase(getPostPath(post))
}

export function getPostSortDate(post: PostEntry): Date {
  return siteConfig.sortPostsByUpdatedDate && post.data.updatedDate
    ? post.data.updatedDate
    : post.data.publishDate
}

export function sortMDByDate<T extends PostEntry>(posts: T[]): T[] {
  return posts.sort(
    (a, b) => getPostSortDate(b).valueOf() - getPostSortDate(a).valueOf(),
  )
}

export function getAllTags(posts: PostEntry[]): string[] {
  return posts.flatMap(getPostTags)
}

export function getUniqueTags(posts: PostEntry[]): string[] {
  return [...new Set(getAllTags(posts))].sort((a, b) => a.localeCompare(b))
}

export function getUniqueTagsWithCount(
  posts: PostEntry[],
): [string, number][] {
  const counts = getAllTags(posts).reduce((map, tag) => {
    map.set(tag, (map.get(tag) ?? 0) + 1)
    return map
  }, new Map<string, number>())
  return [...counts.entries()].sort(([aTag, aCount], [bTag, bCount]) =>
    bCount === aCount ? aTag.localeCompare(bTag) : bCount - aCount,
  )
}

export function getPostsByTag(posts: PostEntry[], tag: string): PostEntry[] {
  return posts.filter((post) => getPostTags(post).includes(tag))
}
