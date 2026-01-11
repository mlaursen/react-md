import { type ValueOrRange } from "./types.js";

export function getMaterialSymbolOption<T extends number>(
  value: ValueOrRange<T> | undefined,
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
