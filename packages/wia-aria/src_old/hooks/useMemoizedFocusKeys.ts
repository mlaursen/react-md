import { useMemo } from "react";

import { KeyboardFocusKeys } from "../types.d";
import transformKeys from "../utils/transformKeys";

/**
 * A small hook that creates a memoized list of focus keys based on the provided
 * list of key strings. The `incrementKeys` will be defaulted to `"Tab"` if omitted
 * and the `decrementKeys` will be defaulted to `"Shift+Tab"`.
 */
export default function useMemoizedFocusKeys({
  incrementKeys = ["Tab"],
  decrementKeys = ["Shift+Tab"],
  jumpToFirstKeys = [],
  jumpToLastKeys = [],
}: KeyboardFocusKeys) {
  return useMemo(
    () => [
      ...transformKeys(incrementKeys, "increment"),
      ...transformKeys(decrementKeys, "decrement"),
      ...transformKeys(jumpToFirstKeys, "first"),
      ...transformKeys(jumpToLastKeys, "last"),
    ],
    [incrementKeys, decrementKeys, jumpToFirstKeys, jumpToLastKeys]
  );
}
