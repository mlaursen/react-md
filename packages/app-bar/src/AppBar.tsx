import React, {
  FunctionComponent,
  ReactType,
  HTMLAttributes,
  forwardRef,
  createElement,
} from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

export type AppBarPosition = "top" | "bottom";
export type AppBarTheme = "clear" | "primary" | "secondary" | "default";

export interface IAppBarProps
  extends HTMLAttributes<HTMLDivElement>,
    IWithForwardedRef<HTMLDivElement> {
  component?: ReactType;
  /**
   * Boolean if the `AppBar` should be fixed to the top or bottom of the page.
   */
  fixed?: boolean;

  /**
   * The position within the page to "fix" the `AppBar` when the `fixed` prop is enabled.
   */
  fixedPosition?: AppBarPosition;

  /**
   * Boolean if the fixed `AppBar` should gain elevation. This is recommended to stay enabled unless
   * you manually apply a border to help separate the `AppBar` from other content.
   */
  fixedElevation?: boolean;

  /**
   * Boolean if the `AppBar` should use the `dense` spec. This prop can be used along with the
   * `prominent` prop to create a prominent and dense `AppBar`.
   */
  dense?: boolean;

  /**
   * Boolean if the `AppBar` should use the `prominent` spec. This prop can be used along with
   * the `dense` prop to create a prominent and dense `AppBar`.
   */
  prominent?: boolean;

  /**
   * The theme to apply to the `AppBar`.
   */
  theme?: AppBarTheme;

  /**
   * Boolean if the `AppBarNav`, `AppBarTitle`, and `AppBarActions` should inherit the color that
   * for the provided `theme`. If this value is `undefined`, the color will only be inherited when
   * the theme is set to `primary` or `secondary`. However if this value is a boolean, it will be
   * used instead. So if you set this to `false` and set the `theme` to `"primary"`, the defined
   * primary text clor will not be inherited.
   */
  inheritColor?: boolean;
}

interface IAppBarDefaultProps {
  component: ReactType;
  fixed: boolean;
  fixedPosition: AppBarPosition;
  fixedElevation: boolean;
  dense: boolean;
  prominent: boolean;
  theme: AppBarTheme;
}

type AppBarWithDefaultProps = IAppBarProps & IAppBarDefaultProps;

const AppBar: FunctionComponent<IAppBarProps> = providedProps => {
  const {
    component,
    className,
    forwardedRef,
    children,
    dense,
    prominent,
    fixed,
    fixedPosition,
    fixedElevation,
    theme,
    inheritColor,
    ...props
  } = providedProps as AppBarWithDefaultProps;

  const inherit =
    typeof inheritColor === "boolean"
      ? inheritColor
      : theme !== "clear" && theme !== "default";

  return createElement(
    component,
    {
      ...props,
      className: cn(
        "rmd-app-bar",
        {
          "rmd-app-bar--child-inherit": inherit,
          "rmd-app-bar--dense": dense && !prominent,
          "rmd-app-bar--prominent": prominent,
          "rmd-app-bar--prominent-dense": dense && prominent,
          "rmd-app-bar--fixed": fixed,
          "rmd-app-bar--fixed-elevation": fixed && fixedElevation,
          [`rmd-app-bar--${theme}`]: theme !== "clear",
          [`rmd-app-bar--${fixedPosition}`]: fixed,
        },
        className
      ),
      ref: forwardedRef,
    },
    children
  );
};

const defaultProps: IAppBarDefaultProps = {
  component: "header",
  fixed: false,
  fixedPosition: "top",
  fixedElevation: true,
  dense: false,
  prominent: false,
  theme: "primary",
};

AppBar.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  AppBar.displayName = "AppBar";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    AppBar.propTypes = {
      className: PropTypes.string,
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      children: PropTypes.node,
      dense: PropTypes.bool,
      prominent: PropTypes.bool,
      fixed: PropTypes.bool,
      fixedPosition: PropTypes.oneOf(["top", "bottom"]),
      fixedElevation: PropTypes.bool,
      inheritColor: PropTypes.bool,
      theme: PropTypes.oneOf(["primary", "secondary", "default", "clear"]),
    };
  }
}

export default forwardRef<HTMLDivElement, IAppBarProps>((props, ref) => (
  <AppBar {...props} forwardedRef={ref} />
));
