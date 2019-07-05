import { useState, useEffect } from "react";

/**
 * This media query is used to determine the current orientation of the app
 * based on the `window.screen.orientation.type`. This will always be
 * `"landscape-primary"` server side unless a default value is provided.
 *
 * @param defaultValue an optional default value to use. When this is omitted,
 * it will default to `"landscape-primary"` unless the `window` is defined. If
 * the `window` is defined, it will immediately check the orientation type on
 * mount.
 * @return the orientation type value.
 */
export default function useOrientation(defaultValue?: OrientationType) {
  const [value, setValue] = useState<OrientationType>(() => {
    if (defaultValue) {
      return defaultValue;
    } else if (typeof window !== "undefined") {
      return window.screen.orientation.type;
    }

    return "landscape-primary";
  });

  useEffect(() => {
    const handler = () => {
      setValue(window.screen.orientation.type);
    };
    window.addEventListener("orientationchange", handler);

    return () => window.removeEventListener("orientationchange", handler);
  }, []);

  return value;
}
