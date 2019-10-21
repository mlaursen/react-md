/* eslint-disable react/prop-types */
import React, { FC } from "react";
import cn from "classnames";
import { Sheet } from "@react-md/sheet";
import { Tree } from "@react-md/tree";
import { RequireAtLeastOne, bem } from "@react-md/utils";

import { LayoutNavigationProps } from "./types";

interface FullLayoutNavigationProps extends LayoutNavigationProps {
  offset: boolean;
  layoutId: string;
  visible: boolean;
  hideNav: () => void;
  isPersistent: boolean;
}

type StrictProps = RequireAtLeastOne<
  FullLayoutNavigationProps,
  "navLabel" | "navLabelledBy"
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
  offset,
  layoutId,
  navItems,
  visible,
  hideNav,
  isPersistent,
  navLabel,
  navLabelledBy,
  sheetLabel,
  sheetLabelledBy,
  sheetStyle,
  sheetClassName,
  ...props
}) => {
  const tree = (
    <Tree
      {...props}
      id={`${layoutId}-nav-tree`}
      data={navItems}
      aria-label={navLabel}
      aria-labelledby={navLabelledBy}
    />
  );

  return (
    <Sheet
      id={`${layoutId}-nav-container`}
      aria-label={sheetLabel as string}
      aria-labelledby={sheetLabelledBy}
      role={isPersistent ? "none" : "dialog"}
      style={sheetStyle}
      className={cn(block({ offset }), sheetClassName)}
      visible={visible}
      onRequestClose={hideNav}
      component={isPersistent ? "nav" : "div"}
    >
      {isPersistent ? tree : <nav>{tree}</nav>}
    </Sheet>
  );
};

export default LayoutNavigation;
