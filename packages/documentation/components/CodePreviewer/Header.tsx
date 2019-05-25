import React, { FC } from "react";
import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { MenuSVGIcon, CloseSVGIcon } from "@react-md/material-icons";
import { bem } from "@react-md/theme";

import AppBarNav from "components/AppBarNav";
import AppBarAction from "components/AppBarAction";

export interface HeaderProps {
  inline: boolean;
  isDesktop: boolean;
  toggleSheet: () => void;
  isSheetVisible: boolean;
  projectName: string;
  onRequestClose: () => void;
}

const block = bem("code-previewer");

const Header: FC<HeaderProps> = ({
  inline,
  isDesktop,
  toggleSheet,
  isSheetVisible,
  projectName,
  onRequestClose,
}) => (
  <AppBar theme="default">
    {!isDesktop && (
      <AppBarNav
        id="code-previewer-tree-toggle"
        tooltip="Show Files"
        onClick={toggleSheet}
        disabled={!inline && isSheetVisible}
      >
        <MenuSVGIcon />
      </AppBarNav>
    )}
    <AppBarTitle className={block("title")}>{projectName}</AppBarTitle>
    <AppBarAction
      id="close-code-previewer"
      tooltip="Close"
      onClick={onRequestClose}
      first
      last
      inheritColor
    >
      <CloseSVGIcon />
    </AppBarAction>
  </AppBar>
);

export default Header;
