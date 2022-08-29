import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import {
  black,
  blue500,
  greenAccent700,
  orangeAccent200,
  orangeAccent400,
  red500,
} from "./colors";
import { useColorScheme } from "./ColorSchemeProvider";
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
} from "./cssVars";

/** @remarks \@since 6.0.0 */
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

/** @remarks \@since 6.0.0 */
export interface ThemeTextColors {
  textPrimaryColor: string;
  textSecondaryColor: string;
  textHintColor: string;
  textDisabledColor: string;
}

/** @remarks \@since 6.0.0 */
export interface ConfigurableThemeColors extends ThemeColors, ThemeTextColors {
  backgroundColor: string;
}
/** @remarks \@since 6.0.0 */
export type ConfigurableThemeColorsName = keyof ConfigurableThemeColors;

/** @remarks \@since 6.0.0 */
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

/** @remarks \@since 6.0.0 */
export const DEFAULT_LIGHT_THEME: Readonly<ConfigurableThemeColors> = {
  ...DEFAULT_THEME_COLORS,
  backgroundColor: "#fafafa",
  textPrimaryColor: "#212121",
  textSecondaryColor: "#757575",
  textHintColor: "#a8a8a8",
  textDisabledColor: "#9e9e9e",
};

/** @remarks \@since 6.0.0 */
export const DEFAULT_DARK_THEME: Readonly<ConfigurableThemeColors> = {
  ...DEFAULT_THEME_COLORS,
  backgroundColor: "#121212",
  textPrimaryColor: "#d9d9d9",
  textSecondaryColor: "#b3b3b3",
  textHintColor: "gray", // #808080
  textDisabledColor: "gray", // #808080
};

const context = createContext<Readonly<ConfigurableThemeColors> | undefined>(
  undefined
);
context.displayName = "Theme";
const { Provider } = context;

/** @remarks \@since 6.0.0 */
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

/** @remarks \@since 6.0.0 */
export function useTheme(): Readonly<ConfigurableThemeColors> {
  const theme = useContext(context);
  if (!theme) {
    throw new Error("The `ThemeProvider` has not been initialized.");
  }

  return theme;
}

/** @remarks \@since 6.0.0 */
export interface ThemeProviderProps {
  theme?: Readonly<ConfigurableThemeColors>;
  children: ReactNode;
}

/**
 * @remarks \@since 6.0.0
 */
export function ThemeProvider(props: ThemeProviderProps): ReactElement {
  const { children, theme } = props;
  const { colorScheme, colorSchemeMode } = useColorScheme();
  const [derivedTheme, setDerivedTheme] = useState<ConfigurableThemeColors>(
    colorScheme === "dark" ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME
  );

  useIsomorphicLayoutEffect(() => {
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
    const frame = window.requestAnimationFrame(() =>
      setDerivedTheme(getDerivedTheme(document.documentElement))
    );

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [theme, colorScheme, colorSchemeMode]);

  const value = useMemo<ConfigurableThemeColors>(() => {
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
  }, [
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
