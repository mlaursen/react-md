import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-native-select");
const containerStyles = bem("rmd-native-select-container");

/** @remarks \@since 6.0.0 */
export interface NativeSelectClassNameOptions {
  className?: string;

  /**
   * Set to `true` if using a custom icon instead of the default `<select>`
   * appearance.
   *
   * @defaultValue `false`
   */
  icon?: boolean;
}

/** @remarks \@since 6.0.0 */
export function nativeSelect(
  options: NativeSelectClassNameOptions = {}
): string {
  const { className, icon = false } = options;

  return cnb(styles({ icon }), className);
}

/**
 * @remarks \@since 6.0.0
 */
export interface NativeSelectContainerClassNameOptions {
  className?: string;
  padded?: boolean;
  multiple?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function nativeSelectContainer(
  options: NativeSelectContainerClassNameOptions = {}
): string {
  const { className, padded, multiple } = options;

  return cnb(containerStyles({ multi: multiple, padded }), className);
}
