/**
 * Category registry — OPTIONAL metadata overrides for post topics.
 *
 * Categories are free-form: a post can declare any number of categories in its
 * frontmatter and they don't need to be registered here. This list only exists
 * to give a few "featured" categories nicer labels, titles, blurbs, and fixed
 * colours. Anything not listed here is derived automatically (humanised label,
 * a stable hash-based colour).
 *
 * Add a featured topic: append an entry. Optionally add a matching
 * `--cat-<slug>` colour in global.css, or set `color` here directly.
 */

export interface Category {
  slug: string;
  /** Short nav/badge label. Defaults to a humanised slug. */
  label?: string;
  /** Page heading. Defaults to the label. */
  title?: string;
  /** One-line blurb for the category landing page + home grid. */
  blurb?: string;
  /** Fixed accent colour (any CSS colour). Defaults to a hashed hue. */
  color?: string;
}

export const categories: Category[] = [];

const registry = new Map(categories.map((c) => [c.slug, c]));

/** Normalise any string into a URL/identifier-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Turn a slug back into a human-friendly label ("threat-intel" → "threat intel"). */
export function humanize(slug: string): string {
  return slug.replace(/-/g, " ");
}

/** Featured registry entry for a slug, if any. */
export function getCategory(slug: string): Category | undefined {
  return registry.get(slug);
}

export function categoryLabel(slug: string): string {
  return registry.get(slug)?.label ?? humanize(slug);
}

export function categoryTitle(slug: string): string {
  const c = registry.get(slug);
  return c?.title ?? c?.label ?? titleCase(humanize(slug));
}

export function categoryBlurb(slug: string): string | undefined {
  return registry.get(slug)?.blurb;
}

/** Stable colour for a slug: registry override, else a hashed hue. */
export function categoryColor(slug: string): string {
  const override = registry.get(slug)?.color;
  if (override) return override;
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 360;
  }
  return `hsl(${hash} 62% 52%)`;
}

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (m) => m.toUpperCase());
}
