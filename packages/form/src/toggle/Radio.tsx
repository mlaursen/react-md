import React, { forwardRef } from "react";
import { useIcon } from "@react-md/icon";

import { InputToggle, InputToggleProps } from "./InputToggle";

export interface RadioProps extends InputToggleProps {
  /**
   * A value is required for a radio button unlike a checkbox.
   */
  value: string[] | string | number;
}

/**
 * The `Radio` component is just a wrapper for the `InputToggle` that
 * defaults to reasonable defaults for a radio input.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { icon: propIcon, ...props },
  ref
) {
  const icon = useIcon("radio", propIcon);

  return <InputToggle {...props} icon={icon} ref={ref} type="radio" />;
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Radio.propTypes = {
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      icon: PropTypes.node,
      value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    };
  } catch (e) {}
}
