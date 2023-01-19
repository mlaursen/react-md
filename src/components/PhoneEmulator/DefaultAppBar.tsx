import { AppBar, AppBarTitle, Button } from "@react-md/core";
import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import type { ReactElement } from "react";
import { ClosePhoneEmulatorButton } from "./ClosePhoneEmulatorButton";
import { StatusBar } from "./StatusBar";

import styles from "./DefaultAppBar.module.scss";

export function DefaultAppBar(): ReactElement {
  return (
    <AppBar
      height="auto"
      theme="clear"
      className={styles.container}
      stacked
      fixed
      disableFixedElevation
    >
      <StatusBar />
      <AppBar theme="clear">
        <ClosePhoneEmulatorButton />
        <AppBarTitle>Example</AppBarTitle>
        <Button aria-label="Search" buttonType="icon">
          <SearchIcon />
        </Button>
        <Button aria-label="Options" buttonType="icon">
          <MoreVertIcon />
        </Button>
      </AppBar>
    </AppBar>
  );
}
