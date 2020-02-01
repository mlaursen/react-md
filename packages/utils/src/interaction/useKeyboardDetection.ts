import { useEffect } from "react";

import useToggle from "../useToggle";

/**
 * A small hook for checking if the app is currently being interacted with by a
 * keyboard.
 *
 * @return true if the app is in keyboard mode
 * @private
 */
export default function useKeyboardDetection(): boolean {
  const [enabled, enable, disable] = useToggle(false);

  useEffect(() => {
    if (enabled) {
      return;
    }

    window.addEventListener("keydown", enable, true);

    return () => {
      window.removeEventListener("keydown", enable, true);
    };
  }, [enabled, enable]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    window.addEventListener("mousedown", disable, true);
    window.addEventListener("touchstart", disable, true);

    return () => {
      window.removeEventListener("mousedown", disable, true);
      window.removeEventListener("touchstart", disable, true);
    };
  }, [enabled, disable]);

  return enabled;
}
