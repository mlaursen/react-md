import { type CSSProperties } from "react";

import { type UseStateSetter } from "../types.js";

/**
 * @since 6.0.0
 */
export type CSSVariableName = `--${string}`;

/**
 * @internal
 * @since 6.0.0
 */
export type DefinedCustomProperty<Property = keyof CSSProperties> =
  Property extends CSSVariableName ? Property : never;

/**
 * This is a utility type that can be used to auto-complete and type-check css
 * variables that are defined through module augmentation.
 *
 * ```ts
 * declare module "react" {
 *   interface CSSProperties {
 *     "--custom-property"?: number | string;
 *   }
 * }
 *
 * // will no longer throw a type error. also the `--custom-property` will
 * // appear as an auto-complete item
 * const style: CSSProperties = {
 *   "--custom-property": "red",
 * };
 *
 * // `DefinedCSSVariableName` will also include `--custom-property` with all
 * // defined react-md custom properties
 * ```
 *
 * @since 6.0.0
 */
export type DefinedCSSVariableName = DefinedCustomProperty;

/**
 * @since 6.0.0
 */
export interface CSSVariable<
  Name extends CSSVariableName = DefinedCSSVariableName,
> {
  name: Name;
  value: string | number;
}

/**
 * @since 6.0.0
 */
export type CSSVariablesProperties<
  Name extends CSSVariableName = DefinedCSSVariableName,
> = {
  [key in Name]?: string | number;
};

/**
 * @since 6.0.0
 */
export type ReadonlyCSSVariableList<
  Name extends CSSVariableName = DefinedCSSVariableName,
> = readonly Readonly<CSSVariable<Name>>[];

/** @since 6.0.0 */
export type LightDarkColorScheme = "light" | "dark";

/** @since 6.0.0 */
export type ColorScheme = LightDarkColorScheme | "system";

/**
 * @since 6.0.0
 */
export interface ColorSchemeState {
  /**
   * The defined color scheme for the app that should match the `$color-scheme`
   * SCSS variable.
   */
  colorScheme: ColorScheme;
  setColorScheme: UseStateSetter<ColorScheme>;
}

/** @since 6.0.0 */
export interface ColorSchemeContext extends ColorSchemeState {
  /**
   * When the {@link colorScheme} is set to `"system"`, this can be used to
   * determine if the user prefers the `"light"` or `"dark"` color scheme so
   * that custom styles can be set for that preference.
   */
  currentColor: LightDarkColorScheme;
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
   * import { getDerivedTheme } from "@react-md/core/theme/getDerivedTheme"
   * import { useTheme } from "@react-md/core/theme/ThemeProvider";
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
