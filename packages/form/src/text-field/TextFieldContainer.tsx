import React, { FC, forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import TextFieldAddon from "./TextFieldAddon";

/**
 * The supported themes for a text field.
 *
 * - "none" - display as an unstyled text field without any border or
 *   background colors.
 * - "underline" - display with only an underline that gains the form
 *   active color and animates from the left or right to the other side
 *   when the field is focused.
 * - "filled" - an extension of the `"underline"` state that will also
 *   have a slightly dark background applied.
 * - "outline" - outlines the entire text field in a border and applies
 *   the active color as box shadow when the field is focused.
 */
export type TextFieldTheme = "none" | "underline" | "filled" | "outline";

export interface TextFieldContainerOptions {
  /**
   * Boolean if the text field should use the dense spec to reduce
   * the height a bit.
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
   * Boolean if the text field should gain the error state and update the colors.
   */
  error?: boolean;

  /**
   * The direction that the underline should appear from when the theme is `"underline"`
   * or `"filled"`.
   */
  underlineDirection?: "left" | "right";

  /**
   * An optional addon to apply to the left of the text field. This should normally
   * be an icon. This element will not have pointer events so it can be "clicked through"
   * to focus the text field instead.
   */
  leftAddon?: ReactNode;

  /**
   * An optional addon to apply to the right of the text field. This should be a clickable
   * button such as a password field toggle or a reset button for the field.
   */
  rightAddon?: ReactNode;
}

export interface TextFieldContainerProps
  extends TextFieldContainerOptions,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the text field is currently active (focused) to applied the active
   * color to the current theme.
   */
  active?: boolean;

  /**
   * Boolean if there is a floating label with the text field.
   */
  label?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<
    TextFieldContainerProps,
    "inline" | "theme" | "error" | "underlineDirection"
  >
>;
type WithDefaultProps = TextFieldContainerProps & DefaultProps & WithRef;

const block = bem("rmd-text-field-container");

/**
 * This is a container component that is used to structure the text field
 * with different parts and themes.
 *
 * @private
 */
const TextFieldContainer: FC<
  TextFieldContainerProps & WithRef
> = providedProps => {
  const {
    inline,
    className,
    children,
    forwardedRef,
    theme,
    error,
    active,
    label,
    dense,
    leftAddon,
    rightAddon,
    underlineDirection,
    ...props
  } = providedProps as WithDefaultProps;

  const underline = theme === "underline";
  const outline = theme === "outline";
  const filled = theme === "filled";
  const isUnderlined = underline || filled;

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          error,
          inline,
          filled,
          outline,
          label: label && !dense,
          dense: !label && dense,
          "dense-label": dense && label,
          "outline-active": outline && active,
          "outline-error": outline && error,
          "outline-left": outline && leftAddon,
          "outline-right": outline && rightAddon,
          underline: isUnderlined,
          "underline-active": isUnderlined && active,
          "underline-error": isUnderlined && active && !error,
          [`underline-${underlineDirection}`]: isUnderlined,
        }),
        className
      )}
    >
      <TextFieldAddon first>{leftAddon}</TextFieldAddon>
      {children}
      <TextFieldAddon first={false}>{rightAddon}</TextFieldAddon>
    </div>
  );
};

const defaultProps: DefaultProps = {
  inline: false,
  theme: "none",
  error: false,
  underlineDirection: "left",
};

TextFieldContainer.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TextFieldContainer.displayName = "TextFieldContainer";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TextFieldContainer.propTypes = {
      inline: PropTypes.bool,
      theme: PropTypes.oneOf(["none", "underline", "outline", "filled"]),
      active: PropTypes.bool,
      error: PropTypes.bool,
      underlineDirection: PropTypes.oneOf(["left", "right"]),
    };
  }
}

export default forwardRef<HTMLDivElement, TextFieldContainerProps>(
  (props, ref) => <TextFieldContainer {...props} forwardedRef={ref} />
);
