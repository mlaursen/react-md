import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

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
 * @remarks \@since 6.0.0
 */
export type InputToggleSize = "auto" | "small" | "dense" | "normal" | "large";

/** @remarks \@since 6.0.0 */
export interface InputToggleClassNameOptions {
  className?: string;
  type: "checkbox" | "radio";

  /**
   * Set the icon size to `1em` to allow easy sizing through font size.
   *
   * @defaultValue `true`
   */
  em?: boolean;

  /**
   * Set this to `true` when the input toggle should gain the active colors.
   * This should normally be when the input toggle is checked.
   *
   * @defaultValue `false`
   */
  active?: boolean;

  /** @defaultValue `false` */
  disabled?: boolean;

  /** @defaultValue `false` */
  readOnly?: boolean;

  /**
   * @see {@link InputToggleSize}
   * @defaultValue `"auto"`
   */
  size?: InputToggleSize;
}

/**
 * @remarks \@since 6.0.0
 */
export function inputToggle(options: InputToggleClassNameOptions): string {
  const {
    className,
    em = true,
    type,
    size = "auto",
    active = false,
    disabled = false,
    readOnly = false,
  } = options;

  return cnb(
    `rmd-${type}`,
    styles({
      em,
      active,
      readonly: readOnly,
      small: size === "small",
      dense: size === "dense",
      normal: size === "normal",
      large: size === "large",
    }),
    cssUtils({
      textColor: disabled ? "text-disabled" : undefined,
    }),
    className
  );
}
