import { getLuminance } from "./getLuminance";
import { HexString } from "./hexToRGB";

/**
 * Gets the contrast ratio between a background color and a foreground color.
 *
 * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param background - The background color
 * @param foreground - The foreground color. This is normally the `color` css
 * value.
 * @returns the contrast ratio between the background and foreground colors.
 */
export function getContrastRatio(
  background: HexString,
  foreground: HexString
): number {
  const backgroundLuminance = getLuminance(background) + 0.05;
  const foregroundLuminance = getLuminance(foreground) + 0.05;

  return (
    Math.max(backgroundLuminance, foregroundLuminance) /
    Math.min(backgroundLuminance, foregroundLuminance)
  );
}
