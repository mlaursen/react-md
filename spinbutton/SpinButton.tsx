import React, { forwardRef, HTMLAttributes } from "react";
import { LabelRequiredForA11y } from "../../types";

/**
 * @remarks \@since 2.7.0
 */
export interface BaseSpinButtonProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The id for the spinbutton that is required for a11y.
   */
  id: string;

  /**
   * The min value for the spinbutton.
   */
  min: number;

  /**
   * The max value for the spinbutton.
   */
  max: number;

  /**
   * The current value for the spinbutton. This is set as the `aria-valuenow`.
   */
  value: number;

  /**
   * The tab index for the spinbutton. This should normally be `0`, but can be
   * set to `-1` when it is part of a `role="group"`.
   */
  tabIndex?: 0 | -1;

  /**
   * Boolean if the spinbutton is current disabled. This is really just a
   * convenience wrapper for `aria-disabled`.
   */
  disabled?: boolean;

  /**
   * Boolean if the spinbutton is current required. This is really just a
   * convenience wrapper for `aria-required`.
   */
  required?: boolean;

  /**
   * An optional function to provide an string representation of the current
   * value to screen readers.
   *
   * Example:
   *
   * ```tsx
   * <SpinButton
   *   {...props}
   *   aria-label="Day"
   *   min={1}
   *   max={31}
   *   getValueText={(value) => {
   *     switch (value):
   *       case 1:
   *         return "First";
   *       case 2:
   *         return "Second";
   *       case 3:
   *         return "Third":
   *       case 4:
   *         return "Forth";
   *       // etc
   *   }}
   * />
   * ```
   */
  getValueText?(value: number): string | undefined;
}

/**
 * @remarks \@since 2.7.0
 */
export type SpinButtonProps = LabelRequiredForA11y<BaseSpinButtonProps>;

/**
 * @remarks \@since 2.7.0
 * @internal
 */
const noop = (): undefined => undefined;

/**
 * The `SpinButton` component is a low-level component that offers no
 * functionality or styles and is just used to complete the `role="spinbutton"`
 * attributes. This should be used along with the `useSpinValue` hook.
 *
 * @remarks \@since 2.7.0
 */
export const SpinButton = forwardRef<HTMLSpanElement, SpinButtonProps>(
  function SpinButton(
    {
      min,
      max,
      value,
      getValueText = noop,
      disabled = false,
      required = false,
      tabIndex = disabled ? undefined : 0,
      children,
      ...props
    },
    ref
  ) {
    return (
      <span
        {...props}
        ref={ref}
        role="spinbutton"
        aria-disabled={disabled || undefined}
        aria-required={required || undefined}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-valuetext={getValueText(value)}
        tabIndex={tabIndex}
      >
        {children}
      </span>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    SpinButton.propTypes = {
      id: PropTypes.string.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      getValueText: PropTypes.func,
      tabIndex: PropTypes.oneOf([0, -1]),
      disabled: PropTypes.bool,
      required: PropTypes.bool,
    };
  } catch (e) {}
}
