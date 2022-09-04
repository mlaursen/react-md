import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import type { LabelClassNameOptions, LabelProps } from "./types";

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
  } = options;

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
      "floating-active": floating && active,
    }),
    className
  );
}

/**
 * Most of the form components already use this `Label` internally when a
 * `label` prop has been provided. You should generally use this component if
 * you need to separate the label from an existing form component or you need to
 * create a custom implementation of a form component.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  props,
  ref
) {
  const {
    gap = false,
    error = false,
    dense = false,
    active = false,
    stacked = false,
    reversed = false,
    disabled = false,
    floating = false,
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
        className,
      })}
    >
      {children}
    </label>
  );
});
