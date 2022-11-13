/** @internal */
export interface ParseCssLengthUnitOptions {
  /**
   *
   */
  value: number | string;

  /**
   * @defaultValue `16`
   */
  fallbackFontSize?: number;

  /**
   * @defaultValue `document.documentElement`
   */
  container?: Element | null;
}

/**
 * This is used to convert CSS length units into a number. At this time, it really only supports
 * - `px`
 * - `rem`
 * - `em` (if {@link ParseCssLengthUnitOptions.container} is provided)
 *
 * @example
 * Simple Example
 * ```ts
 * parseCssLengthUnit({ value: "24px" }) // 24
 * parseCssLengthUnit({ value: "3.5rem" }) // 56
 * parseCssLengthUnit({
 *   value: "3em",
 *   container: document.querySelector(SOME_QUERY),
 * }); // container's computed fontSize * 3
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths}
 * @internal
 * @remarks
 * \@since 6.0.0 This was renamed from `unitToNumber`
 */
export function parseCssLengthUnit(options: ParseCssLengthUnitOptions): number {
  const { value, container, fallbackFontSize = 16 } = options;

  if (typeof value === "number") {
    return value;
  }

  const parsed = parseFloat(value);
  if (/px$/i.test(value)) {
    return parsed;
  }

  if (typeof window === "undefined") {
    return parsed * fallbackFontSize;
  }

  const fontSize = parseFloat(
    window.getComputedStyle(container || document.documentElement).fontSize ||
      `${fallbackFontSize}px`
  );

  return parsed * fontSize;
}
