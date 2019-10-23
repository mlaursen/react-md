/* eslint-disable react/prop-types */
import React, { FC } from "react";
import cn from "classnames";
import { Sheet } from "@react-md/sheet";
import { Tree } from "@react-md/tree";
import { bem, RequireAtLeastOne } from "@react-md/utils";

import LayoutNavigationHeader from "./LayoutNavigationHeader";
import { LayoutNavigationProps } from "./types";
import { isInlineLayout } from "./useLayout";
import useNavigationVisibility from "./useNavigationVisibility";
import useTemporaryNavigation from "./useTemporaryNavigation";

interface FullLayoutNavigationProps extends LayoutNavigationProps {
  layoutId: string;
  fixedAppBar: boolean;
}

type StrictProps = RequireAtLeastOne<
  FullLayoutNavigationProps,
  "navTreeLabel" | "navTreeLabelledBy"
> &
  RequireAtLeastOne<
    FullLayoutNavigationProps,
    "sheetLabel" | "sheetLabelledBy"
  >;

const block = bem("rmd-layout-nav");

/**
 * @private
 */
const LayoutNavigation: FC<StrictProps> = ({
  layoutId,
  fixedAppBar,
  navItems,
  navStyle,
  navClassName,
  navTreeLabel,
  navTreeLabelledBy,
  hideNavIcon,
  hideNavLabel,
  hideNavLabelledBy,
  sheetLabel,
  sheetLabelledBy,
  sheetStyle,
  sheetClassName,
  navHeader: propNavHeader,
  navHeaderTitle,
  navHeaderStyle,
  navHeaderClassName,
  navFooter,
  disableTemporaryAutoclose,
  ...props
}) => {
  const { selectedIds } = props;
  useTemporaryNavigation(selectedIds, disableTemporaryAutoclose);
  const {
    hideNav,
    layout,
    isFullHeight,
    isPersistent,
    isNavVisible,
  } = useNavigationVisibility();
  const tree = (
    <Tree
      {...props}
      id={`${layoutId}-nav-tree`}
      data={navItems}
      aria-label={navTreeLabel}
      aria-labelledby={navTreeLabelledBy}
    />
  );

  let navHeader = propNavHeader;
  if (typeof navHeader === "undefined") {
    navHeader = (
      <LayoutNavigationHeader
        style={navHeaderStyle}
        className={navHeaderClassName}
        layoutId={layoutId}
        hideNavIcon={hideNavIcon}
        hideNavLabel={hideNavLabel}
        hideNavLabelledBy={hideNavLabelledBy}
      >
        {navHeaderTitle}
      </LayoutNavigationHeader>
    );
  }

  const isInline = isInlineLayout(layout);
  return (
    <Sheet
      id={`${layoutId}-nav-container`}
      aria-label={sheetLabel as string}
      aria-labelledby={sheetLabelledBy}
      role={isInline ? "none" : "dialog"}
      style={sheetStyle}
      className={cn(
        block({ offset: fixedAppBar && isPersistent && !isFullHeight }),
        sheetClassName
      )}
      visible={isNavVisible}
      onRequestClose={hideNav}
      component={isInline ? "nav" : "div"}
    >
      {navHeader}
      {isPersistent && tree}
      {!isPersistent && (
        <nav style={navStyle} className={navClassName}>
          {tree}
        </nav>
      )}
      {navFooter}
    </Sheet>
  );
};

export default LayoutNavigation;
