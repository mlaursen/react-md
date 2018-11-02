import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";
import { TextIconSpacing, ITextIconSpacingProps } from "@react-md/icon";
import { KeyboardClickable } from "@react-md/a11y";

/**
 * One of the valid button types that can be used
 */
export type ButtonType = "text" | "icon";

/**
 * One of the valid material design default button themes that can be used. This will
 * update the general look and feel by updating the colors within the button while the
 * `ButtonThemeType` will update the borders or box shadow.
 */
export type ButtonTheme = "clear" | "primary" | "secondary" | "default";

/**
 * One of the valid material design "themed" button types that can be used. This will
 * update the general look and feel by adding borders or box shadow to the button while
 * the `ButtonTheme` will update the colors.
 */
export type ButtonThemeType = "flat" | "outline" | "contained";

/**
 * General util type since the `Button` component can be rendered as a <button> or a <div>.
 */
export type ButtonElement = HTMLButtonElement | HTMLDivElement;

/**
 * This is an interface of all the button's customizable theme props. This is mainly used if you
 * want to add a button theme to another component and have it configurable via props.
 */
export interface IButtonThemeProps {
  /**
   * An optional className to also apply to the button for additional theming and styling. This
   * will be merged with the `Button.theme` class name styles.
   */
  className?: string;

  /**
   * Enabling this prop will apply the disabled styles to a `Button`. When this is also applied
   * to the button component, the button will be updated so that it can no longer be interacted
   * with.
   */
  disabled?: boolean;

  /**
   * This is the specific material design button type to use. This can either be set to "text" or
   * "icon". When this is set to "text", the styles applied will make buttons with just text or text
   * with icons render nicely. When this is set to "icon", the styles applied will make icon only buttons
   * render nicely.
   */
  btnType?: ButtonType;

  /**
   * The material design theme to apply to the button. The theme prop will update the look and feel of
   * the button by applying different background and/or foreground colors.
   */
  theme?: ButtonTheme;

  /**
   * The material design theme type to apply. The themeTYpe prop will update the look and feel of the
   * button by applying different border or box shadow.
   */
  themeType?: ButtonThemeType;
}

/**
 * This interface includes all the props that the `Button` component accepts so the main
 * usecase might be creating a functionality wrapper for the `Button` component, but passes
 * all props down as normal.
 */
export interface IButtonProps
  extends IButtonThemeProps,
    ITextIconSpacingProps,
    React.HTMLAttributes<ButtonElement> {
  /**
   * The button's type attribute. This is set to "button" by default so that forms are not accidentally submitted
   * when this prop is omitted since buttons without a type attribute work as submit by default.
   */
  type?: "button" | "reset" | "submit";

  /**
   * Any children to render within the button. This will normally just be text or an icon.
   *
   * Please note that it is considered invalid html to have a `<div>` as a descendant of a `<button>`.
   * You can fix this by enabling the `asDiv` prop.
   */
  children?: React.ReactNode;

  /**
   * Boolean if the button should be rendered as a div instead. This will update the div to be fully
   * accessible with the [button role](https://www.w3.org/TR/wai-aria-practices/#button). If you want
   * to have a `<div>` as a child of the button, you should enable this prop.
   */
  asDiv?: boolean;
}

/**
 * All the declared default props for the `Button` component. This probably won't be used in many
 * places.
 */
export interface IButtonDefaultProps {
  asDiv: boolean;
  disabled: boolean;
  theme: ButtonTheme;
  themeType: ButtonThemeType;
  btnType: ButtonType;
  iconAfter: boolean;
}

export type ButtonWithDefaultProps = IButtonProps & IButtonDefaultProps;

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
   *
   * @param props An object containing the themeable button props to generate a button theme className.
   * @return a string of class names to create an element with a button theme.
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
        "rmd-btn--disabled": disabled,
        "rmd-btn--hoverable": !disabled,
        "rmd-btn--primary": !disabled && primary && contained,
        "rmd-btn--secondary": !disabled && secondary && contained,
        "rmd-btn--default": !disabled && defaultTheme && contained,
        "rmd-btn--text-primary": !disabled && primary && !contained,
        "rmd-btn--text-secondary": !disabled && secondary && !contained,
        "rmd-btn--text-default": !disabled && defaultTheme && !contained,
        "rmd-btn--outline-disabled": disabled && outline,
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
        pressedClassName={cn({
          "rmd-btn--contained-pressed": themeType === "contained",
        })}
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
