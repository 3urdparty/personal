export {}

const diagrams = Array.from(document.querySelectorAll<HTMLElement>("pre.mermaid"))

if (diagrams.length) {
  const sources = new Map(diagrams.map((node) => [node, node.textContent ?? ""]))
  let renderId = 0
  let pending = Promise.resolve()

  const renderDiagrams = () => {
    pending = pending
      .then(async () => {
        const mermaidUrl =
          "https://cdn.jsdelivr.net/npm/mermaid@12.1.0/dist/mermaid.esm.min.mjs"
        const { default: mermaid } = await import(
          /* @vite-ignore */ mermaidUrl
        )
        await document.fonts.ready
        const dark =
          document.documentElement.dataset.theme === "dark" ||
          (!document.documentElement.dataset.theme &&
            matchMedia("(prefers-color-scheme: dark)").matches)

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          suppressErrorRendering: true,
          theme: dark ? "dark" : "neutral",
          fontFamily: "IBM Plex Sans, sans-serif",
          flowchart: { htmlLabels: false, curve: "linear" },
        })

        for (const [node, source] of sources) {
          try {
            const { svg } = await mermaid.render(
              `mermaid-diagram-${renderId++}`,
              source,
            )
            node.innerHTML = svg
            node.dataset.rendered = "true"
          } catch (error) {
            console.error("Could not render Mermaid diagram", error)
          }
        }
      })
      .catch((error) => console.error("Could not load Mermaid", error))
  }

  renderDiagrams()
  document.addEventListener("theme-change", renderDiagrams)
}
