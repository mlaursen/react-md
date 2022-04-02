import { createContext, useContext } from "react";

import type { KeyboardFocusContext, KeyboardMovementConfig } from "./types";

/**
 * @remarks \@since 5.0.0
 * @internal
 */
const noop = (): void => {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("KeyboardMovementProvider must be a parent component.");
  }
};

/**
 * Most custom keyboard functionality use these keys.
 *
 * @remarks \@since 5.0.0
 * @internal
 */
export const DEFAULT_KEYBOARD_MOVEMENT: Readonly<KeyboardMovementConfig> = {
  incrementKeys: ["ArrowDown"],
  decrementKeys: ["ArrowUp"],
  jumpToFirstKeys: ["Home"],
  jumpToLastKeys: ["End"],
};

/**
 * @remarks \@since 5.1.2
 * @internal
 */
export const DEFAULT_LTR_KEYBOARD_MOVEMENT: Readonly<KeyboardMovementConfig> = {
  incrementKeys: ["ArrowRight"],
  decrementKeys: ["ArrowLeft"],
  jumpToFirstKeys: ["Home"],
  jumpToLastKeys: ["End"],
};

/**
 * @remarks \@since 5.1.2
 * @internal
 */
export const DEFAULT_RTL_KEYBOARD_MOVEMENT: Readonly<KeyboardMovementConfig> = {
  incrementKeys: ["ArrowLeft"],
  decrementKeys: ["ArrowRight"],
  jumpToFirstKeys: ["Home"],
  jumpToLastKeys: ["End"],
};

/**
 * @remarks \@since 5.0.0
 * @internal
 */
const context = createContext<KeyboardFocusContext>({
  attach: noop,
  detach: noop,
  watching: { current: [] },
  loopable: false,
  searchable: false,
  horizontal: false,
  includeDisabled: false,
  config: { current: DEFAULT_KEYBOARD_MOVEMENT },
});
context.displayName = "KeyboardMovement";

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const { Provider: KeyboardMovementContextProvider } = context;

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export function useKeyboardFocusContext(): Readonly<KeyboardFocusContext> {
  return useContext(context);
}
