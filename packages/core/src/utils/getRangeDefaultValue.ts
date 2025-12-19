import { type UseStateInitializer } from "../types.js";
import {
  type GetMiddleOfRangeOptions,
  getMiddleOfRange,
} from "./getMiddleOfRange.js";

/**
 * @internal
 * @since 6.0.0
 */
export interface RangeDefaultValueOptions extends GetMiddleOfRangeOptions {
  defaultValue?: UseStateInitializer<number>;
}

/**
 * @internal
 * @since 6.0.0
 */
export function getRangeDefaultValue(
  options: RangeDefaultValueOptions
): UseStateInitializer<number> {
  const { defaultValue } = options;
  if (defaultValue !== undefined) {
    return defaultValue;
  }

  return () => getMiddleOfRange(options);
}
