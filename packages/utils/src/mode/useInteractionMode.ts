import { useRef, useState } from "react";

import { UserInteractionMode } from "./types";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

/**
 * @internal
 */
const TOUCH_TIMEOUT = 1200;

/**
 * This hook helps determine the current interaction mode by attaching the
 * required event listeners to the window. The `mode` will always be defaulted
 * to `mouse` at first since it has the least possibilities of causing errors
 * with styles since the mouse-only styles are normally just `:hover` effects.
 *
 * ## Switching between modes:
 *
 * ### While in `mouse` mode:
 *
 * - any `keydown` event will switch to `keyboard` mode
 *   - this does have the side effect of meta keys also causing the switch over,
 *     but it feels fine since it helps show the current focus in the document
 *     as well
 * - any `touchstart` event will switch to `touch` mode
 *
 * ### While in `keyboard` mode:
 *
 * - any `mousedown` event will switch to `mouse` mode
 *   - it is perfectly okay to move the mouse while in keyboard mode, but still
 *     want to keep the keyboard styles until the user actually starts clicking
 * - any `touchstart` event will switch to `touch` mode
 *
 * ### While in `touch` mode:
 *
 * - any `mousemove` event will switch to `mouse` mode, but **only** if there
 *   hasn't been a `contextmenu` event within the last `1.2s`
 *   - you can really only switch back to `mouse` mode if you are using the
 *     devtools to emulate devices OR using a touch-desktop. I don't know how
 *     common this really is though.
 *   - touching the screen will always fire a `mousemove` event (which is why
 *     the `:hover` styles are normally with `rmd-utils-mouse-only`) and even
 *     after the `contextmenu` event. Normally want to go back to `mouse` mode
 *     when the mouse re-enters the `window`
 *
 * Note: It's currently impossible to switch from `touch` to `keyboard`
 * immediately. You'd first need to switch to `mouse` and then to `keyboard`. I
 * don't really know of any use-cases other than the weird touch-desktop stuff
 * and I have no experience using them.
 *
 * @internal
 */
export function useInteractionMode(): UserInteractionMode {
  const [mode, setMode] = useState<UserInteractionMode>("mouse");
  const lastTouchTime = useRef(0);
  const isTouchContextMenu = useRef(false);

  useIsomorphicLayoutEffect(() => {
    const enableMouseMode = (): void => setMode("mouse");
    const enableKeyboardMode = (): void => setMode("keyboard");

    const handleTouchStart = (): void => {
      lastTouchTime.current = Date.now();
      isTouchContextMenu.current = false;
      setMode("touch");
    };

    const handleMouseMove = (): void => {
      if (
        isTouchContextMenu.current ||
        Date.now() - lastTouchTime.current < TOUCH_TIMEOUT
      ) {
        isTouchContextMenu.current = false;
        return;
      }

      enableMouseMode();
    };
    const handleContextMenu = (): void => {
      isTouchContextMenu.current = true;
    };

    const className = `rmd-utils--${mode}`;
    document.body.classList.add(className);
    window.addEventListener("touchstart", handleTouchStart, true);
    if (mode === "mouse") {
      window.addEventListener("keydown", enableKeyboardMode, true);
    } else if (mode === "keyboard") {
      window.addEventListener("mousedown", enableMouseMode, true);
    } else {
      window.addEventListener("mousemove", handleMouseMove, true);
      window.addEventListener("contextmenu", handleContextMenu, true);
    }

    return () => {
      document.body.classList.remove(className);
      window.removeEventListener("touchstart", handleTouchStart, true);
      if (mode === "mouse") {
        window.removeEventListener("keydown", enableKeyboardMode, true);
      } else if (mode === "keyboard") {
        window.removeEventListener("mousedown", enableMouseMode, true);
      } else {
        window.removeEventListener("mousemove", handleMouseMove, true);
        window.removeEventListener("contextmenu", handleContextMenu, true);
      }
    };
  }, [mode]);

  return mode;
}
