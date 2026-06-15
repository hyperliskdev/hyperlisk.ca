import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

// Custom remark plugin to intercept mermaid code blocks and render them as raw <pre class="mermaid">
function remarkMermaid() {
  return (tree) => {
    visit(tree);

    function visit(node) {
      if (node.type === "code" && node.lang === "mermaid") {
        node.type = "paragraph";
        node.children = [];
        node.data = {
          hName: "pre",
          hProperties: { className: ["mermaid"] },
          hChildren: [{ type: "text", value: node.value }],
        };
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    }
  };
}

// Static frontend. Rust dashboard backends are reached at runtime in the
// browser via PUBLIC_API_BASE (see src/lib/api.ts) — they are NOT built here.
export default defineConfig({
  site: "https://hyperlisk.ca",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, remarkMermaid],
    rehypePlugins: [rehypeSlug, rehypeKatex],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },
});
