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
export type ColorScheme = "light" | "dark";

/** @since 6.0.0 */
export type ColorSchemeMode = ColorScheme | "system";

/**
 * @since 6.0.0
 */
export interface ColorSchemeModeBehavior {
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
  setColorSchemeMode: UseStateSetter<ColorSchemeMode>;
}

/** @since 6.0.0 */
export interface ColorSchemeContext extends ColorSchemeModeBehavior {
  /**
   * The current color scheme that is being used. This is only useful when the
   * {@link colorSchemeMode} is set to `"system"`.
   */
  colorScheme: ColorScheme;
}
