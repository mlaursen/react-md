import React, { FC } from "react";
import { AppBar, AppBarTitle, AppBarAction } from "@react-md/app-bar";
import { MenuSVGIcon } from "@react-md/material-icons";
import { bem, MobileOnly } from "@react-md/utils";

import AppBarNav from "components/AppBarNav";

interface SandboxNavigationProps {
  name: string;
  from: string;
  fileName: string;
  onRequestFiles: () => void;
  onRequestClose: () => void;
}

const block = bem("sandbox-modal");

const SandboxNavigation: FC<SandboxNavigationProps> = ({
  name,
  from,
  fileName,
  onRequestFiles,
  onRequestClose,
}) => {
  return (
    <AppBar prominent dense theme="default" className={block("header")}>
      <AppBar>
        <MobileOnly>
          <AppBarNav
            id="sandbox-dialog-file-tree-toggle"
            tooltip="Show Files"
            aria-label="Show Files"
            onClick={onRequestFiles}
          >
            <MenuSVGIcon />
          </AppBarNav>
        </MobileOnly>
        <AppBarTitle id="sandbox-dialog-title" noWrap>
          {name}
        </AppBarTitle>
        <AppBarAction
          id="sandbox-dialog-close"
          first
          last
          buttonType="text"
          onClick={onRequestClose}
        >
          {from ? "Go Back" : "Close"}
        </AppBarAction>
      </AppBar>
      <code className={block("breadcrumbs")}>
        {fileName.replace(/\//g, " / ")}
      </code>
    </AppBar>
  );
};

export default SandboxNavigation;
