import React, { FC } from "react";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { MenuItem } from "@react-md/menu";
import { bem } from "@react-md/utils";

import useTheme from "components/Theme/useTheme";
import useThemeActions from "components/Theme/useThemeActions";
import LightbulbSVGIcon from "icons/LightbulbSVGIcon";

const block = bem("toggle-theme");

const ToggleThemeMenuItem: FC = () => {
  const { theme } = useTheme();
  const { toggleTheme } = useThemeActions();
  const isLight = theme === "light";
  let icon = <LightbulbOutlineSVGIcon />;
  if (isLight) {
    icon = <LightbulbSVGIcon className={block({ on: true })} />;
  }

  return (
    <MenuItem
      id="toggle-theme"
      onClick={toggleTheme}
      leftIcon={icon}
      secondaryText={`Current theme: ${theme}`}
    >
      Toggle Light/Dark Theme
    </MenuItem>
  );
};

export default ToggleThemeMenuItem;
