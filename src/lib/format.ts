export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Rough reading time in minutes from raw markdown (~200 wpm, min 1). */
export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
