/**
 * Since time input steps are based on seconds, this is a simple helper to
 * create the step in a human-readable form.
 *
 * @since 6.3.0
 */
export interface TimeFieldStepOptions {
  /**
   * @defaultValue `0`
   */
  seconds?: number;

  /**
   * @defaultValue `0`
   */
  minutes?: number;

  /**
   * @defaultValue `0`
   */
  hours?: number;
}

/**
 * Since time input steps are based on seconds, this is a simple helper to
 * create the step in a human-readable form.
 *
 * @example Simple Example
 * ```tsx
 * const step1 = getTimeStep({ minutes: 15 });
 * const step2 = getTimeStep({ hours: 1 });
 * const step3 = getTimeStep({ seconds: 15, minutes: 30, hours: 2 });
 * ```
 *
 * @since 6.3.0
 */
export function getTimeStep(
  step: TimeFieldStepOptions | "any" | number | undefined
): number | "any" | undefined {
  if (!step || typeof step === "string" || typeof step === "number") {
    return step;
  }

  const { hours = 0, minutes = 0, seconds = 0 } = step;

  const total = Math.abs(Math.round(seconds + minutes * 60 + hours * 60 * 60));
  return total === 0 ? undefined : total;
}
