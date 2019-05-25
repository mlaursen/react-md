import React, { FC, useEffect, useRef } from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { useInteractionModeContext } from "@react-md/states";
import { Tooltipped } from "@react-md/tooltip";
import { useToggle } from "@react-md/utils";

import LightbulbSVGIcon from "icons/LightbulbSVGIcon";

import "./toggle-theme.scss";
import { useThemeContext, useThemeToggle } from "./ThemeContext";

const THEME_TRANSITION_DURATION = 150;

function useThemeTransition(isLight: boolean) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    const root = document.documentElement as HTMLElement;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    root.classList.add("toggle-theme-transition");
    // force dom repaint
    root.scrollTop;
    if (isLight) {
      root.classList.add("light-theme");
    } else {
      root.classList.remove("light-theme");
    }

    const timeout = window.setTimeout(() => {
      root.classList.remove("toggle-theme-transition");
    }, THEME_TRANSITION_DURATION);

    return () => {
      window.clearTimeout(timeout);
      root.classList.remove("toggle-theme-transition");
    };
  }, [isLight]);
}

const ToggleTheme: FC = () => {
  const theme = useThemeContext();
  const isLight = theme === "light";
  const toggleTheme = useThemeToggle();
  useThemeTransition(isLight);

  const { toggled, enable, disable } = useToggle();
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
        className={cn("toggle-theme", {
          "toggle-theme--on": isLight,
          "toggle-theme--off": !isLight,
        })}
        inheritColor={!isLight}
      >
        {icon}
      </AppBarAction>
    </Tooltipped>
  );
};

export default ToggleTheme;
