import type { CSSProperties } from "react";

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
