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
