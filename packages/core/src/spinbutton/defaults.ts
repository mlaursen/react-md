import { getNumberOfDigits } from "../utils/getNumberOfDigits.js";
import {
  type GetSpinButtonTextContentOptions,
  type SpinButtonGetValueText,
} from "./types.js";

/**
 * @since 6.4.0
 */
export const defaultSpinButtonGetValueText: SpinButtonGetValueText = (value) =>
  value === null ? "No value selected" : undefined;

/**
 * @since 6.4.0
 */
export function defaultGetSpinButtonTextContent(
  options: GetSpinButtonTextContentOptions
): string {
  const {
    min,
    value,
    fallback,
    placeholderChar = "0",
    minDigits = fallback?.length ?? getNumberOfDigits(min),
  } = options;

  if (value === null) {
    if (typeof fallback === "string") {
      return fallback;
    }

    if (!minDigits) {
      return "";
    }

    return "-".repeat(minDigits);
  }

  let text = `${value}`;
  if (minDigits) {
    text = text.padStart(minDigits, placeholderChar);
  }

  return text;
}
