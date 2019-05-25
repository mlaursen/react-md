import React, { FC } from "react";
import cn from "classnames";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
import { MenuSVGIcon } from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import { bem } from "@react-md/theme";

import ToggleRTL from "./ToggleRTL";
import ToggleTheme from "./ToggleTheme";
import GithubLink from "components/GithubLink";

interface Props {
  title: string;
  toggle: () => void;
  isDesktop: boolean;
  isSheetVisible: boolean;
}

const block = bem("layout");

const Header: FC<Props> = ({ title, toggle, isDesktop, isSheetVisible }) => (
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
      >
        <MenuSVGIcon />
      </AppBarNav>
    )}
    <AppBarTitle keyline={isDesktop} className={block("title")}>
      {title}
    </AppBarTitle>
    <ToggleTheme />
    <Tooltipped id="main-github-link" tooltip="View GitHub">
      <GithubLink inherit />
    </Tooltipped>
    <ToggleRTL />
  </AppBar>
);

export default Header;
