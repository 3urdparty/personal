const BASE = import.meta.env.BASE_URL.replace(/\/$/, "")

export function withBase(path: string): string {
  if (!path.startsWith("/") || !BASE || path.startsWith(`${BASE}/`)) return path
  return `${BASE}${path}`
}
