import React, { FunctionComponent } from "react";
import {
  AppBar,
  AppBarNav,
  AppBarTitle,
  AppBarAction,
} from "@react-md/app-bar";
import { MenuSVGIcon, CloseSVGIcon } from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import { bem } from "@react-md/theme";

export interface HeaderProps {
  inline: boolean;
  isDesktop: boolean;
  toggleSheet: () => void;
  isSheetVisible: boolean;
  projectName: string;
  onRequestClose: () => void;
}

const block = bem("code-previewer");

const Header: FunctionComponent<HeaderProps> = ({
  inline,
  isDesktop,
  toggleSheet,
  isSheetVisible,
  projectName,
  onRequestClose,
}) => (
  <AppBar theme="default">
    {!isDesktop && (
      <Tooltipped id="code-previewer-tree-toggle" tooltip="Show Files">
        <AppBarNav onClick={toggleSheet} disabled={!inline && isSheetVisible}>
          <MenuSVGIcon />
        </AppBarNav>
      </Tooltipped>
    )}
    <AppBarTitle className={block("title")}>{projectName}</AppBarTitle>
    <Tooltipped id="close-code-previewer" tooltip="Close">
      <AppBarAction onClick={onRequestClose} first last inheritColor>
        <CloseSVGIcon />
      </AppBarAction>
    </Tooltipped>
  </AppBar>
);

export default Header;
