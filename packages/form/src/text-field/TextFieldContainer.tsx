import React, {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

import TextFieldAddon from "./TextFieldAddon";

/**
 * The supported themes for a text field.
 *
 * - "none" - display as an unstyled text field without any border or background
 *   colors.
 * - "underline" - display with only an underline that gains the form active
 *   color and animates from the left or right to the other side when the field
 *   is focused.
 * - "filled" - an extension of the `"underline"` state that will also have a
 *   slightly dark background applied.
 * - "outline" - outlines the entire text field in a border and applies the
 *   active color as box shadow when the field is focused.
 */
export type TextFieldTheme = "none" | "underline" | "filled" | "outline";

export interface TextFieldContainerOptions {
  /**
   * Boolean if the text field should use the dense spec to reduce the height a
   * bit.
   */
  dense?: boolean;

  /**
   * The theme to use for the text field.
   */
  theme?: TextFieldTheme;

  /**
   * Boolean if the text field should be displayed inline with `inline-flex`
   * instead of full width with `flex`.
   */
  inline?: boolean;

  /**
   * Boolean if the text field should gain the error state and update the
   * colors.
   */
  error?: boolean;

  /**
   * The direction that the underline should appear from when the theme is
   * `"underline"` or `"filled"`.
   */
  underlineDirection?: "left" | "right";

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
 *
 * @private
 */
function TextFieldContainer(
  {
    className,
    children,
    inline = false,
    theme = "none",
    error = false,
    active,
    label,
    dense,
    disabled = false,
    isLeftAddon = true,
    isRightAddon = true,
    leftChildren,
    rightChildren,
    underlineDirection = "left",
    ...props
  }: TextFieldContainerProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  const underline = theme === "underline";
  const outline = theme === "outline";
  const filled = theme === "filled";
  const isUnderlined = underline || filled;

  return (
    <div
      {...props}
      ref={ref}
      className={cnb(
        block({
          error,
          inline,
          filled,
          outline,
          disabled,
          hoverable: !disabled,
          label: label && !dense,
          dense: !label && dense,
          "dense-label": dense && label,
          "dense-placeholder": dense && isUnderlined && !label,
          "outline-active": outline && active,
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
}

const ForwardedTextFieldContainer = forwardRef<
  HTMLDivElement,
  TextFieldContainerProps
>(TextFieldContainer);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTextFieldContainer.propTypes = {
      disabled: PropTypes.bool,
      inline: PropTypes.bool,
      theme: PropTypes.oneOf(["none", "underline", "outline", "filled"]),
      active: PropTypes.bool,
      error: PropTypes.bool,
      underlineDirection: PropTypes.oneOf(["left", "right"]),
      isLeftAddon: PropTypes.bool,
      isRightAddon: PropTypes.bool,
      leftChildren: PropTypes.node,
      rightChildren: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedTextFieldContainer;
