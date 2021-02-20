/**
 * A simple util that will ensure that a number is within the optional min and
 * max values.
 *
 * @param value - The number to ensure that is within the range
 * @param min - The optional min value
 * @param max - The optional max value
 * @returns the updated value
 * @remarks \@since 2.5.0
 */
export function withinRange(
  value: number,
  min: number | undefined,
  max: number | undefined
): number {
  let nextValue = value;
  if (typeof min === "number") {
    nextValue = Math.max(min, nextValue);
  }

  if (typeof max === "number") {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
}
