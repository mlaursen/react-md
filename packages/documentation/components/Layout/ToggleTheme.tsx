import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { UpdateVariables } from "@react-md/theme";
import { Tooltipped } from "@react-md/tooltip";

import LightbulbSVGIcon from "./LightbulbSVGIcon";
import * as storage from "utils/storage";
import "./toggle-theme.scss";

const LIGHT_THEMES = {
  "rmd-theme-background": "#fafafa",
  "rmd-theme-surface": "#fff",
  "rmd-theme-on-surface": "#000",
  "rmd-theme-text-primary-on-background":
    "var(--rmd-theme-text-primary-on-light)",
  "rmd-theme-text-secondary-on-background":
    "var(--rmd-theme-text-secondary-on-light)",
  "rmd-theme-text-hint-on-background": "var(--rmd-theme-text-hint-on-light)",
  "rmd-theme-text-disabled-on-background":
    "var(--rmd-theme-text-disabled-on-light)",
  "rmd-theme-text-icon-on-background": "var(--rmd-theme-text-icon-on-light)",
  "rmd-divider-background-color":
    "var(--rmd-divider-background-color-on-light)",
  "code-bg": "var(--code-bg-light)",
};

const THEME_TRANSITION_DURATION = 150;

function useThemeTransition(isLight: boolean) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const root = document.documentElement as HTMLElement;
    root.classList.add("toggle-theme-transition");

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

function useThemeVariables(isLight: boolean) {
  return useMemo(
    () =>
      Object.entries(LIGHT_THEMES).map(([name, value]) => ({
        name,
        value: isLight ? value : "",
      })),
    [isLight]
  );
}

function useHover() {
  const [hover, setHover] = useState(false);

  return {
    hover,
    enable: () => {
      if (!hover) {
        setHover(true);
      }
    },
    disable: () => {
      if (hover) {
        setHover(false);
      }
    },
  };
}

const ToggleTheme: FunctionComponent = () => {
  const [isLight, setLightTheme] = useState(
    () => storage.getItem("isLight") === "true"
  );

  useThemeTransition(isLight);
  useThemeStorage(isLight);
  const { hover, enable, disable } = useHover();
  const variables = useThemeVariables(isLight);
  let icon: ReactNode = <LightbulbOutlineSVGIcon />;
  if (hover !== isLight) {
    icon = <LightbulbSVGIcon />;
  }

  return (
    <UpdateVariables variables={variables}>
      <Tooltipped
        id="toggle-theme"
        tooltip="Toggle light/dark theme"
        onClick={() => setLightTheme(prevDark => !prevDark)}
        onMouseEnter={enable}
        onMouseLeave={disable}
      >
        {({ tooltip, containerProps }) => (
          <AppBarAction
            {...containerProps}
            first
            className={cn("toggle-theme", {
              "toggle-theme--on": isLight,
              "toggle-theme--off": !isLight,
            })}
          >
            {icon}
            {tooltip}
          </AppBarAction>
        )}
      </Tooltipped>
    </UpdateVariables>
  );
};

export default ToggleTheme;
