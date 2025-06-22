import { type MinMaxRange } from "../types.js";
import { getRangeSteps } from "./getRangeSteps.js";
import { nearest } from "./nearest.js";

/**
 * @since 6.0.0
 */
export interface GetMiddleOfRangeOptions extends MinMaxRange {
  step: number;
}

/**
 * @internal
 * @since 6.0.0
 */
export function getMiddleOfRange(options: GetMiddleOfRangeOptions): number {
  const { min, max, step } = options;

  return nearest({
    min,
    max,
    steps: getRangeSteps({ min, max, step }),
    value: (max - min) / 2 + min,
  });
}
