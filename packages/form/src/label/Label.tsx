/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

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

  /**
   * The component to render the label as. This should be the default value of `"label"` 99%
   * of the time, but can also be rendered as a `"span"` for the `Select` implementation
   * where it needs to be rendered in a button.
   */
  component?: "label" | "span";
}

type WithRef = WithForwardedRef<HTMLLabelElement>;
type DefaultProps = Required<
  Pick<LabelProps, "error" | "active" | "disabled" | "component">
>;
type WithDefaultProps = LabelProps & DefaultProps & WithRef;

const block = bem("rmd-label");

const Label: FC<LabelProps & WithRef> = providedProps => {
  const {
    htmlFor,
    className,
    forwardedRef,
    children,
    error,
    active,
    disabled,
    component: Component,
    ...props
  } = providedProps as WithDefaultProps;
  if (!children) {
    return null;
  }

  return (
    <Component
      {...props}
      htmlFor={Component === "label" ? htmlFor : undefined}
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
    </Component>
  );
};

const defaultProps: DefaultProps = {
  error: false,
  active: false,
  disabled: false,
  component: "label",
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
      component: PropTypes.oneOf(["label", "span"]),
    };
  }
}

export default forwardRef<HTMLLabelElement, LabelProps>((props, ref) => (
  <Label {...props} forwardedRef={ref} />
));
