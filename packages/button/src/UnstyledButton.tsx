/* eslint-disable react/prop-types */
import React, { ButtonHTMLAttributes, FC, forwardRef } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

/**
 * The props for the unstyled button are just all the normal button html attributes
 * without the `type` since this component forces the `type="button"` value.
 */
export type UnstyledButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
>;

/**
 * The unstyled button is a really simple button element that resets the default
 * browser button styles into a clear clickable element.
 */
const UnstyledButton: FC<UnstyledButtonProps &
  WithForwardedRef<HTMLButtonElement>> = ({
  className,
  children,
  forwardedRef,
  ...props
}) => (
  <button
    {...props}
    type="button"
    ref={forwardedRef}
    className={cn("rmd-button-unstyled", className)}
  >
    {children}
  </button>
);

if (process.env.NODE_ENV !== "production") {
  UnstyledButton.displayName = "UnstyledButton";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    UnstyledButton.propTypes = {
      className: PropTypes.string,
      disabled: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLButtonElement, UnstyledButtonProps>(
  (props, ref) => <UnstyledButton {...props} forwardedRef={ref} />
);
