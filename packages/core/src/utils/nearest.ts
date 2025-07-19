import { type MinMaxRange } from "../types.js";
import { getNumberOfDigits } from "./getNumberOfDigits.js";

/**
 * @internal
 * @since 6.0.0
 */
export interface NearestOptions extends MinMaxRange {
  steps: number;
  value: number;

  /** @defaultValue `max - min` */
  range?: number;
}

/**
 * Rounds a number to the nearest step within a min/max range.
 *
 * @see https://stackoverflow.com/a/13635455
 * @returns the value rounded to the nearest step in the min/max range
 * @since 2.5.0 Added the `range` param
 * @since 6.0.0 Converted to using an object instead of multiple arguments.
 */
export function nearest(options: NearestOptions): number {
  const { min, max, steps, value, range = max - min } = options;
  if (min === max) {
    return max;
  }

  const rounded = Math.round(((value - min) * steps) / range) / steps;
  const zeroToOne = Math.min(Math.max(rounded, 0), 1);

  // have to calculate the number of allowed decimal places since decimal
  // precision gets weird:
  // 0.28 * 100 === 28.000000000000004
  const step = range / steps;
  const decimals = Number.isInteger(step)
    ? range % steps
    : getNumberOfDigits(parseInt(`${step}`.split(".")[1]));

  return Math.min(
    max,
    Math.max(min, parseFloat((zeroToOne * range + min).toFixed(decimals)))
  );
}
