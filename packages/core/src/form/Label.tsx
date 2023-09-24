import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import { type TextColor, type ThemeColor, cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { type LabelClassNameOptions, type LabelProps } from "./types.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-form-label-floating-top"?: string | number;
    "--rmd-form-label-left-offset"?: string | number;
    "--rmd-form-label-top-offset"?: string | number;
    "--rmd-form-label-active-padding"?: string | number;
    "--rmd-form-label-active-background-color"?: string;
  }
}

const labelStyles = bem("rmd-label");

/**
 * @remarks \@since 6.0.0
 */
export function label(options: LabelClassNameOptions): string {
  const {
    className,
    gap = false,
    error = false,
    dense = false,
    active = false,
    stacked = false,
    reversed = false,
    disabled = false,
    floating = false,
    inactive = false,
    floatingActive = active,
  } = options;

  let textColor: TextColor | ThemeColor | undefined;
  if (disabled) {
    textColor = "text-disabled";
  } else if (floating && inactive) {
    textColor = "text-secondary";
  }

  return cnb(
    labelStyles({
      gap,
      error,
      dense,
      active,
      disabled,
      floating,
      stacked: stacked && !reversed,
      reversed: !stacked && reversed,
      "stacked-reversed": stacked && reversed,
      "floating-dense": floating && dense,
      "floating-active": floating && floatingActive,
    }),
    cssUtils({
      textColor,
    }),
    className
  );
}

/**
 * **Server Component**
 *
 * Most of the form components already use this `Label` internally when a
 * `label` prop has been provided. You should generally use this component if
 * you need to separate the label from an existing form component or you need to
 * create a custom implementation of a form component.
 *
 * @remarks \@since 6.0.0 Updated to be usable externally and combines the
 * floating label styles instead of having separate components.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label(props, ref) {
    const {
      gap = false,
      error = false,
      dense = false,
      active = false,
      stacked = false,
      reversed = false,
      disabled = false,
      floating = false,
      inactive = false,
      floatingActive = active,
      className,
      children,
      ...remaining
    } = props;

    return (
      <label
        ref={ref}
        {...remaining}
        className={label({
          gap,
          error,
          dense,
          active,
          stacked,
          reversed,
          disabled,
          floating,
          floatingActive,
          inactive,
          className,
        })}
      >
        {children}
      </label>
    );
  }
);
