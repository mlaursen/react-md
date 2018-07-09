import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface IButtonProps {
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  btnType?: "text" | "icon";
  theme?: "clear" | "primary" | "secondary" | "default";
  themeType?: "flat" | "outline" | "contained"
  children?: React.ReactNode;
}

export interface IButtonDefaultProps {
  disabled: boolean;
  btnType: string;
  theme: string;
  themeType: string;
}

export type ButtonWithDefaultProps = IButtonProps & IButtonDefaultProps;

export interface IButtonState {
}

export default class Button extends React.Component<IButtonProps, IButtonState> {
  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  public static defaultProps: IButtonDefaultProps = {
    disabled: false,
    btnType: "text",
    theme: "primary",
    themeType: "flat",
  };

  constructor(props: IButtonProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const {
      className,
      children,
      btnType,
      theme,
      themeType,
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

    return (
      <button
        {...props}
        className={cn("rmd-btn", {
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
        }, className)}
      >
        {children}
      </button>
    );
  }
}
