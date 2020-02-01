/* eslint-disable react/prop-types */
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  ReactElement,
  Ref,
} from "react";
import cn from "classnames";

/**
 * The props for the unstyled button are just all the normal button html
 * attributes without the `type` since this component forces the `type="button"`
 * value.
 */
export type UnstyledButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
>;

/**
 * The unstyled button is a really simple button element that resets the default
 * browser button styles into a clear clickable element.
 */
function UnstyledButton(
  { className, children, ...props }: UnstyledButtonProps,
  ref?: Ref<HTMLButtonElement>
): ReactElement {
  return (
    <button
      {...props}
      type="button"
      ref={ref}
      className={cn("rmd-button-unstyled", className)}
    >
      {children}
    </button>
  );
}

const ForwardedUnstyledButton = forwardRef<
  HTMLButtonElement,
  UnstyledButtonProps
>(UnstyledButton);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedUnstyledButton.propTypes = {
      className: PropTypes.string,
      disabled: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedUnstyledButton;
