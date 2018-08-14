import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export type AppBarPosition = "top" | "bottom";
export type AppBarTheme = "clear" | "primary" | "secondary" | "default";

export interface IAppBarProps {
  [key: string]: any;
  grow?: boolean;
  fixed?: boolean;
  position?: AppBarPosition;
  dense?: boolean;
  prominent?: boolean;
  theme?: AppBarTheme;
  inheritColor?: boolean;
}

export interface IAppBarDefaultProps {
  grow: boolean;
  fixed: boolean;
  dense: boolean;
  prominent: boolean;
  position: AppBarPosition;
  theme: AppBarTheme;
}

export type AppBarWithDefaultProps = IAppBarProps & IAppBarDefaultProps;

const AppBar: React.SFC<IAppBarProps> = providedProps => {
  const {
    className,
    grow,
    dense,
    prominent,
    children,
    fixed,
    position,
    theme,
    inheritColor,
    ...props
  } = providedProps as AppBarWithDefaultProps;
  return (
    <header
      {...props}
      className={cn(
        `rmd-app-bar rmd-app-bar--${theme}`,
        {
          "rmd-app-bar--child-inherit": typeof inheritColor === "boolean" ? inheritColor : theme !== "clear",
          "rmd-app-bar--multiline": prominent || grow,
          "rmd-app-bar--grow": grow,
          "rmd-app-bar--grow-dense": grow && dense,
          "rmd-app-bar--dense": dense && !prominent,
          "rmd-app-bar--prominent": prominent,
          "rmd-app-bar--prominent-dense": dense && prominent,
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
  grow: false,
  fixed: false,
  dense: false,
  prominent: false,
  position: "top",
  theme: "primary",
} as IAppBarDefaultProps;

export default AppBar;
