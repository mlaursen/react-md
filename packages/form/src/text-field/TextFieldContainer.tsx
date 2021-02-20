import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { FormThemeOptions, useFormTheme } from "../FormThemeProvider";
import { TextFieldAddon } from "./TextFieldAddon";

export interface TextFieldContainerOptions extends FormThemeOptions {
  /**
   * Boolean if the form components should be using the `dense` spec to reduce
   * the sizing slightly.
   */
  dense?: boolean;

  /**
   * Boolean if the component should be rendered inline with
   * `display: inline-flex` instead of `display: flex`.
   */
  inline?: boolean;

  /**
   * Boolean if the text field should gain the error state and update the
   * colors.
   */
  error?: boolean;

  /**
   * An optional addon to apply to the left of the text field. This should
   * normally be an icon. This element will not have pointer events so it can be
   * "clicked through" to focus the text field instead.
   */
  leftChildren?: ReactNode;

  /**
   * Boolean if the left children should be wrapped in the `TextFieldAddon`
   * component. This is enabled by default since this is _normally_ the behavior
   * that is desired so that icons can be positioned correctly.
   */
  isLeftAddon?: boolean;

  /**
   * An optional addon to apply to the right of the text field. This should be a
   * clickable button such as a password field toggle or a reset button for the
   * field.
   */
  rightChildren?: ReactNode;

  /**
   * Boolean if the right children should be wrapped in the `TextFieldAddon`
   * component. This is enabled by default since this is _normally_ the behavior
   * that is desired so that icons can be positioned correctly.
   */
  isRightAddon?: boolean;
}

export interface TextFieldContainerProps
  extends TextFieldContainerOptions,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the text field is currently active (focused) to applied the
   * active color to the current theme.
   */
  active?: boolean;

  /**
   * Boolean if there is a floating label with the text field.
   */
  label?: boolean;

  /**
   * Boolean if the text field is currently disabled.
   */
  disabled?: boolean;
}

const block = bem("rmd-text-field-container");

/**
 * This is a container component that is used to structure the text field with
 * different parts and themes.
 */
export const TextFieldContainer = forwardRef<
  HTMLDivElement,
  TextFieldContainerProps
>(function TextFieldContainer(
  {
    className,
    children,
    inline = false,
    theme: propTheme,
    error = false,
    active,
    label,
    dense = false,
    disabled = false,
    isLeftAddon = true,
    isRightAddon = true,
    leftChildren,
    rightChildren,
    underlineDirection: propUnderlineDirection,
    ...props
  },
  ref
) {
  const { theme, underlineDirection } = useFormTheme({
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
  });

  const underline = theme === "underline";
  const outline = theme === "outline";
  const filled = theme === "filled";
  const isUnderlined = underline || filled;
  const isOutlineActive = outline && active;

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        block({
          error,
          inline,
          filled,
          outline,
          disabled,
          hoverable: !disabled && !isOutlineActive,
          label: label && !dense,
          dense: !label && dense,
          "dense-label": dense && label,
          "dense-placeholder": dense && isUnderlined && !label,
          "outline-active": isOutlineActive,
          "outline-error": outline && error,
          "outline-left": outline && leftChildren,
          "outline-right": outline && rightChildren,
          underline: isUnderlined,
          "underline-labelled": label && isUnderlined,
          "underline-active": isUnderlined && active,
          [`underline-${underlineDirection}`]: isUnderlined,
          "underline-left-addon": isUnderlined && leftChildren,
          "underline-right-addon": isUnderlined && rightChildren,
        }),
        className
      )}
    >
      {isLeftAddon ? (
        <TextFieldAddon>{leftChildren}</TextFieldAddon>
      ) : (
        leftChildren
      )}
      {children}
      {isRightAddon ? (
        <TextFieldAddon>{rightChildren}</TextFieldAddon>
      ) : (
        rightChildren
      )}
    </div>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TextFieldContainer.propTypes = {
      className: PropTypes.string,
      disabled: PropTypes.bool,
      inline: PropTypes.bool,
      theme: PropTypes.oneOf(["none", "underline", "outline", "filled"]),
      active: PropTypes.bool,
      error: PropTypes.bool,
      underlineDirection: PropTypes.oneOf(["left", "center", "right"]),
      isLeftAddon: PropTypes.bool,
      isRightAddon: PropTypes.bool,
      leftChildren: PropTypes.node,
      rightChildren: PropTypes.node,
      label: PropTypes.bool,
      dense: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}
