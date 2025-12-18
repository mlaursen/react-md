import { cnb } from "cnbuilder";

import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { getFormConfig } from "./formConfig.js";
import { label } from "./labelStyles.js";
import { type FormTheme, type LabelClassNameOptions } from "./types.js";

const styles = bem("rmd-legend");

/**
 * @since 6.4.0
 */
export type LegendLabelClassNameOptions = Pick<
  LabelClassNameOptions,
  "active" | "gap" | "error" | "stacked" | "disabled" | "reversed"
>;

/**
 * @since 6.4.0
 */
export interface LegendClassNameOptions extends LegendLabelClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  srOnly?: boolean;

  /**
   * Set this to `true` to make the `<legend>` have the styles of a floating label.
   * This requires the parent `<fieldset>` to have the `floatingLegend` flag
   * enabled.
   *
   * @defaultValue `false`
   */
  floating?: boolean;

  /**
   * This will only apply if {@link floating} is `true`.
   *
   * @see {@link FormTheme}
   * @defaultValue `getFormConfig("theme")`
   */
  theme?: FormTheme;

  /**
   * This will only apply if {@link floating} is `true`.
   *
   * @see {@link LabelClassNameOptions.active}
   * @defaultValue `false`
   */
  active?: boolean;

  /**
   * This will only apply if {@link floating} is `true`.
   *
   * @see {@link LabelClassNameOptions.gap}
   * @defaultValue `false`
   */
  gap?: boolean;

  /**
   * This will only apply if {@link floating} is `true`.
   *
   * @see {@link LabelClassNameOptions.disabled}
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * This will only apply if {@link floating} is `true`.
   *
   * @see {@link LabelClassNameOptions.dense}
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * This will only apply if {@link floating} is `true`.
   *
   * @see {@link LabelClassNameOptions.error}
   * @defaultValue `false`
   */
  error?: boolean;

  /**
   * This will only apply if {@link floating} is `true`.
   *
   * @see {@link LabelClassNameOptions.stacked}
   * @defaultValue `false`
   */
  stacked?: boolean;

  /**
   * This will only apply if {@link floating} is `true`.
   *
   * @see {@link LabelClassNameOptions.reversed}
   * @defaultValue `false`
   */
  reversed?: boolean;
}

/**
 * @since 6.4.0
 */
export function legend(options: LegendClassNameOptions = {}): string {
  const {
    className,
    srOnly,
    floating,
    theme = getFormConfig("theme"),
    ...labelOptions
  } = options;

  return cnb(
    styles({
      floating,
      "floating-filled": floating && theme === "filled",
      "floating-underline": floating && theme === "underline",
      "floating-outline": floating && theme === "outline",
    }),
    floating &&
      label({
        ...labelOptions,
        floating: true,
        floatingActive: true,
      }),
    cssUtils({ srOnly }),
    className
  );
}
