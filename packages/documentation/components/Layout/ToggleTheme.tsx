import React, { FC } from "react";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { useInteractionModeContext } from "@react-md/states";
import { Tooltipped } from "@react-md/tooltip";
import { bem, useToggle } from "@react-md/utils";

import LightbulbSVGIcon from "icons/LightbulbSVGIcon";
import { useThemeContext, useThemeToggle } from "./ThemeContext";
import "./ToggleTheme.scss";

const block = bem("toggle-theme");

const ToggleTheme: FC = () => {
  const theme = useThemeContext();
  const isLight = theme === "light";
  const toggleTheme = useThemeToggle();

  const [toggled, enable, disable] = useToggle(false);
  let icon = <LightbulbOutlineSVGIcon />;
  if (toggled !== isLight) {
    icon = <LightbulbSVGIcon />;
  }

  const isMouseMode = useInteractionModeContext() === "mouse";

  return (
    <Tooltipped id="toggle-theme" tooltip="Toggle Light/Dark Theme">
      <AppBarAction
        aria-label="Toggle Theme"
        first
        onClick={toggleTheme}
        onMouseEnter={isMouseMode ? enable : undefined}
        onMouseLeave={isMouseMode ? disable : undefined}
        className={block({ on: isLight, off: !isLight })}
        inheritColor={!isLight}
      >
        {icon}
      </AppBarAction>
    </Tooltipped>
  );
};

export default ToggleTheme;
