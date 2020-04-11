import React, { FC } from "react";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { MenuItem } from "@react-md/menu";
import useRTLToggle from "./useRTLToggle";

const ToggleRTLMenuItem: FC = () => {
  const { isRTL, toggleRTL } = useRTLToggle();

  return (
    <MenuItem
      id="toggle-rtl"
      onClick={toggleRTL}
      leftAddon={
        isRTL ? <FormatAlignRightSVGIcon /> : <FormatAlignLeftSVGIcon />
      }
      secondaryText={`Current orientation: ${isRTL ? "RTL" : "LTR"}`}
    >
      Toggle RTL
    </MenuItem>
  );
};

export default ToggleRTLMenuItem;
