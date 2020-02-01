import useTouchDetection from "./useTouchDetection";
import useKeyboardDetection from "./useKeyboardDetection";

/**
 * This is the current mode for how your user is interacting with your app. This
 * will be used to determine which type of state styles should be applied at the
 * time of interacting with an element on your page.
 */
export type UserInteractionMode = "keyboard" | "mouse" | "touch";

/**
 * This hook combines the touch and keyboard detection hooks and returns a
 * string of the current interaction mode of the app/user.
 *
 * @private
 */
export default function useModeDetection(): UserInteractionMode {
  const touch = useTouchDetection();
  const keyboard = useKeyboardDetection();

  if (touch) {
    return "touch";
  }

  if (keyboard) {
    return "keyboard";
  }

  return "mouse";
}
