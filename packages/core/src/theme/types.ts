import type { CSSProperties } from "react";

/**
 * - `primary -> $primary-color`
 * - `secondary -> $secondary-color`
 * - `warning -> $warning-color`
 * - `success -> $success-color`
 * - `error -> $error-color`
 *
 * @remarks \@since 6.0.0
 */
export type ThemeColor =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "error";

/**
 * - `text-primary -> $text-primary-color`
 * - `text-secondary -> $text-secondary-color`
 * - `text-hint -> $text-hint-color`
 * - `text-disabled -> $text-disabled-color`
 *
 * @remarks \@since 6.0.0
 */
export type TextColor =
  | "text-primary"
  | "text-secondary"
  | "text-hint"
  | "text-disabled";

/**
 * @remarks \@since 6.0.0
 */
export type ThemeOrTextColor = ThemeColor | TextColor;

/**
 * @remarks \@since 6.0.0
 */
export type CSSVariableName = `--${string}`;

/**
 * @internal
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
 */
export type DefinedCSSVariableName = DefinedCustomProperty;
