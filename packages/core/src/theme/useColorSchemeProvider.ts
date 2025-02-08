"use client";

import { useMemo } from "react";

import { type UseStateInitializer } from "../types.js";
import { useEnsuredState } from "../useEnsuredState.js";
import {
  type ColorScheme,
  type ColorSchemeContext,
  type ColorSchemeState,
} from "./types.js";
import { useColorSchemeMetaTag } from "./useColorSchemeMetaTag.js";
import { usePrefersDarkTheme } from "./usePrefersDarkScheme.js";

/**
 * @since 6.0.0
 */
export interface ColorSchemeProviderOptions extends Partial<ColorSchemeState> {
  /**
   * Set this to `true` to prevent a `<meta name="color-scheme" content="{COLOR_SCHEME}">`
   * from being added to the `document.head`.
   *
   * @defaultValue `false`
   */
  disableMetaTag?: boolean;

  /**
   * The current color scheme mode that is being used by your app. This should
   * match the `$color-scheme` SCSS variable.
   *
   * @defaultValue `"light"`
   */
  defaultColorScheme?: UseStateInitializer<ColorScheme>;
}

/**
 * @example
 * ```tsx
 * import { type ColorScheme } from "@react-md/core/theme/types";
 * import { ColorSchemeProvider } from "@react-md/core/theme/useColorScheme";
 * import { useColorSchemeProvider } from "@reat-md/core/theme/useColorSchemeProvider";
 * import { type PropsWithChildren, type ReactElement } from "react";
 * import Cookies from "js-cookie";
 *
 * function MyColorSchemeProvider(props: PropsWithChildren): ReactElement {
 *   const { children } = props;
 *
 *   const [colorScheme, setColorScheme] = useState<ColorScheme>(
 *     () => Cookies.get("colorScheme") || "system"
 *   );
 *   const value = useColorSchemeProvider({
 *     colorScheme,
 *     setColorScheme(nextValue) {
 *       setColorScheme((prevValue) => {
 *         const value = typeof nextValue === "function"
 *           ? nextValue(prevValue)
 *           : nextValue;
 *
 *         Cookies.set("colorScheme", value);
 *         return value;
 *       });
 *     }
 *   });
 *
 *   return <ColorSchemeProvider value={value}>{children}</ColorSchemeProvider>;
 * }
 * ```
 * @since 6.0.0
 */
export function useColorSchemeProvider(
  options?: { [key in keyof ColorSchemeState]?: never } & {
    disableMetaTag?: boolean;
    defaultColorScheme?: UseStateInitializer<ColorScheme>;
  }
): ColorSchemeContext;
export function useColorSchemeProvider(
  options: ColorSchemeState & {
    disableMetaTag?: boolean;
    defaultColorScheme?: never;
  }
): ColorSchemeContext;
export function useColorSchemeProvider(
  options: ColorSchemeProviderOptions = {}
): ColorSchemeContext {
  const {
    disableMetaTag,
    colorScheme: propColorScheme,
    setColorScheme: propSetColorScheme,
    defaultColorScheme,
  } = options;

  const [colorScheme, setColorScheme] = useEnsuredState({
    value: propColorScheme,
    setValue: propSetColorScheme,
    defaultValue: defaultColorScheme,
  });
  const prefersDarkTheme = usePrefersDarkTheme(colorScheme !== "system");
  const derivedColorScheme = prefersDarkTheme ? "dark" : "light";
  const currentColor =
    colorScheme === "system" ? derivedColorScheme : colorScheme;

  useColorSchemeMetaTag({
    disabled: disableMetaTag,
    colorScheme: currentColor,
  });

  return useMemo<ColorSchemeContext>(
    () => ({
      currentColor,
      colorScheme,
      setColorScheme,
    }),
    [currentColor, colorScheme, setColorScheme]
  );
}
