"use client";
import { useMediaQuery } from "../media-queries/useMediaQuery.js";

/**
 * A simple wrapper around the {@link useMediaQuery} hook with:
 * `"(prefers-color-scheme: dark)"`.
 *
 * @remarks \@since 6.0.0
 */
export function usePrefersDarkTheme(disabled = false): boolean {
  return useMediaQuery("(prefers-color-scheme: dark)", disabled);
}
