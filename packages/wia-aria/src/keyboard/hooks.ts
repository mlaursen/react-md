import { useContext } from "react";

import { KeyboardTrackerContext } from "./context";

/**
 * This is an extremely simple wrapper for getting the current keyboard
 * tracker context.
 */
export function useKeyboardFocusContext() {
  return useContext(KeyboardTrackerContext);
}

/**
 * This hook will check if the current element is focused via
 * keyboard by comparing the provided element id with the
 * keyboard tracker context's `focusedId`. This is extremely
 * helpful to use for applying class names on keyboard focus
 * only.
 */
export function useIsKeyboardFocused(elementId: string) {
  return elementId === useKeyboardFocusContext().focusedId;
}
