import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import type { LabelClassNameOptions, LabelProps } from "./types";

const labelStyles = bem("rmd-label");

export function label(options: LabelClassNameOptions): string {
  const {
    className,
    error = false,
    dense = false,
    active = false,
    disabled = false,
    readOnly = false,
    floating = false,
  } = options;

  return cnb(
    labelStyles({
      error,
      dense,
      active,
      disabled,
      readOnly,
      floating,
      "floating-dense": floating && dense,
      "floating-active": floating && active,
      // "floating-inactive": floating && !active,
    }),
    className
  );
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  props,
  ref
) {
  const {
    error = false,
    dense = false,
    active = false,
    disabled = false,
    readOnly = false,
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
        error,
        dense,
        active,
        disabled,
        readOnly,
        floating,
        className,
      })}
    >
      {children}
    </label>
  );
});
