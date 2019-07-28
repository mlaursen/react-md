import React, { FC } from "react";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { MenuItem } from "@react-md/menu";
import { bem } from "@react-md/utils";

import LightbulbSVGIcon from "icons/LightbulbSVGIcon";

import { useThemeContext, useThemeToggle } from "./ThemeContext";

const block = bem("toggle-theme");

const ToggleThemeMenuItem: FC = () => {
  const onClick = useThemeToggle();
  const currentTheme = useThemeContext();
  const isLight = currentTheme === "light";
  let icon = <LightbulbOutlineSVGIcon />;
  if (isLight) {
    icon = <LightbulbSVGIcon className={block({ on: true })} />;
  }

  return (
    <MenuItem
      id="toggle-theme"
      onClick={onClick}
      leftIcon={icon}
      secondaryText={`Current theme: ${currentTheme}`}
    >
      Toggle Light/Dark Theme
    </MenuItem>
  );
};

export default ToggleThemeMenuItem;
