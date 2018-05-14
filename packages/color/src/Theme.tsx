import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface IThemeStyleProps {
  className: string;
}

export interface IThemeProps {
  primary?: boolean;
  secondary?: boolean;
  target?: "background" | "text";
  className?: string;
  color?: "text" | "secondary" | "hint" | "disabled";
  children: React.ReactElement<any> | Array<React.ReactElement<any>> | ((props: IThemeStyleProps) => React.ReactNode);
}

export interface IThemeState {
  className: string;
}

function createClassName(props: IThemeProps): string {
  const { className, primary, secondary, target } = props;
  const isText = target === "text";
  const isBackground = target === "background";

  return cn({
    "md-theme--text-primary": isText && primary,
    "md-theme--text-secondary": isText && secondary,
    "md-theme--background-primary": isBackground && primary,
    "md-theme--background-secondary": isBackground && secondary,
  }, className);
}

export default class Theme extends React.Component<IThemeProps, IThemeState> {
  public static getDerivedStateFromProps(nextProps: IThemeProps, prevState: IThemeState) {
    const className = createClassName(nextProps);
    if (prevState.className !== className) {
      return { className };
    }

    return null;
  }

  constructor(props: IThemeProps) {
    super(props);

    this.state = { className: createClassName(props) };
  }

  public render() {
    const { className } = this.state;
    const { children } = this.props;

    if (typeof children === "function") {
      return children({ className });
    }

    return React.Children.map(React.Children.toArray(children), (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      child = React.Children.only(child);
      return React.cloneElement(child, {
        className: cn(className, child.props.className),
      });
    });
  }

}
