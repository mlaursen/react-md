import React, { FC } from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import { useIsUserInteractionMode, useToggle } from "@react-md/utils";

import useTheme from "components/Theme/useTheme";
import useThemeActions from "components/Theme/useThemeActions";
import LightbulbSVGIcon from "icons/LightbulbSVGIcon";

import styles from "./ToggleTheme.module.scss";

const ToggleTheme: FC = () => {
  const { theme } = useTheme();
  const { toggleTheme } = useThemeActions();
  const isLight = theme === "light";

  const [toggled, enable, disable] = useToggle(false);
  let icon = <LightbulbOutlineSVGIcon />;
  if (toggled !== isLight) {
    icon = <LightbulbSVGIcon />;
  }

  const isMouseMode = useIsUserInteractionMode("mouse");

  return (
    <Tooltipped id="toggle-theme" tooltip="Toggle Light/Dark Theme">
      <AppBarAction
        aria-label="Dark Theme"
        aria-pressed={!isLight}
        onClick={toggleTheme}
        onMouseEnter={isMouseMode ? enable : undefined}
        onMouseLeave={isMouseMode ? disable : undefined}
        className={cn({
          [styles.on]: isLight,
          [styles.off]: !isLight,
        })}
        inheritColor={!isLight}
      >
        {icon}
      </AppBarAction>
    </Tooltipped>
  );
};

export default ToggleTheme;
