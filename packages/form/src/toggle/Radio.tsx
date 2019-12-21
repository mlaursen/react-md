import React, { FC, forwardRef } from "react";
import { useIcon } from "@react-md/icon";
import { WithForwardedRef } from "@react-md/utils";

import InputToggle, { InputToggleProps } from "./InputToggle";

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
const Radio: FC<RadioProps & WithForwardedRef<HTMLInputElement>> = ({
  forwardedRef,
  icon: propIcon,
  ...props
}) => {
  const icon = useIcon("radio", propIcon);

  return <InputToggle {...props} icon={icon} ref={forwardedRef} type="radio" />;
};

if (process.env.NODE_ENV !== "production") {
  Radio.displayName = "Radio";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Radio.propTypes = {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.node,
      value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
  }
}

export default forwardRef<HTMLInputElement, RadioProps>((props, ref) => (
  <Radio {...props} forwardedRef={ref} />
));
