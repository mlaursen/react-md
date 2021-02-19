export type HexString = string;
export type RedBit = number;
export type GreenBit = number;
export type BlueBit = number;

const SHORTHAND_REGEX = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const VERBOSE_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

/**
 * Converts a hex string into an rgb value. This is useful for deteching color
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
