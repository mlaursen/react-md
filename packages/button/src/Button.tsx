import React, {
  forwardRef,
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
} from "react";

import { withStates, IWithStatesConfig } from "@react-md/states";
import { IWithForwardedRef } from "@react-md/utils";

import {
  IButtonThemeProps,
  ButtonTheme,
  ButtonThemeType,
  ButtonType,
} from "./types.d";
import buttonThemeClassNames from "./buttonThemeClassNames";

/**
 * This interface includes all the props that the `Button` component accepts so the main
 * usecase might be creating a functionality wrapper for the `Button` component, but passes
 * all props down as normal.
 */
export interface IButtonProps
  extends IButtonThemeProps,
    HTMLAttributes<HTMLButtonElement> {
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

/**
 * All the declared default props for the `Button` component. This probably won't be used in many
 * places.
 */
export interface IButtonDefaultProps {
  disabled: boolean;
  theme: ButtonTheme;
  themeType: ButtonThemeType;
  buttonType: ButtonType;
}

export type ButtonWithDefaultProps = IButtonProps &
  IButtonDefaultProps &
  IWithForwardedRef<HTMLButtonElement> &
  IWithStatesConfig;

const Button: FunctionComponent<
  IButtonProps & IWithForwardedRef<HTMLButtonElement>
> = providedProps => {
  const {
    theme,
    themeType,
    buttonType,
    children,
    forwardedRef,
    ...props
  } = providedProps as ButtonWithDefaultProps;

  return (
    <button
      {...props}
      ref={forwardedRef}
      className={buttonThemeClassNames(providedProps)}
    >
      {children}
    </button>
  );
};

const defaultProps: IButtonDefaultProps = {
  disabled: false,
  theme: "primary",
  themeType: "flat",
  buttonType: "text",
};

Button.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  // there's a problem with forwardedRef components that set the `displayName` to `undefined`
  Button.displayName = "Button";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Button.propTypes = {
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

const ButtonWithStates = withStates(Button);

export default forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => (
  <ButtonWithStates {...props} forwardedRef={ref} />
));
