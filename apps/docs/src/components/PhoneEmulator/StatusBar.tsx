import { AppBar } from "@react-md/core";
import type { ReactElement } from "react";
import NetworkWifiIcon from "@react-md/material-icons/NetworkWifiIcon";
import NetworkCellIcon from "@react-md/material-icons/NetworkCellIcon";
import Battery4BarIcon from "@react-md/material-icons/Battery4BarIcon";

import styles from "./StatusBar.module.scss";

export function StatusBar(): ReactElement {
  return (
    <AppBar as="div" theme="clear" className={styles.container}>
      <NetworkWifiIcon />
      <NetworkCellIcon />
      <Battery4BarIcon />
    </AppBar>
  );
}
