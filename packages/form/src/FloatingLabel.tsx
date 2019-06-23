import React, { FC, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import Label, { LabelProps } from "./Label";

export interface FloatingLabelProps extends LabelProps {
  /**
   * Boolean if the floating label should gain the covering state that will inherit the background
   * color so that it can cover content below it.
   */
  covering?: boolean;

  /**
   * Boolean if the text input or textarea currently have a value.
   */
  valued: boolean;
}

type DefaultProps = Required<
  Pick<FloatingLabelProps, "error" | "active" | "disabled" | "covering">
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
    valued,
    covering,
    ...props
  } = providedProps as WithDefaultProps;
  const { active } = props;

  return (
    <Label
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          active: active || valued,
          inactive: valued && !active,
          covering,
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
  covering: false,
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
      covering: PropTypes.bool,
      valued: PropTypes.bool.isRequired,
    };
  }
}

export default forwardRef<HTMLLabelElement, FloatingLabelProps>(
  (props, ref) => <FloatingLabel {...props} forwardedRef={ref} />
);
