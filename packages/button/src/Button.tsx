/* tslint:disable:no-console */
import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export type ButtonMouseEvent = React.MouseEvent<HTMLButtonElement | HTMLDivElement>;
export type ButtonKeyboardEvent = React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>;
export type ButtonTouchEvent = React.TouchEvent<HTMLButtonElement | HTMLDivElement>;

const LEFT_MOUSE = 0;

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
export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLDivElement> {
  /**
   * An optional style to apply.
   * @docgen
   */
  style?: React.CSSProperties;

  /**
   * An optional className to apply.
   * @docgen
   */
  className?: string;

  /**
   * Boolean if the button is currently disabled.
   * @docgen
   */
  disabled?: boolean;

  /**
   * The button's type attribute.
   * @docgen
   */
  type?: "button" | "reset" | "submit";

  /**
   * The specific material design button type to use. A text button will display
   * text while an icon button will only contain an icon.
   * @docgen
   */
  btnType?: "text" | "icon";

  /**
   * The material design theme to apply to the button.
   * @docgen
   */
  theme?: "clear" | "primary" | "secondary" | "default";

  /**
   * The material design theme type to apply.
   * @docgen
   */
  themeType?: "flat" | "outline" | "contained";

  /**
   * Any children to render within the button. This will normally just be text or an icon.
   *
   * Please note that it is considered invalid html to have a `<div>` as a descendant of a `<button>`.
   * You can fix this by enabling the `asDiv` prop.
   * @docgen
   */
  children?: React.ReactNode;

  /**
   * An optional icon to display with a text button. This is invalid for icon buttons. If this is
   * a single element, a new class name will be cloned into the element to get correct spacing so
   * if you have a custom icon element, you **must** also pass that class name down. If you are using
   * one of the react-md icon component packages, this is handled automatically.
   * @docgen
   */
  icon?: React.ReactElement<any> | React.ReactNode;

  /**
   * Boolean if the icon should appear after the text instead of before.
   * @docgen
   */
  iconAfter?: boolean;

  /**
   * Boolean if the button should be rendered as a div instead. This will update the div to be fully
   * accessible with the [button role](https://www.w3.org/TR/wai-aria-practices/#button). If you want
   * to have a `<div>` as a child of the button, you should enable this prop.
   * @docgen
   */
  asDiv?: boolean;

  /**
   * An optional tabIndex to apply. When the `asDiv` prop is enabled, this will default to `0` if its value is
   * `undefined` and the button is not disabled.
   * @docgen
   */
  tabIndex?: number;

  /**
   * An optional function to call when the button is clicked.
   * @docgen
   */
  onClick?: (e: ButtonMouseEvent) => void;

  /**
   * An optional function to call when a keydown event is triggered within the button.
   * @docgen
   */
  onKeyDown?: (e: ButtonKeyboardEvent) => void;

  /**
   * An optional function to call when the mousedown event is triggered within the button.
   * @docgen
   */
  onMouseDown?: (e: ButtonMouseEvent) => void;

  /**
   * An optional function to call when the mouseup event is triggered within the button.
   * @docgen
   */
  onMouseUp?: (e: ButtonMouseEvent) => void;

  /**
   * An optional function to call when the touchstart event is triggered within the button.
   * @docgen
   */
  onTouchStart?: (e: ButtonTouchEvent) => void;

  /**
   * An optional function to call when the touchend event is triggered within the button.
   * @docgen
   */
  onTouchEnd?: (e: ButtonTouchEvent) => void;
}

export interface IButtonDefaultProps {
  asDiv: boolean;
  disabled: boolean;
  btnType: string;
  theme: string;
  themeType: string;
  iconAfter: boolean;
}

export type ButtonWithDefaultProps = IButtonProps & IButtonDefaultProps;

export interface IButtonState {
  pressed: boolean;
}

interface IButtonConditionalProps {
  role?: "button";
  type?: string;
  tabIndex?: number;
  onKeyDown?: (e: ButtonKeyboardEvent) => void;
  onMouseDown?: (e: ButtonMouseEvent) => void;
  onMouseUp?: (e: ButtonMouseEvent) => void;
  onTouchStart?: (e: ButtonTouchEvent) => void;
  onTouchEnd?: (e: ButtonTouchEvent) => void;
}

export default class Button extends React.Component<IButtonProps, IButtonState> {
  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  public static defaultProps: IButtonDefaultProps = {
    asDiv: false,
    disabled: false,
    btnType: "text",
    theme: "primary",
    themeType: "flat",
    iconAfter: false,
  };

  constructor(props: IButtonProps) {
    super(props);

    this.state = { pressed: false };
  }

  public render() {
    const { pressed } = this.state;
    const {
      className,
      children,
      btnType,
      theme,
      themeType,
      icon: propIcon,
      iconAfter,
      asDiv,
      tabIndex: propTabIndex,
      onClick,
      onKeyDown,
      onTouchEnd,
      onTouchStart,
      onMouseUp,
      onMouseDown,
      type,
      ...props
    } = this.props as ButtonWithDefaultProps;
    const { disabled } = props;

    const text = btnType === "text";
    const icon = btnType === "icon";
    const flat = themeType === "flat";
    const outline = themeType === "outline";
    const contained = themeType === "contained";
    const primary = theme === "primary";
    const secondary = theme === "secondary";
    const defaultTheme = theme === "default";

    let iconEl = propIcon;
    if (React.isValidElement(propIcon)) {
      const i = React.Children.only(propIcon);
      iconEl = React.cloneElement(propIcon, {
        // @ts-ignore
        className: cn(
          "rmd-btn__icon",
          {
            "rmd-btn__icon--before": !iconAfter,
            "rmd-btn__icon--after": iconAfter,
          },
          i.props.className
        ),
      });
    }

    let content = children;
    if (iconEl) {
      content = (
        <React.Fragment>
          {!iconAfter && iconEl}
          {children}
          {iconAfter && iconEl}
        </React.Fragment>
      );
    }

    const additionalProps: IButtonConditionalProps = {};
    if (asDiv) {
      // when rendering as a div instead of a button, we need to add additional keyboard events
      // and a tab index so that it can be interacted by keyboards
      let tabIndex = propTabIndex;
      if (disabled) {
        tabIndex = undefined;
      } else if (typeof tabIndex !== "number") {
        tabIndex = 0;
      }

      additionalProps.role = "button";
      additionalProps.tabIndex = tabIndex;
      additionalProps.onKeyDown = disabled ? undefined : this.handleDivKeyDown;
    } else {
      additionalProps.type = type;
      additionalProps.tabIndex = propTabIndex;
      additionalProps.onKeyDown = disabled ? undefined : onKeyDown;
    }

    if (contained && !disabled) {
      additionalProps.onMouseDown = this.handleMouseDown;
      additionalProps.onMouseUp = this.handleMouseUp;
      additionalProps.onTouchStart = this.handleTouchStart;
      additionalProps.onTouchEnd = this.handleTouchEnd;
    } else if (!disabled) {
      additionalProps.onMouseDown = onMouseDown;
      additionalProps.onMouseUp = onMouseUp;
      additionalProps.onTouchStart = onTouchStart;
      additionalProps.onTouchEnd = onTouchEnd;
    }

    return React.createElement(
      asDiv ? "div" : "button",
      {
        ...props,
        ...additionalProps,
        onClick: disabled ? undefined : onClick,
        className: cn(
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
            "rmd-btn--contained": contained,
            "rmd-btn--contained-pressed": contained && pressed,
          },
          className
        ),
      },
      content
    );
  }

  private press = () => {
    if (!this.state.pressed) {
      this.setState({ pressed: true });
    }
  };

  private unpress = () => {
    if (this.state.pressed) {
      this.setState({ pressed: false });
    }
  };

  /**
   * Update the div to listen to space or enter keypresses to trigger a click event
   * like a normal button.
   */
  private handleDivKeyDown = (e: ButtonKeyboardEvent) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if (e.key === " " || e.key === "Enter") {
      if (e.key === " ") {
        // prevent the page from scrolling
        e.preventDefault();
      }

      e.currentTarget.click();
    }
  };

  /**
   * "contained" buttons gain a pressed state that raises their elevation while being
   * clicked.
   */
  private handleMouseDown = (e: ButtonMouseEvent) => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }

    if (e.button === LEFT_MOUSE) {
      this.press();
    }
  };

  private handleMouseUp = (e: ButtonMouseEvent) => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }

    this.unpress();
  };

  private handleTouchStart = (e: ButtonTouchEvent) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this.press();
  };

  private handleTouchEnd = (e: ButtonTouchEvent) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    this.unpress();
  };
}
