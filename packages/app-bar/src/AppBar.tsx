import React, { ElementType, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import {
  InheritContext,
  ParentContext,
  useInheritContext,
  useParentContext,
} from "./useInheritContext";

export type AppBarPosition = "top" | "bottom";
export type AppBarTheme = "clear" | "primary" | "secondary" | "default";

/**
 * `AppBar`s have multiple heights available:
 *
 * - `"none"` - the height is derived by the `children` of the `AppBar`
 * - `"normal"` - the height is set to a static height of `$rmd-app-bar-height`
 * - `"prominent"` - the height is set to a static height of
 *   `$rmd-app-bar-prominent-height`
 * - `"dense"` - the height is set to a static height of
 *   `$rmd-app-bar-dense-height`.
 * - `"prominent-dense"` - the height is set to a static height of
 *   `$rmd-app-bar-prominent-dense-height`
 *
 * Note: The `"dense"` specs can automatically be enabled with the
 * `rmd-app-bar-dense-theme` mixin instead of changing this value
 *
 * You'll normally want to use the `"normal"` or `"prominent"` height values for
 * your app, but the `"none"` value is useful if you want to use the `AppBar`
 * for styling purposes only for other components like `Tabs`.
 */
export type AppBarHeight =
  | "none"
  | "normal"
  | "prominent"
  | "dense"
  | "prominent-dense";

export interface AppBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The component for the `AppBar` to render as. This should normally either
   * just be the default `"header"` or a `"div"` component.
   *
   * It is generally recommended to not provide other React components for this
   * prop even though it is possible since it leads to bad practice and props
   * might not get passed as one would expect.
   */
  component?: ElementType;

  /**
   * Boolean if the `AppBar` should be fixed to the top or bottom of the page.
   */
  fixed?: boolean;

  /**
   * The position within the page to "fix" the `AppBar` when the `fixed` prop is
   * enabled.
   */
  fixedPosition?: AppBarPosition;

  /**
   * Boolean if the fixed `AppBar` should gain elevation. This is recommended to
   * stay enabled unless you manually apply a border to help separate the
   * `AppBar` from other content.
   */
  fixedElevation?: boolean;

  /**
   * The height to use for the app bar. See the `AppBarHeight` type for more
   * information.
   */
  height?: AppBarHeight;

  /**
   * The theme to apply to the `AppBar`.
   */
  theme?: AppBarTheme;

  /**
   * Boolean if the content of the `AppBar` should be allowed to wrap. When this
   * is omitted, it will be considered true for `"none"`, `"prominent"` and
   * `"prominent-dense"` heights
   */
  flexWrap?: boolean;

  /**
   * Boolean if the `AppBarNav`, `AppBarTitle`, and `AppBarActions` should
   * inherit the color that for the provided `theme`. If this value is
   * `undefined`, the color will only be inherited when the theme is set to
   * `primary` or `secondary`. However if this value is a boolean, it will be
   * used instead. So if you set this to `false` and set the `theme` to
   * `"primary"`, the defined primary text color will not be inherited.
   */
  inheritColor?: boolean;
}

const block = bem("rmd-app-bar");

/**
 * This component is used to create a top-level app bar in your application that
 * can be used to contain a navigation menu toggle button, the app's logo and/or
 * title, as well as any top-level actions that will be reused throughout your
 * app. When using this component with the `fixed` prop, it is recommended to
 * also use one of the "offset class names" so that your content will not be
 * converted by the app bar. You can also use any of the exposed mixins to add
 * these offsets as well.
 */
export const AppBar = forwardRef<HTMLDivElement, AppBarProps>(function AppBar(
  {
    className,
    children,
    theme: propTheme = "primary",
    component: propComponent = "header",
    height = "normal",
    fixed = false,
    fixedPosition = "top",
    fixedElevation = true,
    inheritColor,
    flexWrap = height === "none" ||
      height === "prominent" ||
      height === "prominent-dense",
    ...remaining
  },
  ref
) {
  const parentContext = useParentContext();
  const inheritContext = useInheritContext(undefined);

  let inherit: boolean;
  let theme = propTheme;
  let Component = propComponent;
  if (typeof inheritColor === "boolean") {
    inherit = inheritColor;
  } else if (parentContext) {
    inherit = inheritContext;
    theme = "clear";
    Component = "div";
  } else {
    inherit = theme !== "clear" && theme !== "default";
  }

  return (
    <ParentContext.Provider value>
      <InheritContext.Provider value={inherit}>
        <Component
          {...remaining}
          className={cn(
            block({
              [theme]: theme !== "clear",
              [height]: height !== "none",
              wrap: flexWrap,
              fixed,
              [fixedPosition]: fixed,
              "fixed-elevation": fixed && fixedElevation,
            }),
            className
          )}
          ref={ref}
        >
          {children}
        </Component>
      </InheritContext.Provider>
    </ParentContext.Provider>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    AppBar.propTypes = {
      className: PropTypes.string,
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      height: PropTypes.oneOf([
        "none",
        "normal",
        "dense",
        "prominent",
        "prominent-dense",
      ]),
      flexWrap: PropTypes.bool,
      children: PropTypes.node,
      fixed: PropTypes.bool,
      fixedPosition: PropTypes.oneOf(["top", "bottom"]),
      fixedElevation: PropTypes.bool,
      inheritColor: PropTypes.bool,
      theme: PropTypes.oneOf(["primary", "secondary", "default", "clear"]),
    };
  } catch (e) {}
}
