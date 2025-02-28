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
import { type UseStateSetter } from "../types.js";
import {
  black,
  blue500,
  greenAccent700,
  orangeAccent200,
  orangeAccent400,
  red500,
} from "./colors.js";
import {
  backgroundColorVar,
  errorColorVar,
  onErrorColorVar,
  onPrimaryColorVar,
  onSecondaryColorVar,
  onSuccessColorVar,
  onWarningColorVar,
  primaryColorVar,
  secondaryColorVar,
  successColorVar,
  textDisabledColorVar,
  textHintColorVar,
  textPrimaryColorVar,
  textSecondaryColorVar,
  warningColorVar,
} from "./cssVars.js";
import { useColorScheme } from "./useColorScheme.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-background-color"?: string;
    "--rmd-on-background-color"?: string;
    "--rmd-surface-color"?: string;
    "--rmd-primary-color"?: string;
    "--rmd-on-primary-color"?: string;
    "--rmd-secondary-color"?: string;
    "--rmd-on-secondary-color"?: string;
    "--rmd-warning-color"?: string;
    "--rmd-on-warning-color"?: string;
    "--rmd-error-color"?: string;
    "--rmd-on-error-color"?: string;
    "--rmd-success-color"?: string;
    "--rmd-on-success-color"?: string;
    "--rmd-text-primary-color"?: string;
    "--rmd-text-secondary-color"?: string;
    "--rmd-text-hint-color"?: string;
    "--rmd-text-disabled-color"?: string;

    "--rmd-outline-width"?: string | number;
    "--rmd-outline-color"?: string;
    "--rmd-outline-grey-color"?: string;
  }
}

/** @since 6.0.0 */
export interface ThemeColors {
  primaryColor: string;
  onPrimaryColor: string;
  secondaryColor: string;
  onSecondaryColor: string;
  warningColor: string;
  onWarningColor: string;
  errorColor: string;
  onErrorColor: string;
  successColor: string;
  onSuccessColor: string;
}

/** @since 6.0.0 */
export interface ThemeTextColors {
  textPrimaryColor: string;
  textSecondaryColor: string;
  textHintColor: string;
  textDisabledColor: string;
}

/** @since 6.0.0 */
export interface ConfigurableThemeColors extends ThemeColors, ThemeTextColors {
  backgroundColor: string;
}

/** @since 6.0.0 */
export type ConfigurableThemeColorsName = keyof ConfigurableThemeColors;

/** @since 6.0.0 */
export interface ThemeContext extends ConfigurableThemeColors {
  /**
   * This will be `true` if a `theme` was not provided to the {@link ThemeProvider}
   */
  derived: boolean;

  /**
   * @example Simple Example
   * ```tsx
   * import { getDerivedTheme, useTheme } from "@react-md/core/theme/ThemeProvider";
   * import { useHtmlClassName } from "@react-md/core/useHtmlClassName";
   * import { useEffect } from "react";
   *
   * import styles from "./LightTheme.module.scss";
   *
   * let loadedOnce = false;
   *
   * export default function LightTheme(): null {
   *   useHtmlClassName(styles.container);
   *   const { setDerivedTheme } = useTheme();
   *   useEffect(() => {
   *     if (loadedOnce) {
   *       return;
   *     }
   *
   *     loadedOnce = true;
   *     setDerivedTheme(getDerivedTheme());
   *   }, [setDerivedTheme]);
   *   return null;
   * }
   * ```
   */
  setDerivedTheme: UseStateSetter<Readonly<ConfigurableThemeColors>>;
}

/** @since 6.0.0 */
export const DEFAULT_THEME_COLORS: Readonly<ThemeColors> = {
  primaryColor: blue500,
  onPrimaryColor: black,
  secondaryColor: orangeAccent400,
  onSecondaryColor: black,
  warningColor: orangeAccent200,
  onWarningColor: black,
  errorColor: red500,
  onErrorColor: black,
  successColor: greenAccent700,
  onSuccessColor: black,
};

/** @since 6.0.0 */
export const DEFAULT_LIGHT_THEME: Readonly<ConfigurableThemeColors> = {
  ...DEFAULT_THEME_COLORS,
  backgroundColor: "#fafafa",
  textPrimaryColor: "#212121",
  textSecondaryColor: "#757575",
  textHintColor: "#a8a8a8",
  textDisabledColor: "#9e9e9e",
};

/** @since 6.0.0 */
export const DEFAULT_DARK_THEME: Readonly<ConfigurableThemeColors> = {
  ...DEFAULT_THEME_COLORS,
  backgroundColor: "#121212",
  textPrimaryColor: "#d9d9d9",
  textSecondaryColor: "#b3b3b3",
  textHintColor: "gray", // #808080
  textDisabledColor: "gray", // #808080
};

const context = createContext<Readonly<ThemeContext> | undefined>(undefined);
context.displayName = "Theme";
const { Provider } = context;

/** @since 6.0.0 */
export const getDerivedTheme = (
  container: Element = document.documentElement
): Readonly<ConfigurableThemeColors> => {
  const rootStyles = window.getComputedStyle(container);
  const backgroundColor = rootStyles.getPropertyValue(backgroundColorVar);
  const primaryColor = rootStyles.getPropertyValue(primaryColorVar);
  const onPrimaryColor = rootStyles.getPropertyValue(onPrimaryColorVar);
  const secondaryColor = rootStyles.getPropertyValue(secondaryColorVar);
  const onSecondaryColor = rootStyles.getPropertyValue(onSecondaryColorVar);
  const warningColor = rootStyles.getPropertyValue(warningColorVar);
  const onWarningColor = rootStyles.getPropertyValue(onWarningColorVar);
  const errorColor = rootStyles.getPropertyValue(errorColorVar);
  const onErrorColor = rootStyles.getPropertyValue(onErrorColorVar);
  const successColor = rootStyles.getPropertyValue(successColorVar);
  const onSuccessColor = rootStyles.getPropertyValue(onSuccessColorVar);
  const textPrimaryColor = rootStyles.getPropertyValue(textPrimaryColorVar);
  const textSecondaryColor = rootStyles.getPropertyValue(textSecondaryColorVar);
  const textHintColor = rootStyles.getPropertyValue(textHintColorVar);
  const textDisabledColor = rootStyles.getPropertyValue(textDisabledColorVar);

  return {
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
  };
};

/**
 * This hook can be used to access the current theme set by the
 * {@link ThemeProvider}.
 *
 * @example Simple Example
 * ```tsx
 * import { useTheme } from "@react-md/core/theme/useTheme";
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
 * import { type ConfigurableThemeColors, ThemeProvider } from "@react-md/core/theme/ThemeProvider";
 * import type { ReactElement } from "react";
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
