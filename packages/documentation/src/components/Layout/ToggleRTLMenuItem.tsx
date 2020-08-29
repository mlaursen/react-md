import React, { FC } from "react";
import {
  FormatAlignLeftSVGIcon,
  FormatAlignRightSVGIcon,
} from "@react-md/material-icons";
import { MenuItem } from "@react-md/menu";
import { useDir } from "@react-md/utils";

const ToggleRTLMenuItem: FC = () => {
  const { dir, toggleDir } = useDir();
  const isRTL = dir === "rtl";

  return (
    <MenuItem
      id="toggle-rtl"
      onClick={toggleDir}
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
