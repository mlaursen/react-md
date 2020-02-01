/**
 * Gets the current progress based on the min, max, and current value.
 *
 * @param min the min progress value
 * @param max the max progress value
 * @param value the current value for the progress bar
 * @return the progress as a percentage or undefined if there was no value
 * provided
 */
export default function getProgress(
  min: number,
  max: number,
  value?: number | undefined
): number | undefined {
  if (min >= max) {
    throw new RangeError(
      "A progress range must have the min value less than the max value"
    );
  }

  if (typeof value !== "number") {
    return undefined;
  }

  if (value > max || value < min) {
    throw new RangeError(
      "A progress value must be between the min and max values"
    );
  }

  const absMin = Math.abs(min);
  const absMax = Math.abs(max);
  const absValue = Math.abs(value);
  const trueMin = Math.min(absMin, absMax);
  const trueMax = Math.max(absMin, absMax);
  return Math.max(0, Math.min(1, absValue / (trueMax - trueMin)));
}
