import type { KeyboardMovementConfig } from "./types.js";

/**
 * Most custom keyboard functionality use these keys.
 *
 * @since 5.0.0
 * @internal
 */
export const DEFAULT_KEYBOARD_MOVEMENT: Readonly<KeyboardMovementConfig> = {
  incrementKeys: ["ArrowDown"],
  decrementKeys: ["ArrowUp"],
  jumpToFirstKeys: ["Home"],
  jumpToLastKeys: ["End"],
};

/**
 * @since 6.3.0
 * @internal
 */
export const DEFAULT_LTR_KEYBOARD_MOVEMENT_WITHOUT_JUMP: Readonly<KeyboardMovementConfig> =
  {
    incrementKeys: ["ArrowRight"],
    decrementKeys: ["ArrowLeft"],
    jumpToFirstKeys: [],
    jumpToLastKeys: [],
  };

/**
 * @since 5.1.2
 * @internal
 */
export const DEFAULT_LTR_KEYBOARD_MOVEMENT: Readonly<KeyboardMovementConfig> = {
  ...DEFAULT_LTR_KEYBOARD_MOVEMENT_WITHOUT_JUMP,
  jumpToFirstKeys: ["Home"],
  jumpToLastKeys: ["End"],
};

/**
 * @since 6.3.0
 * @internal
 */
export const DEFAULT_RTL_KEYBOARD_MOVEMENT_WITHOUT_JUMP: Readonly<KeyboardMovementConfig> =
  {
    incrementKeys: ["ArrowLeft"],
    decrementKeys: ["ArrowRight"],
    jumpToFirstKeys: [],
    jumpToLastKeys: [],
  };

/**
 * @since 5.1.2
 * @internal
 */
export const DEFAULT_RTL_KEYBOARD_MOVEMENT: Readonly<KeyboardMovementConfig> = {
  ...DEFAULT_RTL_KEYBOARD_MOVEMENT_WITHOUT_JUMP,
  jumpToFirstKeys: ["Home"],
  jumpToLastKeys: ["End"],
};
