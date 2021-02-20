/**
 * Rounds a number to the nearest step within a min/max range.
 *
 * @see https://stackoverflow.com/a/13635455
 * @param value - The value to round to the nearest step
 * @param min - The min value allowed
 * @param max - The max value allowed
 * @param steps - The number of steps in the min/max range
 * @param range - The range allowed for the value that defaults to `max - min`
 * @returns the value rounded to the nearest step in the min/max range
 * @remarks \@since 2.5.0 - Added the `range` param
 */
export function nearest(
  value: number,
  min: number,
  max: number,
  steps: number,
  range = max - min
): number {
  const rounded = Math.round(((value - min) * steps) / range) / steps;
  const zeroToOne = Math.min(Math.max(rounded, 0), 1);

  // have to calculate the number of allowed decimal places since decimal
  // precision gets weird:
  // 0.28 * 100 === 28.000000000000004
  const step = range / steps;
  const decimals = Number.isInteger(step)
    ? range % steps
    : step.toString().split(".")[1].length;

  return Math.min(
    max,
    Math.max(min, parseFloat((zeroToOne * range + min).toFixed(decimals)))
  );
}
