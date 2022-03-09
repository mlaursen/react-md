import type { ReactElement } from "react";
import { AppBarAction } from "@react-md/app-bar";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { MenuItem } from "@react-md/menu";
import { Tooltip, useTooltip } from "@react-md/tooltip";
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

  const { elementProps, tooltipProps } = useTooltip({
    baseId: "toggle-rtl",
    onClick: toggleDir,
  });

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
    <>
      <AppBarAction
        {...elementProps}
        last
        aria-label="Right to left layout"
        aria-pressed={isRTL}
      >
        {icon}
      </AppBarAction>
      <Tooltip {...tooltipProps}>TOggle right to left</Tooltip>
    </>
  );
}
