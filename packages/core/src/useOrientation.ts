import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * An extremely simple "polyfill" for the `window.screen.orientation` just for
 * the `type` value that is required for the `useOrientation` hook.
 *
 * @see {@Link https://caniuse.com/screen-orientation}
 * @returns the orientation type either from the `window.screen.orientation` or
 * by comparing the `availHeight` and `availWidth` on the `window.screen`
 * @internal
 */
export const getOrientationType = (): OrientationType => {
  if (typeof window === "undefined") {
    return "landscape-primary";
  }

  // Note: at the time of writing this, it looks like only Safari does not
  // support it from my list of browsers
  const screenOrientation = window.screen.orientation?.type;
  if (typeof screenOrientation === "string") {
    return screenOrientation;
  }

  const { availHeight, availWidth } = window.screen;

  return availHeight > availWidth ? "portrait-primary" : "landscape-primary";
};

/**
 * This hook uses the {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation} API
 * to determine if the screen is landscape or portrait. For browsers that do not
 * support this API yet, it will polyfill that behavior using a resize handler
 * instead.
 *
 * @see {@Link https://caniuse.com/screen-orientation}
 * @returns the current orientation type
 */
export function useOrientation(): OrientationType {
  const [orientation, setOrientation] = useState(getOrientationType);
  useIsomorphicLayoutEffect(() => {
    const handler = (): void => setOrientation(getOrientationType());

    const { orientation } = window.screen;
    if (orientation) {
      orientation.addEventListener("change", handler);
    } else {
      window.addEventListener("resize", handler);
    }

    return () => {
      if (orientation) {
        orientation.removeEventListener("change", handler);
      } else {
        window.removeEventListener("resize", handler);
      }
    };
  }, []);

  return orientation;
}
