import { type UseStateInitializer } from "../types.js";
import {
  getMiddleOfRange,
  type GetMiddleOfRangeOptions,
} from "./getMiddleOfRange.js";

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface RangeDefaultValueOptions extends GetMiddleOfRangeOptions {
  defaultValue?: UseStateInitializer<number>;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function getRangeDefaultValue(
  options: RangeDefaultValueOptions
): UseStateInitializer<number> {
  const { defaultValue } = options;
  if (typeof defaultValue !== "undefined") {
    return defaultValue;
  }

  return () => getMiddleOfRange(options);
}
