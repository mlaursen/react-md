import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-native-select");
const containerStyles = bem("rmd-native-select-container");

/** @since 6.0.0 */
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

/** @since 6.0.0 */
export function nativeSelect(
  options: NativeSelectClassNameOptions = {}
): string {
  const { className, icon = false } = options;

  return cnb(styles({ icon }), className);
}

/**
 * @since 6.0.0
 */
export interface NativeSelectContainerClassNameOptions {
  className?: string;
  label?: boolean;
  multiple?: boolean;
  underlined?: boolean;
}

/**
 * @since 6.0.0
 */
export function nativeSelectContainer(
  options: NativeSelectContainerClassNameOptions = {}
): string {
  const { className, label, multiple, underlined } = options;

  return cnb(
    containerStyles({
      multi: multiple,
      padded: label && multiple && !underlined,
      underline: multiple && underlined,
      "underline-padded": label && multiple && underlined,
    }),
    className
  );
}
