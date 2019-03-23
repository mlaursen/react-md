import { useState, useRef, useEffect, useCallback } from "react";
import { UserInteractionMode } from "./context";

/**
 * This is a small hook that is used to determine if the app is currently
 * being used by a touch device or not. All this really does is switch
 * between mousemove and touchstart events to determine which mode you are in.
 *
 * @param touchTimeout - This is the amount of time that can occur between a
 * touchstart and mousemove event but still be considered part of a "touch"
 * user mode. This should probably be kept at the default value, but if the
 * touch mode isn't updating as you would expect, you can try increasing or
 * decreasing this value until it does.
 * @return true if the app is in touch mode.
 */
export function useTouchDetection(touchTimeout: number = 500) {
  const [lastTouchTime, setTouchTime] = useState(0);
  const touchRef = useRef(lastTouchTime);
  useEffect(() => {
    touchRef.current = lastTouchTime;
  });

  const updateTouchTime = useCallback(() => {
    setTouchTime(Date.now());
  }, []);

  const resetTouchTime = useCallback(() => {
    const lastTouchTime = touchRef.current;
    if (Date.now() - lastTouchTime < touchTimeout) {
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
    if (lastTouchTime !== 0) {
      window.addEventListener("mousemove", resetTouchTime, true);
    }

    return () => {
      window.removeEventListener("mousemove", resetTouchTime, true);
    };
  }, [lastTouchTime]);

  return lastTouchTime !== 0;
}

/**
 * A small hook for checking if the app is currently being interacted with
 * by a keyboard.
 *
 * @return true if the app is in keyboard mode
 */
export function useKeyboardDetection() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef(enabled);
  useEffect(() => {
    ref.current = enabled;
  });

  const enable = useCallback(() => {
    if (!ref.current) {
      setEnabled(true);
    }
  }, []);

  const disable = useCallback(() => {
    if (ref.current) {
      setEnabled(false);
    }
  }, []);

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
  }, []);

  return enabled;
}

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

export function useModeClassName(mode: UserInteractionMode) {
  useEffect(() => {
    const className = `rmd-states--${mode}`;
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [mode]);
}
