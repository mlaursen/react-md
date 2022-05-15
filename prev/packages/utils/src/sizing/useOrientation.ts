import { useEffect, useState } from "react";

/**
 * An extremely simple "pollyfill" for the `window.screen.orientation` just for
 * the `type` value that is required for the `useOrientation` hook.
 */
export const getOrientationType = (): OrientationType => {
  const screenOrientation = window.screen.orientation?.type;
  if (typeof screenOrientation === "string") {
    return screenOrientation;
  }

  const { availHeight, availWidth } = window.screen;

  return availHeight > availWidth ? "portrait-primary" : "landscape-primary";
};

/**
 * This media query is used to determine the current orientation of the app
 * based on the `window.screen.orientation.type`. This will always be
 * `"landscape-primary"` server side unless a default value is provided.
 *
 * @param defaultValue - an optional default value to use. When this is omitted,
 * it will default to `"landscape-primary"` unless the `window` is defined. If
 * the `window` is defined, it will immediately check the orientation type on
 * mount.
 * @returns the orientation type value.
 */
export function useOrientation(
  defaultValue?: OrientationType
): OrientationType {
  const [value, setValue] = useState<OrientationType>(() => {
    if (defaultValue) {
      return defaultValue;
    }

    if (typeof window !== "undefined") {
      return getOrientationType();
    }

    return "landscape-primary";
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handler = (): void => {
      setValue(getOrientationType());
    };
    window.addEventListener("orientationchange", handler);

    return () => window.removeEventListener("orientationchange", handler);
  }, []);

  return value;
}
