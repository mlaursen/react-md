import React, { FC } from "react";
import cn from "classnames";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
import { MenuSVGIcon } from "@react-md/material-icons";
import { bem } from "@react-md/utils";

import Actions from "./Actions";

interface Props {
  title: string;
  toggle: () => void;
  isPhone: boolean;
  isDesktop: boolean;
  isSheetVisible: boolean;
}

const block = bem("layout");

const Header: FC<Props> = ({
  title,
  toggle,
  isPhone,
  isDesktop,
  isSheetVisible,
}) => (
  <AppBar
    id="main-app-bar"
    fixed
    className={cn(block("app-bar", { desktop: isDesktop }))}
  >
    {!isDesktop && (
      <AppBarNav
        id="main-nav-toggle"
        onClick={toggle}
        disabled={isSheetVisible}
        aria-label="Show Main Navigation"
      >
        <MenuSVGIcon />
      </AppBarNav>
    )}
    <AppBarTitle keyline={isDesktop} className={block("title")}>
      {title}
    </AppBarTitle>
    <Actions isPhone={isPhone} />
  </AppBar>
);

export default Header;
