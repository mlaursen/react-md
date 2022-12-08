/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface WithinRangeOptions {
  min: number | undefined;
  max: number | undefined;
  value: number;
}

/**
 * A simple util that will ensure that a number is within the optional min and
 * max values.
 *
 * @returns the updated value
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Converted to using an object instead of multiple arguments.
 */
export function withinRange(options: WithinRangeOptions): number {
  const { min, max, value } = options;

  let nextValue = value;
  if (typeof min === "number") {
    nextValue = Math.max(min, nextValue);
  }

  if (typeof max === "number") {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
}
