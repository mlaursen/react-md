/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface RangeStepsOptions {
  min: number;
  max: number;
  step: number;
}

/**
 * Gets the number of steps in the allowed range of values.
 *
 * @internal
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Converted to using an object instead of multiple arguments and
 * renamed from `getSteps` to `getRangeSteps`.
 */
export const getRangeSteps = (options: RangeStepsOptions): number => {
  const { min, max, step } = options;

  return Math.abs(max - min) / step;
};
