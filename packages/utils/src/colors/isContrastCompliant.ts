import { getContrastRatio } from "./getContrastRatio";
import { HexString } from "./hexToRGB";

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
