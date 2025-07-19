"use client";

import { createContext, useContext } from "react";

import { type KeyboardMovementContext } from "../movement/types.js";
import { DEFAULT_KEYBOARD_MOVEMENT_CONTEXT } from "../movement/useKeyboardMovementProvider.js";

/**
 * @since 6.4.0
 */
export type SpinButtonGroupContext = KeyboardMovementContext;

const context = createContext<SpinButtonGroupContext>(
  DEFAULT_KEYBOARD_MOVEMENT_CONTEXT
);
context.displayName = "SpinButtonGroup";

/**
 * This should be used along with the `useSpinButtonGroupProvider` to link
 * `SpinButton` components together. The next `SpinButton` will be focused as
 * an value is typed to completion.
 *
 * @since 6.4.0
 */
export const { Provider: SpinButtonGroupProvider } = context;

/**
 * @since 6.4.0
 */
export function useSpinButtonGroup(): Readonly<SpinButtonGroupContext> {
  return useContext(context);
}
