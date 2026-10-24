import { getAllProjectLogs, getProjectSlugFromLog } from "@/data/post"
import { withBase } from "@/utils/path"
import { getCollection, type CollectionEntry } from "astro:content"

export function getProjectSlug(project: CollectionEntry<"project">): string {
  return project.id.replace(/\/index$/, "")
}

export function getProjectPath(project: CollectionEntry<"project">): string {
  return `/projects/${getProjectSlug(project)}/`
}

export function getProjectHref(project: CollectionEntry<"project">): string {
  return withBase(getProjectPath(project))
}

export async function getAllProjects(): Promise<CollectionEntry<"project">[]> {
  const projects = await getCollection(
    "project",
    ({ data }) => !data.ignore && (!import.meta.env.PROD || !data.draft),
  )
  return projects.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  )
}

export async function getProjectLogs(
  projectSlug: string,
): Promise<CollectionEntry<"projectLog">[]> {
  const logs = await getAllProjectLogs()
  return logs
    .filter((log) => getProjectSlugFromLog(log) === projectSlug)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
}

export async function getProjectBySlug(
  projectSlug: string,
): Promise<CollectionEntry<"project"> | undefined> {
  const projects = await getAllProjects()
  return projects.find((project) => getProjectSlug(project) === projectSlug)
}
