import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * An id for the `<input>` or `<textarea>` that this label is for. This is required
   * since all label's **should** point to a valid `<input>`/`<textarea>`.
   */
  htmlFor: string;

  /**
   * Boolean if the label should gain the error state.
   */
  error?: boolean;

  /**
   * Boolean if the label should gain the disabled state.
   */
  disabled?: boolean;

  /**
   * Boolean if the label should gain the active state. This should normally be enabled
   * whenever the `<input>`/`<textarea>` gain focus. This is really more for text input
   * than anything else, and probably shouldn't be used for checkbox, radio or switch
   * components.
   */
  active?: boolean;
}

type WithRef = WithForwardedRef<HTMLLabelElement>;
type DefaultProps = Required<Pick<LabelProps, "error" | "active" | "disabled">>;
type WithDefaultProps = LabelProps & DefaultProps & WithRef;

const block = bem("rmd-label");

const Label: FunctionComponent<LabelProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    error,
    active,
    disabled,
    ...props
  } = providedProps as WithDefaultProps;
  if (!children) {
    return null;
  }

  return (
    <label
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          error,
          active,
          disabled,
        }),
        className
      )}
    >
      {children}
    </label>
  );
};

const defaultProps: DefaultProps = {
  error: false,
  active: false,
  disabled: false,
};

Label.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Label.displayName = "Label";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Label.propTypes = {
      htmlFor: PropTypes.string.isRequired,
      error: PropTypes.bool,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLLabelElement, LabelProps>((props, ref) => (
  <Label {...props} forwardedRef={ref} />
));
