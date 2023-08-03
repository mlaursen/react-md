"use client";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo } from "react";

import type { UseStateInitializer, UseStateSetter } from "../types";
import { useLocalStorage } from "../useLocalStorage";
import { useMediaQuery } from "../useMediaQuery";
import { backgroundColorVar } from "./cssVars";
import { getContrastRatio } from "./utils";

/** @remarks \@since 6.0.0 */
export type ColorScheme = "light" | "dark";

/** @remarks \@since 6.0.0 */
export type ColorSchemeMode = ColorScheme | "system";
/** @remarks \@since 6.0.0 */
export type SetColorSchemeMode = UseStateSetter<ColorSchemeMode>;

/** @remarks \@since 6.0.0 */
export interface ColorSchemeContext {
  /**
   * The current color scheme that is being used. This is only useful when the
   * {@link colorSchemeMode} is set to `"system"`.
   */
  colorScheme: ColorScheme;

  /**
   * The current color scheme mode that is being used by your app that should
   * default to the `$color-scheme` SCSS variable. If the
   * {@link setColorSchemeMode} is called, this will update to that new value.
   *
   * TODO: Figure out how to document this
   *
   * - `colorScheme` - only `light` or `dark` -- only useful when the `colorSchemeMode` is set to `system`
   * - `colorSchemeMode` - current **user** defined color scheme behavior? should default to `$color-scheme`, but will change based on `setColorSchemeMode`
   */
  colorSchemeMode: ColorSchemeMode;

  /**
   * A function to update the color scheme.
   *
   * @see {@link useColorScheme} for an example usage
   */
  setColorSchemeMode: SetColorSchemeMode;
}

const context = createContext<ColorSchemeContext>({
  colorScheme: "light",
  colorSchemeMode: "light",
  setColorSchemeMode() {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("The `ColorSchemeProvider` has not been initialized.");
    }
  },
});
context.displayName = "ColorScheme";
const { Provider } = context;

/** @remarks \@since 6.0.0 */
export type DefaultColorScheme = UseStateInitializer<ColorScheme>;

/**
 * @example
 * Lazy Load Configurable Themes
 * ```tsx
 * import type { ChangeEvent, ReactElement } from "react";
 * import { lazy } from "react";
 * import { createRoot } from "react-doc/client";
 * import { Checkbox, ColorSchemeProvider, useColorScheme } from "@react-md/core";
 *
 * const DarkTheme = lazy(() => import("./DarkTheme"));
 * const SystemTheme = lazy(() => import("./SystemTheme"));
 *
 * function App(): ReactElement {
 *   const { colorScheme, colorSchemeMode, setColorSchemeMode } =
 *     useColorScheme();
 *
 *   const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
 *     const { value } = event.currentTarget;
 *     if (value === "light" || value === "dark" || value === "system") {
 *       setColorSchemeMode(value);
 *     }
 *   };
 *
 *   return (
 *     <>
 *       {colorSchemeMode === "dark" && <DarkTheme />}
 *       {colorSchemeMode === "system" && <SystemTheme />}
 *       <Checkbox
 *         label="Light"
 *         value="light"
 *         checked={colorSchemeMode === "light"}
 *         onChange={onChange}
 *       />
 *       <Checkbox
 *         label="Dark"
 *         value="dark"
 *         checked={colorSchemeMode === "dark"}
 *         onChange={onChange}
 *       />
 *       <Checkbox
 *         label="System"
 *         value="system"
 *         checked={colorSchemeMode === "system"}
 *         onChange={onChange}
 *       />
 *     </>
 *   );
 * }
 *
 *
 * const root = createRoot(document.getElementById("root"));
 * root.render(
 *   <ColorSchemeProvider>
 *     <App />
 *   </ColorSchemeProvider>
 * );
 *
 * // DarkTheme.tsx
 * import { useHtmlClassName } from "@react-md/core";
 *
 * import styles from "./DarkTheme.module.scss";
 *
 * export default function DarkTheme(): null {
 *   useHtmlClassName(styles.theme);
 *   return null
 * }
 *
 * // DarkTheme.module.scss
 * @use "@react-md/core";
 *
 * .theme {
 *   @include core.use-dark-theme;
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function useColorScheme(): Readonly<ColorSchemeContext> {
  return useContext(context);
}

/** @remarks \@since 6.0.0 */
export interface ColorSchemeProviderProps {
  /**
   * The current color scheme mode that is being used by your app. This should
   * match the `$color-scheme` SCSS variable.
   *
   * @defaultValue `"light"`
   */
  mode?: ColorSchemeMode;

  /**
   * Set this to a string like `"colorScheme"` if you want to store the user's
   * color scheme preference in local storage.
   *
   * @defaultValue `""`
   */
  localStorageKey?: string;

  /**
   * Set this to `true` to prevent a `<meta name="color-scheme" content="{COLOR_SCHEME}">`
   * from being added to the `document.head`.
   *
   * @defaultValue `false`
   */
  disableMetaTag?: boolean;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @see {@link useColorScheme} for an example usage.
 * @remarks \@since 6.0.0
 */
export function ColorSchemeProvider(
  props: ColorSchemeProviderProps
): ReactElement {
  const {
    children,
    mode = "light",
    localStorageKey = "",
    disableMetaTag,
  } = props;
  const { value: colorSchemeMode, setValue: setColorSchemeMode } =
    useLocalStorage({
      key: localStorageKey,
      defaultValue: mode,
      deserializer: (item) =>
        item === "light" || item === "dark" || item === "system" ? item : mode,
    });

  const prefersDarkTheme = useMediaQuery(
    "(prefers-color-scheme: dark)",
    colorSchemeMode !== "system"
  );
  const derivedColorScheme = prefersDarkTheme ? "dark" : "light";
  const colorScheme =
    colorSchemeMode === "system" ? derivedColorScheme : colorSchemeMode;

  const value = useMemo<ColorSchemeContext>(
    () => ({
      colorScheme,
      colorSchemeMode,
      setColorSchemeMode,
    }),
    [colorScheme, colorSchemeMode, setColorSchemeMode]
  );
  if (process.env.NODE_ENV === "development") {
    /* eslint-disable react-hooks/rules-of-hooks, no-console */
    useEffect(() => {
      if (colorSchemeMode === "system") {
        return;
      }

      const rootElement = document.documentElement;
      const rootStyles = window.getComputedStyle(rootElement);
      const backgroundColor = rootStyles.getPropertyValue(backgroundColorVar);
      if (!backgroundColor) {
        console.warn(
          `The \`${backgroundColorVar}\` does not exist on the root element. ` +
            "This should only happen in tests or the `react-md` styles have not been loaded."
        );
        return;
      }

      const lightContrast = getContrastRatio(backgroundColor, "#fff");
      const darkContrast = getContrastRatio(backgroundColor, "#000");
      const isDarkMode = darkContrast < lightContrast;
      const isLightMode = lightContrast < darkContrast;
      if (
        (isDarkMode && colorSchemeMode === "light") ||
        (isLightMode && colorSchemeMode === "dark")
      ) {
        const currentMode = isDarkMode ? "dark" : "light";
        console.warn(
          `The \`mode\` for the \`ColorSchemeProvider\` has been set to "${colorSchemeMode}" but ` +
            `the root background color is "${currentMode}". ` +
            `This prop might need to be changed to "${currentMode}" or "system".`
        );
      }
    }, [colorSchemeMode]);
  }

  useEffect(() => {
    if (disableMetaTag || document.querySelector('meta[name="color-scheme"]')) {
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
    meta.content = colorSchemeMode === "system" ? colorScheme : colorSchemeMode;
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, [colorScheme, colorSchemeMode, disableMetaTag, mode]);

  return <Provider value={value}>{children}</Provider>;
}
