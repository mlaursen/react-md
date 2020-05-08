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
   * Boolean if the `AppBar` should use the `dense` spec. This prop can be used
   * along with the `prominent` prop to create a prominent and dense `AppBar`.
   */
  dense?: boolean;

  /**
   * Boolean if the `AppBar` should use the `prominent` spec. This prop can be
   * used along with the `dense` prop to create a prominent and dense `AppBar`.
   */
  prominent?: boolean;

  /**
   * The theme to apply to the `AppBar`.
   */
  theme?: AppBarTheme;

  /**
   * Boolean if the `AppBarNav`, `AppBarTitle`, and `AppBarActions` should
   * inherit the color that for the provided `theme`. If this value is
   * `undefined`, the color will only be inherited when the theme is set to
   * `primary` or `secondary`. However if this value is a boolean, it will be
   * used instead. So if you set this to `false` and set the `theme` to
   * `"primary"`, the defined primary text color will not be inherited.
   */
  inheritColor?: boolean;

  /**
   * Boolean if the height should be derived from the content's size instead of
   * having static fixed heights. This will update the `height` to be `auto` and
   * instead set the `min-height` to the current "static" height. This is great
   * when you want to add tabs or other elements into the `AppBar`.
   *
   * Note: Enabling this prop will **prevent the `rmd-app-bar-offset`
   * functionality** since the height is no longer static.
   */
  derived?: boolean;
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
const AppBar = forwardRef<HTMLDivElement, AppBarProps>(function AppBar(
  {
    className,
    children,
    theme: propTheme = "primary",
    component: propComponent = "header",
    dense = false,
    prominent = false,
    derived = false,
    fixed = false,
    fixedPosition = "top",
    fixedElevation = true,
    inheritColor,
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
              dense: dense && !prominent,
              prominent,
              "prominent-dense": dense && prominent,
              derived,
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
      children: PropTypes.node,
      dense: PropTypes.bool,
      prominent: PropTypes.bool,
      derived: PropTypes.bool,
      fixed: PropTypes.bool,
      fixedPosition: PropTypes.oneOf(["top", "bottom"]),
      fixedElevation: PropTypes.bool,
      inheritColor: PropTypes.bool,
      theme: PropTypes.oneOf(["primary", "secondary", "default", "clear"]),
    };
  } catch (e) {}
}

export default AppBar;
