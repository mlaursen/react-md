/* eslint-disable react/prop-types */
import React, { CSSProperties, FC, ReactNode } from "react";
import { cnb } from "cnbuilder";
import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { bem } from "@react-md/utils";

import { LayoutToggleableAppBarNavProps } from "./types";
import { isFullHeightLayout, isToggleableLayout } from "./useLayout";
import useNavigationVisibility from "./useNavigationVisibility";

interface LayoutNavigationHeaderProps extends LayoutToggleableAppBarNavProps {
  style?: CSSProperties;
  className?: string;
  layoutId: string;
  children?: ReactNode;
}

const block = bem("rmd-layout-nav-header");

const LayoutNavigationHeader: FC<LayoutNavigationHeaderProps> = ({
  style,
  className,
  layoutId,
  hideNavIcon,
  hideNavLabel,
  hideNavLabelledBy,
  children,
}) => {
  const { hideNav, layout } = useNavigationVisibility();
  const isFullHeight = isFullHeightLayout(layout);

  // only want this header to show on the toggleable types
  if (!isToggleableLayout(layout) && !isFullHeight) {
    return null;
  }

  return (
    <AppBar
      id={`${layoutId}-nav-header`}
      style={style}
      className={cnb(block(), className)}
      inheritColor
      theme="clear"
    >
      {children && (
        <AppBarTitle id={`${layoutId}-nav-header-title`} keyline>
          {children}
        </AppBarTitle>
      )}
      {!isFullHeight && (
        <AppBarAction
          id={`${layoutId}-hide-nav`}
          aria-label={hideNavLabel}
          aria-labelledby={hideNavLabelledBy}
          onClick={hideNav}
          first
          last
        >
          {hideNavIcon}
        </AppBarAction>
      )}
    </AppBar>
  );
};

export default LayoutNavigationHeader;
