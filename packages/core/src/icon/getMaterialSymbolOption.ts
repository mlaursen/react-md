import { type GoogleFontsAPIValueOrRange } from "./getMaterialSymbolsUrl.js";

/**
 * @internal
 * @since 7.1.0
 */
export function getMaterialSymbolOption<T extends number>(
  value: GoogleFontsAPIValueOrRange<T> | undefined,
  fallback: T
): string {
  if (!value) {
    return `${fallback}`;
  }

  if (typeof value === "number") {
    return `${value}`;
  }

  return `${value.min}..${value.max}`;
}
