import { useCallback, useEffect, useRef, useState } from "react";
import { useRefCache, useToggle } from "@react-md/utils";

/**
 * This is the current mode for how your user is interacting with your app. This
 * will be used to determine which type of state styles should be applied at
 * the time of interacting with an element on your page.
 */
export type UserInteractionMode = "keyboard" | "mouse" | "touch";

/**
 * This is a small hook that is used to determine if the app is currently
 * being used by a touch device or not. All this really does is switch
 * between mousemove and touchstart events to determine which mode you are in.
 * This also tracks the `contextmenu` appearance since long touchs can trigger
 * the context menu on mobile devices. When the context menu appears after a touch,
 * the mode will still be considered "touch" instead of swapping to mouse.
 *
 * @param touchTimeout - This is the amount of time that can occur between a
 * touchstart and mousemove event but still be considered part of a "touch"
 * user mode. This should probably be kept at the default value, but if the
 * touch mode isn't updating as you would expect, you can try increasing or
 * decreasing this value until it does.
 * @return true if the app is in touch mode.
 * @private
 */
export function useTouchDetection(touchTimeout: number = 1200) {
  const [lastTouchTime, setTouchTime] = useState(0);
  const touchRef = useRefCache(lastTouchTime);
  const contextMenuRef = useRef(false);

  const updateTouchTime = useCallback(() => {
    setTouchTime(Date.now());
    contextMenuRef.current = false;
  }, []);

  const resetTouchTime = useCallback(() => {
    const lastTouchTime = touchRef.current;
    if (contextMenuRef.current || Date.now() - lastTouchTime < touchTimeout) {
      contextMenuRef.current = false;
      return;
    }

    setTouchTime(0);
  }, []);

  useEffect(() => {
    window.addEventListener("touchstart", updateTouchTime, true);

    return () => {
      window.removeEventListener("touchstart", updateTouchTime, true);
    };
  }, []);

  useEffect(() => {
    if (lastTouchTime === 0) {
      contextMenuRef.current = false;
      return;
    }

    const updateContextMenu = () => {
      contextMenuRef.current = true;
    };

    window.addEventListener("mousemove", resetTouchTime, true);
    window.addEventListener("contextmenu", updateContextMenu, true);
    return () => {
      window.removeEventListener("mousemove", resetTouchTime, true);
      window.removeEventListener("contextmenu", updateContextMenu, true);
    };
  }, [lastTouchTime]);

  return lastTouchTime !== 0;
}

/**
 * A small hook for checking if the app is currently being interacted with
 * by a keyboard.
 *
 * @return true if the app is in keyboard mode
 * @private
 */
export function useKeyboardDetection() {
  const [enabled, enable, disable] = useToggle(false);

  useEffect(() => {
    if (enabled) {
      return;
    }

    window.addEventListener("keydown", enable, true);

    return () => {
      window.removeEventListener("keydown", enable, true);
    };
  }, [enabled]);

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
  }, [enabled]);

  return enabled;
}

/**
 * This hook combines the touch and keyboard detection hooks and returns a string
 * of the current interaction mode of the app/user.
 *
 * @private
 */
export function useModeDetection(): UserInteractionMode {
  const touch = useTouchDetection();
  const keyboard = useKeyboardDetection();

  if (touch) {
    return "touch";
  } else if (keyboard) {
    return "keyboard";
  }

  return "mouse";
}

/**
 * This hook will apply the current mode class name to the `document.body` so that the
 * specific mode style mixins work as expected.
 *
 * @private
 */
export function useModeClassName(mode: UserInteractionMode) {
  useEffect(() => {
    const className = `rmd-states--${mode}`;
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [mode]);
}
