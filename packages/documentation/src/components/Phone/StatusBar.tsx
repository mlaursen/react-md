import React, { FC } from "react";
import { AppBar } from "@react-md/app-bar";
import {
  NetworkWifiSVGIcon,
  NetworkCellSVGIcon,
  BatteryFullSVGIcon,
} from "@react-md/material-icons";
import { bem } from "@react-md/utils";

export interface StatusBarProps {
  id: string;
  isPhone: boolean;
}

const block = bem("phone");

const StatusBar: FC<StatusBarProps> = ({ id, isPhone }) => {
  if (isPhone) {
    return null;
  }

  return (
    <AppBar
      id={`${id}-status-bar`}
      className={block("status-bar")}
      height="dense"
      theme="clear"
      component="div"
    >
      <NetworkWifiSVGIcon
        role="presentation"
        className={block("icon", { first: true })}
      />
      <NetworkCellSVGIcon role="presentation" className={block("icon")} />
      <BatteryFullSVGIcon role="presentation" className={block("icon")} />
    </AppBar>
  );
};

export default StatusBar;
