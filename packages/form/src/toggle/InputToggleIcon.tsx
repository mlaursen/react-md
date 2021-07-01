import React, { forwardRef, HTMLAttributes, ReactElement } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

/**
 * @remarks \@since 2.8.0
 */
export interface InputToggleIconProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Boolean if the icon should use circle styles. This should normally be
   * enabled for radio input types.
   */
  circle?: boolean;

  /**
   * Boolean if the disabled styles should be applied.
   */
  disabled?: boolean;

  /**
   * Boolean if using an overlay for the different icon states.
   */
  overlay?: boolean;

  /**
   * Boolean if the icon should gain the checked state.
   */
  checked?: boolean;

  /**
   * Boolean if using the indeterminate checkbox state.
   */
  indeterminate?: boolean;
}

const styles = bem("rmd-toggle");

/**
 * @remarks \@since 2.8.0
 */
export const InputToggleIcon = forwardRef<
  HTMLSpanElement,
  InputToggleIconProps
>(function InputToggleIcon(
  {
    circle = false,
    disabled = false,
    overlay = false,
    checked = false,
    indeterminate = false,
    className,
    children,
    ...props
  }: InputToggleIconProps,
  ref
): ReactElement {
  return (
    <span
      {...props}
      ref={ref}
      className={cn(
        styles("icon", {
          circle,
          disabled,
          overlay,
          checked: !indeterminate && checked,
          indeterminate,
          "indeterminate-checked": checked && indeterminate,
        }),
        className
      )}
    >
      {children}
    </span>
  );
});
