/* eslint-disable react/prop-types */
import React, { FC, ReactNode, Ref } from "react";
import cn from "classnames";
import { AppBar, AppBarNav, AppBarTitle, AppBarProps } from "@react-md/app-bar";
import { bem } from "@react-md/utils";

import { LayoutAppBarRenderer, LayoutAppBarRendererProps } from "./types";

/**
 * @private
 */
export interface LayoutAppBarProps
  extends AppBarProps,
    Omit<LayoutAppBarRendererProps, "className"> {
  /**
   * The custom app bar renderer.
   */
  renderer: LayoutAppBarRenderer | undefined;

  /**
   * The id for the base `Layout` component. This is used to prefix all the element ids.
   */
  layoutId: string;

  /**
   * The optional app bar title.
   */
  appBarTitle?: ReactNode;

  /**
   * An optional ref to apply to the AppBar.
   */
  appBarRef?: Ref<HTMLDivElement>;

  /**
   * The navigation icon to use when the main navigation is not persistent. This will be
   * rendered in the `AppBarNav` component.
   */
  navIcon: ReactNode;

  /**
   * An optional class name ot merge to with the required layout app bar's className.
   */
  className?: string;
}

const block = bem("rmd-layout-header");

/**
 * @private
 */
const LayoutAppBar: FC<LayoutAppBarProps> = ({
  offset,
  renderer,
  children,
  layoutId,
  appBarTitle,
  appBarRef,
  navIcon,
  navIconLabel,
  showNav,
  isNavVisible,
  isPersistent,
  className: propClassName,
  ...props
}) => {
  const className = cn(block({ "nav-offset": offset }), propClassName);
  if (typeof renderer === "function") {
    return renderer({
      className,
      navIconLabel,
      offset,
      showNav,
      isNavVisible,
      isPersistent,
    });
  }

  return (
    <AppBar
      id={`${layoutId}-header`}
      {...props}
      className={className}
      ref={appBarRef}
    >
      {!isPersistent && (
        <AppBarNav
          id={`${layoutId}-nav`}
          aria-label={navIconLabel}
          disabled={isNavVisible}
          onClick={showNav}
        >
          {navIcon}
        </AppBarNav>
      )}
      {appBarTitle && (
        <AppBarTitle id={`${layoutId}-title`} noWrap>
          {appBarTitle}
        </AppBarTitle>
      )}
      {children}
    </AppBar>
  );
};

export default LayoutAppBar;
