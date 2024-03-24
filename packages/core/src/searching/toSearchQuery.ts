import { type WhitespaceFilter } from "./types.js";

/**
 * @param s - The string to convert
 * @param whitespace - (default: `"keep"`)
 * @remarks \@since 6.0.0
 */
export function toSearchQuery(
  s: string,
  whitespace: WhitespaceFilter = "keep"
): string {
  let q = s.toLowerCase();
  if (whitespace === "ignore") {
    q = q.replace(/\s/g, "");
  } else if (whitespace === "trim") {
    q = q.trim();
  }

  return q;
}
