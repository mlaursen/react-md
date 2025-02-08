import { type ColorScheme, type LightDarkColorScheme } from "./types.js";

/**
 * A type assertion helper to check if a value is a valid {@link LightDarkColorScheme}
 * when it is pulled from unknown sources (like local storage).
 *
 * @since 6.0.0
 */
export function isLightDarkColorScheme(
  value: unknown
): value is LightDarkColorScheme {
  return value === "light" || value === "dark";
}

/**
 * A type assertion helper to check if a value is a valid
 * {@link ColorScheme} when it is pulled from unknown sources (like local
 * storage).
 *
 * @since 6.0.0
 */
export function isColorScheme(value: unknown): value is ColorScheme {
  return isLightDarkColorScheme(value) || value === "system";
}
