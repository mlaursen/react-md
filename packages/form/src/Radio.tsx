import React, { FC, forwardRef } from "react";
import { FontIcon } from "@react-md/icon";
import { WithForwardedRef } from "@react-md/utils";

import InputToggle, { InputToggleProps } from "./InputToggle";

export interface RadioProps extends InputToggleProps {
  /**
   * A value is required for a radio button unlike a checkbox.
   */
  value: string[] | string | number;
}
type DefaultProps = Required<Pick<InputToggleProps, "icon">>;

/**
 * The `Radio` component is just a wrapper for the `InputToggle` that
 * defaults to reasonable defaults for a radio input.
 */
const Radio: FC<RadioProps & WithForwardedRef<HTMLInputElement>> = ({
  forwardedRef,
  ...props
}) => <InputToggle {...props} ref={forwardedRef} type="radio" />;

const defaultProps: DefaultProps = {
  icon: <FontIcon aria-hidden>radio_button_checked</FontIcon>,
};

Radio.defaultProps = defaultProps;

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
      value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    };
  }
}

export default forwardRef<HTMLInputElement, RadioProps>((props, ref) => (
  <Radio {...props} forwardedRef={ref} />
));
