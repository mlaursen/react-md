import { type ColorScheme, type ColorSchemeMode } from "./types.js";

/**
 * A type assertion helper to check if a value is a valid {@link ColorScheme}
 * when it is pulled from unknown sources (like local storage).
 *
 * @since 6.0.0
 */
export function isColorScheme(value: unknown): value is ColorScheme {
  return value === "light" || value === "dark";
}

/**
 * A type assertion helper to check if a value is a valid
 * {@link ColorSchemeMode} when it is pulled from unknown sources (like local
 * storage).
 *
 * @since 6.0.0
 */
export function isColorSchemeMode(value: unknown): value is ColorSchemeMode {
  return isColorScheme(value) || value === "system";
}
