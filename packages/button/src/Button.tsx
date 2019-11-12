/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, FC, forwardRef, ReactNode } from "react";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { WithForwardedRef } from "@react-md/utils";

import buttonThemeClassNames, {
  ButtonThemeProps,
} from "./buttonThemeClassNames";

/**
 * This interface includes all the props that the `Button` component accepts so the main
 * usecase might be creating a functionality wrapper for the `Button` component, but passes
 * all props down as normal.
 */
export interface ButtonProps
  extends ButtonThemeProps,
    ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions<HTMLButtonElement>, "disableSpacebarClick"> {
  /**
   * The button's type attribute. This is set to "button" by default so that forms are not
   * accidentally submitted when this prop is omitted since buttons without a type attribute work
   * as submit by default.
   */
  type?: "button" | "reset" | "submit";

  /**
   * Any children to render within the button. This will normally just be text or an icon.
   *
   * Please note that it is considered invalid html to have a `<div>` as a descendant of a
   * `<button>`. You can fix this by enabling the `asDiv` prop.
   */
  children?: ReactNode;
}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<ButtonProps, "disabled" | "theme" | "themeType" | "buttonType" | "type">
>;
type ButtonWithDefaultProps = ButtonProps & DefaultProps & WithRef;

const Button: FC<ButtonProps & WithRef> = providedProps => {
  const {
    theme: _theme,
    themeType,
    buttonType: _buttonType,
    children,
    forwardedRef,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enablePressedAndRipple: propEnablePressedAndRipple,
    ...props
  } = providedProps as ButtonWithDefaultProps;
  const { disabled } = props;

  const enablePressedAndRipple =
    typeof propEnablePressedAndRipple === "boolean"
      ? propEnablePressedAndRipple
      : themeType === "contained";

  const { ripples, className, handlers } = useInteractionStates({
    handlers: props,
    className: buttonThemeClassNames(providedProps),
    disabled,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enablePressedAndRipple,
  });

  return (
    <button {...props} {...handlers} ref={forwardedRef} className={className}>
      {children}
      {ripples}
    </button>
  );
};

const defaultProps: DefaultProps = {
  type: "button",
  disabled: false,
  theme: "clear",
  themeType: "flat",
  buttonType: "text",
};

Button.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Button.displayName = "Button";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Button.propTypes = {
      type: PropTypes.oneOf(["button", "reset", "submit"]),
      className: PropTypes.string,
      theme: PropTypes.oneOf([
        "clear",
        "primary",
        "secondary",
        "warning",
        "error",
      ]),
      themeType: PropTypes.oneOf(["flat", "outline", "contained"]),
      buttonType: PropTypes.oneOf(["text", "icon"]),
      disabled: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button {...props} forwardedRef={ref} />
));
