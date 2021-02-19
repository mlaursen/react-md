import { HexString, hexToRGB } from "./hexToRGB";

const RED_MULTIPLIER = 0.2126;
const GREEN_MULTIPLIER = 0.7152;
const BLUE_MULTIPLIER = 0.0722;

/**
 * I really couldn't figure out how to name these "magic" numbers since the
 * formula doesn't really describe it much:
 *
 * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @internal
 */
function get8BitColor(color: number): number {
  color /= 255;

  if (color <= 0.03928) {
    return color / 12.92;
  }

  return ((color + 0.055) / 1.055) ** 2.4;
}

/**
 * A number closest to 0 should be closest to black while a number closest to 1
 * should be closest to white.
 *
 * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @internal
 */
export function getLuminance(color: HexString): number {
  const [r, g, b] = hexToRGB(color);

  const red = get8BitColor(r) * RED_MULTIPLIER;
  const green = get8BitColor(g) * GREEN_MULTIPLIER;
  const blue = get8BitColor(b) * BLUE_MULTIPLIER;

  return red + green + blue;
}
