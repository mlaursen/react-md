"use client";

import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSsr } from "../SsrProvider.js";
import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME } from "./constants.js";
import { getDerivedTheme } from "./getDerivedTheme.js";
import { type ConfigurableThemeColors, type ThemeContext } from "./types.js";
import { useColorScheme } from "./useColorScheme.js";

const context = createContext<Readonly<ThemeContext> | undefined>(undefined);
context.displayName = "Theme";
const { Provider } = context;

/**
 * This hook can be used to access the current theme set by the
 * {@link ThemeProvider}.
 *
 * @example Simple Example
 * ```tsx
 * import { useTheme } from "@react-md/core/theme/ThemeProvider";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const theme = useTheme();
 *
 *   return <pre><code>{JSON.stringify(theme, null, 2)}</code></pre>;
 * }
 * ```
 *
 * @since 6.0.0
 * @throws "The `ThemeProvider` has not been initialized."
 */
export function useTheme(): Readonly<ThemeContext>;

/**
 * @internal
 * @since 6.0.0
 */
export function useTheme(
  allowUndefined: true
): Readonly<ThemeContext> | undefined;

/**
 * @internal
 * @since 6.0.0
 * @throws "The `ThemeProvider` has not been initialized."
 */
export function useTheme(
  allowUndefined?: boolean
): Readonly<ThemeContext> | undefined {
  const theme = useContext(context);
  if (!theme && !allowUndefined) {
    throw new Error("The `ThemeProvider` has not been initialized.");
  }

  return theme;
}

/** @since 6.0.0 */
export interface ThemeProviderProps {
  /**
   * When this is `undefined`, the theme will be derived by computing the
   * `document.documentElement`'s styles for all the `react-md` theme custom
   * properties. The theme will also automatically update whenever the
   * `currentColor` or `colorScheme` change.
   *
   * It is recommended to manually provide your theme if you know it beforehand.
   * Deriving the theme is really only useful if you allow your user to
   * customize all these theme values themselves and persist through local
   * storage/cookies.
   *
   * @see {@link DEFAULT_DARK_THEME}
   * @see {@link DEFAULT_LIGHT_THEME}
   * @defaultValue `currentColor === "dark" ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME`
   */
  theme?: Readonly<ConfigurableThemeColors>;

  children: ReactNode;
}

/**
 * **Client Component**
 *
 * The `ThemeProvider` should be added to the root of your app but as a child of
 * the `CoreProviders`.
 *
 * @example
 * ```tsx
 * import { CoreProviders } from "@react-md/core/CoreProviders";
 * import {
 *   black,
 *   blue500,
 *   greenAccent700,
 *   orangeAccent200,
 *   orangeAccent400,
 *   red500,
 * } from "@react-md/core/theme/colors";
 * import { ThemeProvider } from "@react-md/core/theme/ThemeProvider";
 * import { type ConfigurableThemeColors } from "@react-md/core/theme/types";
 * import { type ReactElement } from "react";
 * import { createRoot } from "react-dom/client";
 *
 * import App from "./App";
 *
 * const theme: Readonly<ConfigurableThemeColors> = {
 *   primaryColor: blue500,
 *   onPrimaryColor: black,
 *   secondaryColor: orangeAccent400,
 *   onSecondaryColor: black,
 *   warningColor: orangeAccent200,
 *   onWarningColor: black,
 *   errorColor: red500,
 *   onErrorColor: black,
 *   successColor: greenAccent700,
 *   onSuccessColor: black,
 *   backgroundColor: "#121212",
 *   textPrimaryColor: "#d9d9d9",
 *   textSecondaryColor: "#b3b3b3",
 *   textHintColor: "gray", // #808080
 *   textDisabledColor: "gray", // #808080
 * };
 *
 * const container = document.getElementById("app");
 * const root = createRoot(container);
 * root.render(
 *   <CoreProviders>
 *     <ThemeProvider theme={theme}>
 *       <App />
 *     </ThemeProvider>
 *   </CoreProviders>
 * );
 * ```
 *
 * @example Automatically Deriving the Theme
 * ```tsx
 * import { CoreProviders } from "@react-md/core/CoreProviders";
 * import { LocalStorageColorSchemeProvider } from "@react-md/core/theme/LocalStorageColorSchemeProvider";
 * import { ThemeProvider } from "@react-md/core/theme/ThemeProvider";
 * import { type ReactElement } from "react";
 * import { createRoot } from "react-dom/client";
 *
 * import App from "./App";
 *
 * const container = document.getElementById("app");
 * const root = createRoot(container);
 * root.render(
 *   <CoreProviders>
 *     <LocalStorageColorSchemeProvider>
 *       <ThemeProvider>
 *         <App />
 *       </ThemeProvider>
 *     </LocalStorageColorSchemeProvider>
 *   </CoreProviders>
 * );
 * ```
 *
 * @see {@link https://react-md.dev/components/theme-provider | ThemeProvider Demos}
 * @since 6.0.0
 */
export function ThemeProvider(props: ThemeProviderProps): ReactElement {
  const { children, theme } = props;
  const ssr = useSsr();
  const { currentColor, colorScheme } = useColorScheme();
  const [derivedTheme, setDerivedTheme] = useState<ConfigurableThemeColors>(
    () => {
      if (theme) {
        return theme;
      }

      if (!ssr && typeof document !== "undefined") {
        return getDerivedTheme(document.documentElement);
      }

      return currentColor === "dark" ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    }
  );

  const derived = !theme;
  useEffect(() => {
    if (theme) {
      return;
    }

    // This has to be recalculated after an animation to ensure the new theme
    // styles have been applied. It will use the previous theme styles without
    // this frame.
    //
    // NOTE: This will not be correct the first time a new theme is lazy-loaded
    // and applied. It might be good to have a way to manually force this flow
    // again?
    const frame = window.requestAnimationFrame(() => {
      setDerivedTheme(getDerivedTheme(document.documentElement));
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [theme, currentColor, colorScheme]);

  const value = useMemo<ThemeContext>(() => {
    const backgroundColor =
      theme?.backgroundColor ?? derivedTheme.backgroundColor;
    const primaryColor = theme?.primaryColor ?? derivedTheme.primaryColor;
    const onPrimaryColor = theme?.onPrimaryColor ?? derivedTheme.onPrimaryColor;
    const secondaryColor = theme?.secondaryColor ?? derivedTheme.secondaryColor;
    const onSecondaryColor =
      theme?.onSecondaryColor ?? derivedTheme.onSecondaryColor;
    const warningColor = theme?.warningColor ?? derivedTheme.warningColor;
    const onWarningColor = theme?.onWarningColor ?? derivedTheme.onWarningColor;
    const errorColor = theme?.errorColor ?? derivedTheme.errorColor;
    const onErrorColor = theme?.onErrorColor ?? derivedTheme.onErrorColor;
    const successColor = theme?.successColor ?? derivedTheme.successColor;
    const onSuccessColor = theme?.onSuccessColor ?? derivedTheme.onSuccessColor;
    const textPrimaryColor =
      theme?.textPrimaryColor ?? derivedTheme.textPrimaryColor;
    const textSecondaryColor =
      theme?.textSecondaryColor ?? derivedTheme.textSecondaryColor;
    const textHintColor = theme?.textHintColor ?? derivedTheme.textHintColor;
    const textDisabledColor =
      theme?.textDisabledColor ?? derivedTheme.textDisabledColor;

    return {
      derived,
      backgroundColor,
      primaryColor,
      onPrimaryColor,
      secondaryColor,
      onSecondaryColor,
      warningColor,
      onWarningColor,
      errorColor,
      onErrorColor,
      successColor,
      onSuccessColor,
      textPrimaryColor,
      textSecondaryColor,
      textHintColor,
      textDisabledColor,
      setDerivedTheme,
    };
  }, [
    derived,
    derivedTheme.backgroundColor,
    derivedTheme.errorColor,
    derivedTheme.onErrorColor,
    derivedTheme.onPrimaryColor,
    derivedTheme.onSecondaryColor,
    derivedTheme.onSuccessColor,
    derivedTheme.onWarningColor,
    derivedTheme.primaryColor,
    derivedTheme.secondaryColor,
    derivedTheme.successColor,
    derivedTheme.textDisabledColor,
    derivedTheme.textHintColor,
    derivedTheme.textPrimaryColor,
    derivedTheme.textSecondaryColor,
    derivedTheme.warningColor,
    theme?.backgroundColor,
    theme?.errorColor,
    theme?.onErrorColor,
    theme?.onPrimaryColor,
    theme?.onSecondaryColor,
    theme?.onSuccessColor,
    theme?.onWarningColor,
    theme?.primaryColor,
    theme?.secondaryColor,
    theme?.successColor,
    theme?.textDisabledColor,
    theme?.textHintColor,
    theme?.textPrimaryColor,
    theme?.textSecondaryColor,
    theme?.warningColor,
  ]);

  return <Provider value={value}>{children}</Provider>;
}
