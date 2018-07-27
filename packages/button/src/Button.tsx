import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";
import { TextIconSpacing, ITextIconSpacingProps } from "@react-md/icon";
import { KeyboardClickable } from "@react-md/a11y";

export interface IButtonThemeProps {
  /**
   * An optional className to apply.
   *
   * @docgen
   */
  className?: string;

  /**
   * Boolean if the button is currently disabled.
   *
   * @docgen
   */
  disabled?: boolean;

  /**
   * The specific material design button type to use. A text button will display
   * text while an icon button will only contain an icon.
   *
   * @docgen
   */
  btnType?: "text" | "icon";

  /**
   * The material design theme to apply to the button.
   *
   * @docgen
   */
  theme?: "clear" | "primary" | "secondary" | "default";

  /**
   * The material design theme type to apply.
   *
   * @docgen
   */
  themeType?: "flat" | "outline" | "contained";
}

/**
 * The `Button` component is used to create a clickable area within your application. It can be styled
 * to be flat with the background, outlined, or contained. A contained button will include some elevation
 * to help increase its visibility within the app. In addition, the button can be themed to either be clear,
 * a default grey color, or to use the app's defined primary or secondary color.
 *
 * Buttons come in the form of text, icon, or text and icon together. It is recommended to use the text
 * version when possible since it is less confusing for the user, but icons can be used if they are easy
 * to understand and there is limited space.
 *
 * Another feature of the `Button` is that it can be conditionally rendered as a `<div>` instead of a `<button>`
 * if you need to create a more advanced clickable area that has `<div>`s inside (it is considered invalid html to have
 * a `<div>` within a `<button>`). This will make the div fully accessible to keyboard users and add the correct
 * keyboard events.
 */
export interface IButtonButtonProps
  extends IButtonThemeProps,
    ITextIconSpacingProps,
    React.HTMLAttributes<HTMLButtonElement | HTMLDivElement> {
  /**
   * An optional style to apply.
   *
   * @docgen
   */
  style?: React.CSSProperties;

  /**
   * The button's type attribute.
   *
   * @docgen
   */
  type?: "button" | "reset" | "submit";

  /**
   * Any children to render within the button. This will normally just be text or an icon.
   *
   * Please note that it is considered invalid html to have a `<div>` as a descendant of a `<button>`.
   * You can fix this by enabling the `asDiv` prop.
   *
   * @docgen
   */
  children?: React.ReactNode;

  /**
   * Boolean if the button should be rendered as a div instead. This will update the div to be fully
   * accessible with the [button role](https://www.w3.org/TR/wai-aria-practices/#button). If you want
   * to have a `<div>` as a child of the button, you should enable this prop.
   *
   * @docgen
   */
  asDiv?: boolean;

  // these are really just pass-through-values, so don't need to document them about how they are passed
  // to the helper components
  onBlur?: (event: React.FocusEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

export type IButtonProps = IButtonButtonProps | IButtonButtonProps;

export interface IButtonDefaultProps {
  asDiv: boolean;
  disabled: boolean;
  theme: string;
  themeType: string;
  btnType: string;
  iconAfter: boolean;
}

export type ButtonWithDefaultProps = IButtonProps & IButtonDefaultProps;

export default class Button extends React.Component<IButtonProps, {}> {
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    type: PropTypes.oneOf(["button", "reset", "submit"]),
    btnType: PropTypes.oneOf(["text", "icon"]),
    theme: PropTypes.oneOf(["clear", "primary", "secondary", "default"]),
    themeType: PropTypes.oneOf(["flat", "outline", "contained"]),
    children: PropTypes.node,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    iconAfter: PropTypes.bool,
  };

  public static defaultProps: IButtonDefaultProps = {
    asDiv: false,
    disabled: false,
    theme: "primary",
    themeType: "flat",
    btnType: "text",
    iconAfter: false,
  };

  /**
   * Creates a button theme based on the button theming props. This is really just used so that
   * other elements like clickable `<div>`s or `<input type="file">` can look like buttons.
   *
   * NOTE: You will still need to manually apply the `<StatesConsumer>` with the correct props
   */
  public static theme(props: IButtonThemeProps): string {
    const { btnType, themeType, theme, disabled, className } = props;
    const text = btnType === "text";
    const icon = btnType === "icon";
    const flat = themeType === "flat";
    const outline = themeType === "outline";
    const contained = themeType === "contained";
    const primary = theme === "primary";
    const secondary = theme === "secondary";
    const defaultTheme = theme === "default";

    return cn(
      "rmd-btn",
      {
        "rmd-btn--text": text,
        "rmd-btn--icon": icon,
        "rmd-btn--hoverable": !disabled,
        "rmd-btn--disabled": disabled,
        "rmd-btn--primary": !disabled && primary && contained,
        "rmd-btn--secondary": !disabled && secondary && contained,
        "rmd-btn--default": !disabled && defaultTheme && contained,
        "rmd-btn--text-primary": !disabled && primary && !contained,
        "rmd-btn--text-secondary": !disabled && secondary && !contained,
        "rmd-btn--text-default": !disabled && defaultTheme && !contained,
        "rmd-btn--outline-primary": !disabled && primary && outline,
        "rmd-btn--outline-secondary": !disabled && secondary && outline,
        "rmd-btn--outline-default": !disabled && defaultTheme && outline,
        "rmd-btn--contained": !disabled && contained,
      },
      className
    );
  }

  public render() {
    const {
      theme,
      themeType,
      btnType,
      icon,
      iconAfter,
      children,
      disabled: baseDisabled,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onKeyDown,
      onKeyUp,
      asDiv,
      ...props
    } = this.props;

    return (
      <StatesConsumer
        className={Button.theme(this.props)}
        pressedClassName={cn({ "rmd-btn--contained-pressed": themeType === "contained" })}
        disabled={baseDisabled}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        {({ disabled, ...stateProps }) => {
          // removed `disabled` since it is "invalid" to have a disabled attribute on a div even if it
          // can be rendered. Instead we will apply "aria-disabled" when it is disabled from KeyboardClickable

          const content = (
            <TextIconSpacing icon={icon} iconAfter={iconAfter}>
              {children}
            </TextIconSpacing>
          );

          if (asDiv) {
            return (
              <KeyboardClickable disabled={disabled} {...stateProps}>
                {clickableProps => (
                  <div {...props} {...stateProps} {...clickableProps}>
                    {content}
                  </div>
                )}
              </KeyboardClickable>
            );
          }

          return (
            <button {...props} {...stateProps} disabled={disabled}>
              {content}
            </button>
          );
        }}
      </StatesConsumer>
    );
  }
}
