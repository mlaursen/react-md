import { useContext } from "react";
import { KeyboardFocusContext } from "../contexts";
import { KeyboardFocusedId } from "../types.d";

export function useKeyboardFocusContext() {
  return useContext(KeyboardFocusContext);
}

export function useKeyboardFocused(id: KeyboardFocusedId) {
  const { focusedId, isKeyboardMode } = useKeyboardFocusContext();
  return isKeyboardMode && focusedId === id;
}

export function useKeyboardFocusedClassName(
  id: string | null,
  focusedClassName: string = "rmd-states--focused"
) {
  return useKeyboardFocused(id) ? focusedClassName : "";
}

export {
  default as useKeyboardFocusEventHandler,
} from "./useKeyboardFocusEventHandler";
export { default as useKeyboardFocusState } from "./useKeyboardFocusState";
