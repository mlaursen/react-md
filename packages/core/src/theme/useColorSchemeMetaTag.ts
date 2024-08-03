"use client";
import { useEffect } from "react";
import { type ColorScheme } from "./types.js";

/**
 * @since 6.0.0
 */
export interface ColorSchemeMetaTagOptions {
  /**
   * @defaultValue `"false"`
   */
  disabled?: boolean;
  colorScheme: ColorScheme;
}

/**
 * Adds a `<meta name="color-scheme" content="light">` or
 * `<meta name="color-scheme" content="dark">` into the head element. This
 * should not be used if you are using the `useColorSchemeProvider` since it is
 * already built in.
 *
 * @since 6.0.0
 */
export function useColorSchemeMetaTag(
  options: ColorSchemeMetaTagOptions
): void {
  const { disabled, colorScheme } = options;

  useEffect(() => {
    if (disabled || document.querySelector('meta[name="color-scheme"]')) {
      return;
    }

    // Adding the meta tag allows the default browser styles for form inputs to
    // be updated as well.
    //
    // Chrome and Firefox:
    // - the input type="number"'s spinner color will update from grey to white
    // - native `<select>` background color updates from grey/white to a dark color
    //
    // Chrome:
    // - the date/time/datetime icons will change from black to white
    // - the date/time/datetime pickers will use a darker theme instead of white
    const meta = document.createElement("meta");
    meta.name = "color-scheme";
    meta.content = colorScheme;
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, [disabled, colorScheme]);
}
