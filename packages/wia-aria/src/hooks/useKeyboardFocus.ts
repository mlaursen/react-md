import { useContext } from "react";
import { KeyboardFocusContext } from "../contexts";
import { KeyboardFocusedId } from "../types.d";

/**
 * A simple hook to get the current keyboard focus context. You are most
 * likely looking for the `useKeyboardFocused` or `useKeyboardFocusedClassName`
 * hooks instead, but this can be used if you need to add custom keyboard-focus
 * ony behavior with the `setFocusedId` callback in the context.
 */
export function useKeyboardFocusContext() {
  return useContext(KeyboardFocusContext);
}

/**
 * Checks if the provided id is the current focused element and the app is
 * in keyboard mode.
 *
 * @param id The id to check agains
 * @return true if the app is in keyboard mode and the id is the current keyboard
 * focus
 */
export function useKeyboardFocused(id: KeyboardFocusedId) {
  const { focusedId, isKeyboardMode } = useKeyboardFocusContext();
  return isKeyboardMode && focusedId === id;
}

/**
 * This is a pretty nifty hook that will return a classname for an element
 * when it is the current keyboard focus in the app.
 *
 * @param id The id of the element
 * @param focusedClassName The class name to return when the element is focused.
 * This defaults to the base `@react-md/states` keyboard focus class name.
 * @return the focused class name or the empty stringstring | nule
 */
export function useKeyboardFocusedClassName(
  id: KeyboardFocusedId,
  focusedClassName: string = "rmd-states--focused"
) {
  return useKeyboardFocused(id) ? focusedClassName : "";
}
