import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { type FormComponentStates } from "./types.js";

const styles = bem("rmd-input-toggle");

/**
 * The size to use for the `Checkbox` or `Radio` component. Each of these values
 * except for `"auto"` map to Sass variables:
 * - `"small"` - `$input-toggle-small-size`
 * - `"dense"` - `$input-toggle-dense-size`
 * - `"normal"` - `$input-toggle-large-size`
 * - `"large"` - `$input-toggle-large-size`
 *
 * When this is set to `"auto"`, the size will be determined by the current
 * `font-size` of the `Label` element.
 *
 * @since 6.0.0
 */
export type InputToggleSize = "auto" | "small" | "dense" | "normal" | "large";

/** @since 6.0.0 */
export interface InputToggleClassNameOptions
  extends Omit<FormComponentStates, "readOnly"> {
  className?: string;
  type: "checkbox" | "radio";

  /**
   * Set the icon size to `1em` to allow easy sizing through font size.
   *
   * @defaultValue `true`
   */
  em?: boolean;

  /**
   * @see {@link InputToggleSize}
   * @defaultValue `"auto"`
   */
  size?: InputToggleSize;

  uncontrolled?: boolean;
}

/**
 * @since 6.0.0
 */
export function inputToggle(options: InputToggleClassNameOptions): string {
  const {
    className,
    em = true,
    type,
    size = "auto",
    error,
    active = false,
    disabled = false,
    uncontrolled,
  } = options;

  return cnb(
    `rmd-${type}`,
    styles({
      em,
      active: active && !disabled,
      disabled,
      small: size === "small",
      dense: size === "dense",
      normal: size === "normal",
      large: size === "large",
      uncontrolled,
    }),
    cssUtils({
      textColor: disabled ? "text-disabled" : error ? "error" : undefined,
    }),
    className
  );
}
