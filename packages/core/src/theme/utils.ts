export type HexString = string;
export type RedBit = number;
export type GreenBit = number;
export type BlueBit = number;

const SHORTHAND_REGEX = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const VERBOSE_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

/**
 * Converts a hex string into an rgb value. This is useful for detecting color
 * contrast ratios and other stuff.
 *
 * @param hex - The hex string to convert
 * @returns an object containing the r, g, b values for the color.
 */
export function hexToRGB(hex: HexString): [RedBit, GreenBit, BlueBit] {
  if (
    process.env.NODE_ENV !== "production" &&
    !SHORTHAND_REGEX.test(hex) &&
    !VERBOSE_REGEX.test(hex)
  ) {
    throw new TypeError("Invalid color string.");
  }

  hex = hex.replace(
    SHORTHAND_REGEX,
    (_m, r, g, b) => `${r}${r}${g}${g}${b}${b}`
  );

  const result = hex.match(VERBOSE_REGEX) || [];
  const r = parseInt(result[1] || "", 16) || 0;
  const g = parseInt(result[2] || "", 16) || 0;
  const b = parseInt(result[3] || "", 16) || 0;

  return [r, g, b];
}

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

/**
 * The type of contrast ratio compliance to confirm to. The ratios in order are:
 * - 3:1 for large text (18pt normal or 14pt bold)
 * - 4.5:1 for normal text
 * - 7:1 for Level AAA requirements.
 *
 * @see https://www.w3.org/TR/WCAG20/#visual-audio-contrast
 * @see https://www.w3.org/TR/WCAG20/#larger-scaledef
 */
export type ContrastRatioCompliance = "large" | "normal" | "AAA";

/**
 * The contrast ratio that can be used for large text where large text is
 * considered 18pt or 14pt bold.
 */
export const LARGE_TEXT_CONTRAST_RATIO = 3;

/**
 * The contrast ratio that can be used for normal text.
 */
export const NORMAL_TEXT_CONTRAST_RATIO = 4.5;

/**
 * The AAA contrast ratio for passing WGAC 2.0 color contrast ratios.
 */
export const AAA_CONTRAST_RATIO = 7;

/**
 * Checks if there is an acceptable contrast ratio between the background and
 * foreground colors based on the provided compliance level.
 *
 * @param background - The background color to check against
 * @param foreground - The foreground color to check against
 * @param compliance - The compliance level to use or a custom number as a
 * ratio.
 * @returns true if there is enough contrast between the foreground and
 * background colors for the provided compliance level.
 */
export function isContrastCompliant(
  background: HexString,
  foreground: HexString,
  compliance: ContrastRatioCompliance | number = "normal"
): boolean {
  let ratio: number;
  switch (compliance) {
    case "large":
      ratio = LARGE_TEXT_CONTRAST_RATIO;
      break;
    case "normal":
      ratio = NORMAL_TEXT_CONTRAST_RATIO;
      break;
    case "AAA":
      ratio = AAA_CONTRAST_RATIO;
      break;
    default:
      ratio = compliance;
  }

  return getContrastRatio(background, foreground) >= ratio;
}
