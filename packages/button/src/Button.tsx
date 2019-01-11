import * as React from "react";
import { ITextIconSpacingProps, TextIconSpacing } from "@react-md/icon";
import { IWithForwardedRef } from "@react-md/utils";

import {
  IButtonThemeProps,
  ButtonTheme,
  ButtonThemeType,
  ButtonType,
} from "./types.d";
import theme from "./theme";

/**
 * This interface includes all the props that the `Button` component accepts so the main
 * usecase might be creating a functionality wrapper for the `Button` component, but passes
 * all props down as normal.
 */
export interface IButtonProps
  extends IButtonThemeProps,
    ITextIconSpacingProps,
    React.HTMLAttributes<HTMLButtonElement> {
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
  children?: React.ReactNode;
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
  iconAfter: boolean;
}

export type ButtonWithDefaultProps = IButtonProps &
  IButtonDefaultProps &
  IWithForwardedRef<HTMLButtonElement>;

export type ButtonComponent = React.FunctionComponent<
  IButtonProps & IWithForwardedRef<HTMLButtonElement>
> & { theme: (props: IButtonThemeProps) => string };

const Button: ButtonComponent = providedProps => {
  const {
    theme,
    themeType,
    buttonType,
    icon,
    iconAfter,
    children,
    forwardedRef,
    beforeClassName,
    afterClassName,
    forceIconWrap,
    ...props
  } = providedProps as ButtonWithDefaultProps;

  return (
    <button
      {...props}
      ref={forwardedRef}
      className={Button.theme(providedProps)}
    >
      <TextIconSpacing
        icon={icon}
        iconAfter={iconAfter}
        beforeClassName={beforeClassName}
        afterClassName={afterClassName}
        forceIconWrap={forceIconWrap}
      >
        {children}
      </TextIconSpacing>
    </button>
  );
};

Button.theme = theme;

const defaultProps: IButtonDefaultProps = {
  disabled: false,
  theme: "primary",
  themeType: "flat",
  buttonType: "text",
  iconAfter: false,
};

Button.defaultProps = defaultProps;

export default React.forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => <Button {...props} forwardedRef={ref} />
);
