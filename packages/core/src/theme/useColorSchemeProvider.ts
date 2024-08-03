"use client";
import { useMemo } from "react";
import { type UseStateInitializer } from "../types.js";
import { useEnsuredState } from "../useEnsuredState.js";
import {
  type ColorSchemeContext,
  type ColorSchemeMode,
  type ColorSchemeModeBehavior,
} from "./types.js";
import { useColorSchemeMetaTag } from "./useColorSchemeMetaTag.js";
import { usePrefersDarkTheme } from "./usePrefersDarkScheme.js";

/**
 * @since 6.0.0
 */
export interface ColorSchemeProviderOptions
  extends Partial<ColorSchemeModeBehavior> {
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
  defaultColorSchemeMode?: UseStateInitializer<ColorSchemeMode>;
}

/**
 * @example
 * ```tsx
 * import {
 *   ColorSchemeProvider,
 *   useColorSchemeProvider,
 *   type ColorSchemeMode,
 * } from "@react-md/core";
 * import { type PropsWithChildren, type ReactElement } from "react";
 * import Cookies from "js-cookie";
 *
 * function MyColorSchemeProvider(props: PropsWithChildren): ReactElement {
 *   const { children } = props;
 *
 *   const [colorSchemeMode, setColorSchemeMode] = useState<ColorSchemeMode>(
 *     () => Cookies.get("colorSchemeMode") || "system"
 *   );
 *   const value = useColorSchemeProvider({
 *     colorSchemeMode,
 *     setColorSchemeMode(nextValue) {
 *       setColorSchemeMode((prevValue) => {
 *         const value = typeof nextValue === "function"
 *           ? nextValue(prevValue)
 *           : nextValue;
 *
 *         Cookies.set("colorSchemeMode", value);
 *         return value;
 *       });
 *     }
 *   });
 *
 *   return <ColorSchemeProvider value={value}>{children}</ColorSchemeProvider>
 * }
 * ```
 * @since 6.0.0
 */
export function useColorSchemeProvider(
  options?: { [key in keyof ColorSchemeModeBehavior]?: never } & {
    disableMetaTag?: boolean;
    defaultColorSchemeMode?: UseStateInitializer<ColorSchemeMode>;
  }
): ColorSchemeContext;
export function useColorSchemeProvider(
  options: ColorSchemeModeBehavior & {
    disableMetaTag?: boolean;
    defaultColorSchemeMode?: never;
  }
): ColorSchemeContext;
export function useColorSchemeProvider(
  options: ColorSchemeProviderOptions = {}
): ColorSchemeContext {
  const {
    disableMetaTag,
    colorSchemeMode: value,
    setColorSchemeMode: setValue,
    defaultColorSchemeMode,
  } = options;

  const [colorSchemeMode, setColorSchemeMode] = useEnsuredState({
    value,
    setValue,
    defaultValue: defaultColorSchemeMode,
  });
  const prefersDarkTheme = usePrefersDarkTheme(colorSchemeMode !== "system");
  const derivedColorScheme = prefersDarkTheme ? "dark" : "light";
  const colorScheme =
    colorSchemeMode === "system" ? derivedColorScheme : colorSchemeMode;

  useColorSchemeMetaTag({
    disabled: disableMetaTag,
    colorScheme,
  });

  return useMemo<ColorSchemeContext>(
    () => ({
      colorScheme,
      colorSchemeMode,
      setColorSchemeMode,
    }),
    [colorScheme, colorSchemeMode, setColorSchemeMode]
  );
}
