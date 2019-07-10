import React, { FC, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import Label, { LabelProps } from "./Label";

export interface FloatingLabelProps extends LabelProps {
  /**
   * Boolean if the text input or textarea currently have a value.
   */
  valued: boolean;

  dense?: boolean;
  floating?: boolean;
  leftChildren?: boolean;
  rightChildren?: boolean;
}

type DefaultProps = Required<
  Pick<FloatingLabelProps, "error" | "active" | "disabled">
>;
type WithRef = WithForwardedRef<HTMLLabelElement>;
type WithDefaultProps = FloatingLabelProps & DefaultProps & WithRef;

const block = bem("rmd-floating-label");

/**
 * This is an extension of the `Label` component that is used with text fields and
 * textareas to float above the input area.
 *
 * @private
 */
const FloatingLabel: FC<FloatingLabelProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    dense,
    valued,
    floating,
    leftChildren,
    rightChildren,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <Label
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          dense,
          active: floating,
          inactive: valued && !props.active,
        }),
        className
      )}
    />
  );
};

const defaultProps: DefaultProps = {
  error: false,
  active: false,
  disabled: false,
};

FloatingLabel.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  FloatingLabel.displayName = "FloatingLabel";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    FloatingLabel.propTypes = {
      error: PropTypes.bool,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      valued: PropTypes.bool.isRequired,
    };
  }
}

export default forwardRef<HTMLLabelElement, FloatingLabelProps>(
  (props, ref) => <FloatingLabel {...props} forwardedRef={ref} />
);
