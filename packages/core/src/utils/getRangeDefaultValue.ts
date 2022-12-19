import type { UseStateInitializer } from "../types";
import { getRangeSteps } from "./getRangeSteps";
import { nearest } from "./nearest";

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface RangeDefaultValueOptions {
  min: number;
  max: number;
  step: number;
  defaultValue?: UseStateInitializer<number>;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function getRangeDefaultValue(
  options: RangeDefaultValueOptions
): UseStateInitializer<number> {
  const { min, max, step, defaultValue } = options;
  if (typeof defaultValue !== "undefined") {
    return defaultValue;
  }

  return () =>
    nearest({
      min,
      max,
      steps: getRangeSteps({ min, max, step }),
      value: (max - min) / 2,
    });
}
