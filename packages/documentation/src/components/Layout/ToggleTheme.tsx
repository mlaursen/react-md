import React, { ReactElement } from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { MenuItem } from "@react-md/menu";
import { Tooltipped } from "@react-md/tooltip";
import { useIsUserInteractionMode, useToggle } from "@react-md/utils";

import useTheme from "components/Theme/useTheme";
import useThemeActions from "components/Theme/useThemeActions";
import LightbulbSVGIcon from "icons/LightbulbSVGIcon";

import styles from "./ToggleTheme.module.scss";

export interface ToggleThemeProps {
  as: "action" | "menuitem";
}

export default function ToggleTheme({ as }: ToggleThemeProps): ReactElement {
  const [toggled, enable, disable] = useToggle(false);
  const { theme } = useTheme();
  const { toggleTheme } = useThemeActions();
  const isLight = theme === "light";

  let icon = <LightbulbOutlineSVGIcon />;
  if (toggled !== isLight) {
    icon = (
      <LightbulbSVGIcon
        className={cn({
          [styles.on]: as === "menuitem",
        })}
      />
    );
  }

  const isMouseMode = useIsUserInteractionMode("mouse");
  if (as === "menuitem") {
    return (
      <MenuItem
        id="toggle-theme"
        onClick={toggleTheme}
        leftAddon={icon}
        secondaryText={`Current theme: ${theme}`}
      >
        Toggle Light/Dark Theme
      </MenuItem>
    );
  }

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
}
