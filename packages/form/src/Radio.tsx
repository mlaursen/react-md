import React, { FC, forwardRef } from "react";
import { FontIcon } from "@react-md/icon";
import { WithForwardedRef } from "@react-md/utils";

import InputToggle, { InputToggleProps } from "./InputToggle";

type DefaultProps = Required<Pick<InputToggleProps, "icon">>;

/**
 * The `Radio` component is just a wrapper for the `InputToggle` that
 * defaults to reasonable defaults for a radio input.
 */
const Radio: FC<InputToggleProps & WithForwardedRef<HTMLInputElement>> = ({
  forwardedRef,
  ...props
}) => <InputToggle {...props} ref={forwardedRef} type="radio" />;

const defaultProps: DefaultProps = {
  icon: <FontIcon aria-hidden>radio_button_checked</FontIcon>,
};

Radio.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Radio.displayName = "Radio";
}

export default forwardRef<HTMLInputElement, InputToggleProps>((props, ref) => (
  <Radio {...props} forwardedRef={ref} />
));
