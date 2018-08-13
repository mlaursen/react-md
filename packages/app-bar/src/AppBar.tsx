import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export type AppBarPosition = "top" | "bottom";
export type AppBarTheme = "clear" | "primary" | "secondary" | "default";

export interface IAppBarProps {
  [key: string]: any;
  fixed?: boolean;
  position?: AppBarPosition;
  dense?: boolean;
  extended?: boolean;
  theme?: AppBarTheme;
}

export interface IAppBarDefaultProps {
  fixed: boolean;
  dense: boolean;
  extended: boolean;
  position: AppBarPosition;
  theme: AppBarTheme;
}

export type AppBarWithDefaultProps = IAppBarProps & IAppBarDefaultProps;

const AppBar: React.SFC<IAppBarProps> = providedProps => {
  const {
    className,
    dense,
    extended,
    children,
    fixed,
    position,
    theme,
    ...props
  } = providedProps as AppBarWithDefaultProps;
  return (
    <header
      {...props}
      className={cn(
        `rmd-app-bar rmd-app-bar--${theme}`,
        {
          "rmd-app-bar--dense": dense && !extended,
          "rmd-app-bar--extended": extended,
          "rmd-app-bar--extended-dense": dense && extended,
          "rmd-app-bar--fixed": fixed,
          [`rmd-app-bar--${position}`]: fixed,
        },
        className
      )}
    >
      {children}
    </header>
  );
};

AppBar.propTypes = {
  className: PropTypes.string,
  dense: PropTypes.bool,
};

AppBar.defaultProps = {
  fixed: false,
  dense: false,
  extended: false,
  position: "top",
  theme: "primary",
} as IAppBarDefaultProps;

export default AppBar;
