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
   * When the {@link colorScheme} is set to `"system"`, this will reflect
   */
  currentColor: LightDarkColorScheme;
}
