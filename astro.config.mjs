import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Static frontend. Rust dashboard backends are reached at runtime in the
// browser via PUBLIC_API_BASE (see src/lib/api.ts) — they are NOT built here.
export default defineConfig({
  site: "https://hyperlisk.ca",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },
});
