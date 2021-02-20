import React, { forwardRef, ReactNode } from "react";
import cn from "classnames";
import { AppBar, AppBarProps, AppBarTitle } from "@react-md/app-bar";
import { bem, PropsWithRef } from "@react-md/utils";

import {
  LayoutCloseNavigationButton,
  LayoutCloseNavigationButtonProps,
} from "./LayoutCloseNavigationButton";
import { useLayoutConfig } from "./LayoutProvider";

export interface LayoutNavigationHeaderProps
  extends Omit<AppBarProps, "title"> {
  /**
   * An optional title to display that will be wrapped in the `AppBarTitle`
   * component.
   *
   * Note: If you do not want to wrap the title with the `AppBarTitle` component
   * and want additional configuration, just provide your own `children`
   * instead.
   */
  title?: ReactNode;

  /**
   * Any additional props to provide to the `AppBarTitle` when the `title` prop
   * was provided.
   */
  titleProps?: PropsWithRef<AppBarProps, HTMLDivElement>;

  /**
   * Boolean if the header should gain a border-bottom.
   */
  disableBorderBottom?: boolean;

  /**
   * An optional close navigation button to use instead of the default
   * `LayoutCloseNavigationButton`.
   */
  closeNav?: ReactNode;

  /**
   * Any props to pass to the default `LayoutCloseNavigationButton` when the
   * `closeNav` prop was omitted.
   */
  closeNavProps?: PropsWithRef<
    LayoutCloseNavigationButtonProps,
    HTMLButtonElement
  >;
}

const styles = bem("rmd-layout-nav-header");

/**
 * The default implementation for the `AppBar` within the `LayoutNavigation`
 * that allows for rendering a title along with the `LayoutCloseNavigationButton`.
 */
export const LayoutNavigationHeader = forwardRef<
  HTMLDivElement,
  LayoutNavigationHeaderProps
>(function LayoutNavigationHeader(
  {
    theme = "clear",
    children,
    className,
    closeNav,
    closeNavProps,
    title: propTitle,
    titleProps,
    disableBorderBottom = false,
    ...props
  },
  ref
) {
  const { layout } = useLayoutConfig();
  if (layout === "clipped" || layout === "floating") {
    return null;
  }

  let title: ReactNode = null;
  if (propTitle) {
    title = <AppBarTitle {...titleProps}>{propTitle}</AppBarTitle>;
  }

  let action = closeNav;
  if (typeof action === "undefined") {
    action = <LayoutCloseNavigationButton {...closeNavProps} />;
  }

  return (
    <AppBar
      {...props}
      ref={ref}
      theme={theme}
      className={cn(styles({ bordered: !disableBorderBottom }), className)}
    >
      {title}
      {children}
      {action}
    </AppBar>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    LayoutNavigationHeader.propTypes = {
      disableBorderBottom: PropTypes.bool,
      className: PropTypes.string,
      closeNav: PropTypes.node,
      closeNavProps: PropTypes.object,
      theme: PropTypes.oneOf(["clear", "primary", "secondary", "default"]),
      children: PropTypes.node,
      title: PropTypes.node,
      titleProps: PropTypes.object,
    };
  } catch (error) {}
}
