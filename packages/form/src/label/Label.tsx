/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

/**
 * @remarks \@since 2.5.0
 */
export interface LabelStates {
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
}

export interface LabelProps
  extends HTMLAttributes<HTMLLabelElement>,
    LabelStates {
  /**
   * An id for the `<input>` or `<textarea>` that this label is for. This is
   * required since all label's **should** point to a valid
   * `<input>`/`<textarea>`.
   */
  htmlFor: string;

  /**
   * The component to render the label as. This should be the default value of
   * `"label"` 99% of the time, but can also be rendered as a `"span"` for the
   * `Select` implementation where it needs to be rendered in a button.
   */
  component?: "label" | "span";
}

const styles = bem("rmd-label");

/**
 * A simple util that can generate all the "valid" styles for a label. This
 * shouldn't really be used, but it's useful if you want the label styles
 * without rendering a `<label>` element.
 *
 * @remarks \@since 2.5.0
 * @internal
 */
export const labelStyles = ({
  error = false,
  active = false,
  disabled = false,
}: LabelStates = {}): string => styles({ error, active, disabled });

/**
 * The `Label` component should be used alongside any form elements but is
 * already built in to the majority of the `react-md` components by default.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  {
    htmlFor,
    className,
    error = false,
    active = false,
    disabled = false,
    component: Component = "label",
    children,
    ...props
  },
  ref
) {
  if (!children) {
    return null;
  }

  return (
    <Component
      {...props}
      ref={ref}
      className={cn(labelStyles({ error, active, disabled }), className)}
      htmlFor={Component === "label" ? htmlFor : undefined}
    >
      {children}
    </Component>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Label.propTypes = {
      htmlFor: PropTypes.string.isRequired,
      className: PropTypes.string,
      error: PropTypes.bool,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      component: PropTypes.oneOf(["label", "span"]),
      children: PropTypes.node,
    };
  } catch (e) {}
}
