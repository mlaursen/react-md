"use client";
import type { SemVer } from "@/utils/semver.js";
import { AppBar, AppBarTitle, Button, Sheet } from "@react-md/core";
import MenuOutlinedIcon from "@react-md/material-icons/MenuOutlinedIcon";
import type { ReactElement } from "react";
import { useLayoutContext } from "./LayoutProvider.js";
import { VersionDropdown } from "./VersionDropdown.jsx";

export interface NavigationToggleProps extends SemVer {
  version: string;
}

export function NavigationToggle(props: NavigationToggleProps): ReactElement {
  const { version, major, minor, patch, alpha } = props;
  const {
    temporaryNavVisible,
    toggleNavigation,
    hideTemporaryNav,
    onTemporaryTransitionComplete,
    disableTransition,
  } = useLayoutContext();
  return (
    <>
      <Button
        aria-label="Navigation"
        buttonType="icon"
        onClick={toggleNavigation}
      >
        <MenuOutlinedIcon />
      </Button>
      <Sheet
        aria-label="Navigation"
        visible={temporaryNavVisible}
        onRequestClose={hideTemporaryNav}
        disableTransition={disableTransition}
        onEntered={onTemporaryTransitionComplete}
        onExited={onTemporaryTransitionComplete}
      >
        <AppBar theme="surface">
          <AppBarTitle>react-md</AppBarTitle>
          <VersionDropdown
            version={version}
            major={major}
            minor={minor}
            patch={patch}
            alpha={alpha}
          />
        </AppBar>
      </Sheet>
    </>
  );
}
