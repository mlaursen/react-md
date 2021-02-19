/**
 * Gets the current percentage based on the min, max, and current value.
 *
 * @param min - the min value
 * @param max - the max value
 * @param value - the current value to compare against
 * @returns the percentage that the `value` is between the `min` and `max`
 * values.
 */
export function getPercentage(min: number, max: number, value: number): number {
  if (min >= max) {
    throw new RangeError(
      "A range must have the min value less than the max value"
    );
  }

  if (value > max || value < min) {
    throw new RangeError("A value must be between the min and max values");
  }

  const range = max - min;
  const start = value - min;
  const percentage = start / range;
  return Math.max(0, Math.min(Math.abs(percentage), 1));
}
