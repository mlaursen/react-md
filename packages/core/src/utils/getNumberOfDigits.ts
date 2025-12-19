/**
 * @since 6.4.0
 * @see {@link https://stackoverflow.com/a/28203456}
 */
export function getNumberOfDigits(value: number): number;
export function getNumberOfDigits(value: undefined): undefined;
export function getNumberOfDigits(
  value: number | undefined
): number | undefined;
export function getNumberOfDigits(
  value: number | undefined
): number | undefined {
  if (typeof value !== "number") {
    return;
  }

  // eslint-disable-next-line unicorn/prefer-math-trunc
  return (Math.log10((value ^ (value >> 31)) - (value >> 31)) | 0) + 1;
}
