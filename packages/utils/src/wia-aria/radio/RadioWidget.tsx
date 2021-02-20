import React, { forwardRef } from "react";
import { RadioWidgetAttributes } from "./types";

/**
 * @remarks \@since 2.7.0
 */
export interface RadioWidgetProps extends RadioWidgetAttributes {
  /**
   * An id to use for the item that is required for a11y. This should normally
   * be handled and provided automatically by the `RadioGroup` component.
   */
  id: string;

  /**
   * Boolean if the radio is currently checked.
   */
  checked: boolean;

  /**
   * The current tab index for the item that should normally be handled
   * automatically by the `RadioGroup` component. When there are no checked
   * radio items or the item is checked, this should be `0`. Otherwise this
   * should be set to `-1` so that it is shown that it can be focused but isn't
   * included in the tab index flow.
   */
  tabIndex: 0 | -1;
}

/**
 * This component offers no styles and probably shouldn't be used externally
 * since it is just rendered by the `RadioGroup` component.
 *
 * @remarks \@since 2.7.0
 */
export const RadioWidget = forwardRef<HTMLSpanElement, RadioWidgetProps>(
  function RadioGroupRadio({ checked, children, ...props }, ref) {
    return (
      <span {...props} aria-checked={checked} ref={ref} role="radio">
        {children}
      </span>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    RadioWidget.propTypes = {
      id: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      tabIndex: PropTypes.oneOf([0, -1]).isRequired,
    };
  } catch (e) {}
}
