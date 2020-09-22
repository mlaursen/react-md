import React, { ReactElement } from "react";
import { AppBarAction } from "@react-md/app-bar";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { MenuItem } from "@react-md/menu";
import { Tooltipped } from "@react-md/tooltip";
import { useDir } from "@react-md/utils";

export interface ToggleRTLProps {
  as: "action" | "menuitem";
}

export default function ToggleRTL({ as }: ToggleRTLProps): ReactElement {
  const { dir, toggleDir } = useDir();
  const isRTL = dir === "rtl";
  let icon = <FormatAlignLeftSVGIcon />;
  if (isRTL) {
    icon = <FormatAlignRightSVGIcon />;
  }

  if (as === "menuitem") {
    return (
      <MenuItem
        id="toggle-rtl"
        onClick={toggleDir}
        leftAddon={icon}
        secondaryText={`Current orientation: ${isRTL ? "RTL" : "LTR"}`}
      >
        Toggle RTL
      </MenuItem>
    );
  }

  return (
    <Tooltipped id="toggle-rtl" tooltip="Toggle right to left">
      <AppBarAction
        last
        onClick={toggleDir}
        aria-label="Right to left layout"
        aria-pressed={isRTL}
      >
        {icon}
      </AppBarAction>
    </Tooltipped>
  );
}
