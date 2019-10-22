/* eslint-disable react/prop-types */
import React, { FC, ReactNode, Ref } from "react";
import cn from "classnames";
import { AppBar, AppBarNav, AppBarProps, AppBarTitle } from "@react-md/app-bar";
import { bem } from "@react-md/utils";

import { LayoutAppBarNavProps } from "./types";
import { isToggleableLayout } from "./useLayout";
import useLayoutNavigationContext from "./useLayoutNavigationContext";

/**
 * @private
 */
export interface LayoutAppBarProps extends AppBarProps, LayoutAppBarNavProps {
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
   * An optional class name ot merge to with the required layout app bar's className.
   */
  className?: string;
}

const block = bem("rmd-layout-header");

/**
 * @private
 */
const LayoutAppBar: FC<LayoutAppBarProps> = ({
  children,
  layoutId,
  appBarTitle,
  appBarRef,
  navIcon,
  navIconLabel,
  navIconLabelledBy,
  className: propClassName,
  ...props
}) => {
  const {
    showNav,
    layout,
    isNavVisible,
    isFullHeight,
    isPersistent,
  } = useLayoutNavigationContext();

  const isToggleable = isToggleableLayout(layout);
  const isToggleableVisible = isToggleable && isNavVisible;

  return (
    <AppBar
      id={`${layoutId}-header`}
      {...props}
      ref={appBarRef}
      className={cn(
        block({
          "nav-offset": isFullHeight || isToggleableVisible,
        }),
        propClassName
      )}
    >
      {!isPersistent && !isToggleableVisible && (
        <AppBarNav
          id={`${layoutId}-nav`}
          aria-label={navIconLabel}
          aria-labelledby={navIconLabelledBy}
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
