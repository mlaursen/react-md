import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { useToggle } from "@react-md/utils";

import LightbulbSVGIcon from "icons/LightbulbSVGIcon";
import * as storage from "utils/storage";

import "./toggle-theme.scss";
import { useStatesConfigContext } from "@react-md/states";

const THEME_TRANSITION_DURATION = 150;

function useThemeTransition(isLight: boolean) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    const root = document.documentElement as HTMLElement;
    if (isFirstRender.current) {
      isFirstRender.current = false;

      if (isLight) {
        root.classList.add("light-theme");
      }
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

function useThemeStorage(isLight: boolean) {
  useEffect(() => {
    storage.setItem("isLight", isLight.toString());
  }, [isLight]);
}

const ToggleTheme: FunctionComponent = () => {
  const [isLight, setLightTheme] = useState(
    () => storage.getItem("isLight") === "true"
  );

  useThemeTransition(isLight);
  useThemeStorage(isLight);
  const { toggled, enable, disable } = useToggle();
  let icon: ReactNode = <LightbulbOutlineSVGIcon />;
  if (toggled !== isLight) {
    icon = <LightbulbSVGIcon />;
  }

  const isMouseMode = useStatesConfigContext().mode === "mouse";

  return (
    <AppBarAction
      id="toggle-theme"
      first
      onClick={() => setLightTheme(prevDark => !prevDark)}
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
  );
};

export default ToggleTheme;
