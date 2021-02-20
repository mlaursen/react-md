import React, { forwardRef } from "react";
import { AppBar, AppBarProps } from "@react-md/app-bar";

import { LayoutAppBarTitle } from "./LayoutAppBarTitle";
import { LayoutNavToggle, LayoutWithNavToggle } from "./LayoutNavToggle";
import { useLayoutConfig } from "./LayoutProvider";
import { LayoutWithTitle } from "./types";

export interface BaseLayoutAppBarProps extends Omit<AppBarProps, "title"> {
  /**
   * Boolean if the `AppBar` should be fixed to the top of the page. Unlike the
   * regular `AppBar`, this will be defaulted to `true`
   */
  fixed?: boolean;
}

export interface LayoutAppBarProps
  extends BaseLayoutAppBarProps,
    LayoutWithNavToggle,
    LayoutWithTitle {}

/**
 * This is the default implementation for an `AppBar` within the `Layout` that
 * will conditionally render the default `LayoutNavToggle` button and
 * `AppBarTitle` depending on specific props that were provided.
 */
export const LayoutAppBar = forwardRef<HTMLDivElement, LayoutAppBarProps>(
  function LayoutAppBar(
    {
      children,
      fixed = true,
      navToggle: propNavToggle,
      navToggleProps,
      customTitle,
      title: titleChildren,
      titleProps,
      ...props
    },
    ref
  ) {
    const { baseId, layout } = useLayoutConfig();

    let nav = propNavToggle;
    if (typeof nav === "undefined") {
      // set the key to the current layout since we want the button to re-mount
      // on layout changes so the transition does not occur
      nav = <LayoutNavToggle key={layout} {...navToggleProps} />;
    }

    let title = customTitle;
    if (typeof title === "undefined") {
      title = (
        <LayoutAppBarTitle {...titleProps}>{titleChildren}</LayoutAppBarTitle>
      );
    }

    return (
      <AppBar id={`${baseId}-header`} {...props} ref={ref} fixed={fixed}>
        {nav}
        {title}
        {children}
      </AppBar>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    LayoutAppBar.propTypes = {
      fixed: PropTypes.bool,
      navToggle: PropTypes.node,
      navToggleProps: PropTypes.object,
      className: PropTypes.string,
      customTitle: PropTypes.node,
      title: PropTypes.node,
      titleProps: PropTypes.object,
      children: PropTypes.node,
    };
  } catch (error) {}
}
