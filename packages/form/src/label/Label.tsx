/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * An id for the `<input>` or `<textarea>` that this label is for. This is
   * required since all label's **should** point to a valid
   * `<input>`/`<textarea>`.
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
   * Boolean if the label should gain the active state. This should normally be
   * enabled whenever the `<input>`/`<textarea>` gain focus. This is really more
   * for text input than anything else, and probably shouldn't be used for
   * checkbox, radio or switch components.
   */
  active?: boolean;

  /**
   * The component to render the label as. This should be the default value of
   * `"label"` 99% of the time, but can also be rendered as a `"span"` for the
   * `Select` implementation where it needs to be rendered in a button.
   */
  component?: "label" | "span";
}

const block = bem("rmd-label");

function Label(
  {
    htmlFor,
    className,
    error = false,
    active = false,
    disabled = false,
    component: Component = "label",
    children,
    ...props
  }: LabelProps,
  ref?: Ref<HTMLLabelElement>
): ReactElement | null {
  if (!children) {
    return null;
  }

  return (
    <Component
      {...props}
      ref={ref}
      className={cn(
        block({
          error,
          active,
          disabled,
        }),
        className
      )}
      htmlFor={Component === "label" ? htmlFor : undefined}
    >
      {children}
    </Component>
  );
}

const ForwardedLabel = forwardRef<HTMLLabelElement, LabelProps>(Label);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedLabel.propTypes = {
      htmlFor: PropTypes.string.isRequired,
      error: PropTypes.bool,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      component: PropTypes.oneOf(["label", "span"]),
    };
  } catch (e) {}
}

export default ForwardedLabel;
