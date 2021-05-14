import React, { ReactElement } from "react";
import { AppBar } from "@react-md/app-bar";
import { MenuSVGIcon } from "@react-md/material-icons";
import { MobileOnly, useAppSize } from "@react-md/utils";

import AppBarNav from "components/AppBarNav";
import AppBarTitle from "components/AppBarTitle";

import styles from "./SandboxNavigation.module.scss";
import NavigationActions from "./NavigationActions";

interface SandboxNavigationProps {
  name: string;
  from: string;
  fileName: string;
  onRequestFiles: () => void;
  onRequestClose: () => void;
}

export default function SandboxNavigation({
  name,
  from,
  fileName,
  onRequestFiles,
  onRequestClose,
}: SandboxNavigationProps): ReactElement {
  const { isPhone } = useAppSize();

  return (
    <AppBar height="prominent-dense" theme="default" className={styles.header}>
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
        {!isPhone && (
          <NavigationActions from={from} onRequestClose={onRequestClose} />
        )}
      </AppBar>
      <code className={styles.breadcrumbs}>
        {fileName.replace(/\//g, " / ")}
      </code>
    </AppBar>
  );
}
