import { defineCollection, z } from "astro:content";
import { slugify } from "../lib/categories";

// Accept a single string or an array; always produce a non-empty slug array.
const toCategoryArray = (v: unknown) =>
  (Array.isArray(v) ? v : [v]).filter((x): x is string => typeof x === "string");

// One unified collection. Each post declares one or more free-form `categories`
// (any string; slugified here). Posts are mapped under every category they list.
// Topic-specific fields are optional and only render when present.
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categories: z.preprocess(
      toCategoryArray,
      z.array(z.string()).min(1).transform((a) => a.map(slugify)),
    ),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),

    // threat-intel extras (all optional)
    severity: z.enum(["info", "low", "medium", "high", "critical"]).optional(),
    cves: z.array(z.string()).default([]),
    iocs: z.array(z.string()).default([]),

    // programming extra
    lang: z.string().optional(),
  }),
});

export const collections = { posts };
