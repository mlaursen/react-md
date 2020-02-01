import { useState, useRef, useCallback, useEffect } from "react";
import useRefCache from "../useRefCache";

export const DEFAULT_TOUCH_TIMEOUT = 1200;

/**
 * This is a small hook that is used to determine if the app is currently being
 * used by a touch device or not. All this really does is switch between
 * mousemove and touchstart events to determine which mode you are in.  This
 * also tracks the `contextmenu` appearance since long touches can trigger the
 * context menu on mobile devices. When the context menu appears after a touch,
 * the mode will still be considered "touch" instead of swapping to mouse.
 *
 * @param touchTimeout This is the amount of time that can occur between a
 * touchstart and mousemove event but still be considered part of a "touch" user
 * mode. This should probably be kept at the default value, but if the touch
 * mode isn't updating as you would expect, you can try increasing or decreasing
 * this value until it does.
 * @return true if the app is in touch mode.
 * @private
 */
export default function useTouchDetection(
  touchTimeout: number = DEFAULT_TOUCH_TIMEOUT
): boolean {
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
    // disabled since useRefCache for touchRef
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchTimeout]);

  useEffect(() => {
    window.addEventListener("touchstart", updateTouchTime, true);

    return () => {
      window.removeEventListener("touchstart", updateTouchTime, true);
    };
  }, [updateTouchTime]);

  useEffect(() => {
    if (lastTouchTime === 0) {
      contextMenuRef.current = false;
      return;
    }

    const updateContextMenu = (): void => {
      contextMenuRef.current = true;
    };

    window.addEventListener("mousemove", resetTouchTime, true);
    window.addEventListener("contextmenu", updateContextMenu, true);
    return () => {
      window.removeEventListener("mousemove", resetTouchTime, true);
      window.removeEventListener("contextmenu", updateContextMenu, true);
    };
  }, [lastTouchTime, resetTouchTime]);

  return lastTouchTime !== 0;
}
