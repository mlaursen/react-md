import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { LabelHTMLAttributes } from "react";
import { forwardRef } from "react";

import type { FormComponentStates } from "./types";

const labelStyles = bem("rmd-label");

export interface LabelClassNameOptions extends FormComponentStates {
  className?: string;

  dense?: boolean;
  floating?: boolean;
}

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

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    LabelClassNameOptions {}

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
