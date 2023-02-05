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
 * - `primary -> $text-primary-color`
 * - `secondary -> $text-secondary-color`
 * - `hint -> $text-hint-color`
 * - `disabled -> $text-disabled-color`
 *
 * @remarks \@since 6.0.0
 */
export type TextThemeColor = "primary" | "secondary" | "hint" | "disabled";

/**
 * @remarks \@since 6.0.0
 */
export type CSSVariableName = `--${string}`;

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export type DefinedCustomProperties<Property = keyof CSSProperties> =
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
 * // `DefinedCSSVariableNames` will also include `--custom-property` with all
 * // defined react-md custom properties
 * ```
 *
 * @remarks \@since 6.0.0
 */
export type DefinedCSSVariableNames = DefinedCustomProperties;
