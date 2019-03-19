import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { UpdateVariables } from "@react-md/theme";
import { useVisibility } from "@react-md/utils";

import AppBarAction from "components/AppBarAction";
import LightbulbSVGIcon from "icons/LightbulbSVGIcon";
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
  "rmd-states-background-color": "var(--rmd-states-light-background-color)",
  "rmd-states-ripple-background-color":
    "var(--rmd-states-light-ripple-background-color)",
  "rmd-divider-background-color":
    "var(--rmd-divider-background-color-on-light)",
  "code-bg": "var(--code-bg-light)",
  "strong-color": "var(--strong-color)",
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

const ToggleTheme: FunctionComponent = () => {
  const [isLight, setLightTheme] = useState(
    () => storage.getItem("isLight") === "true"
  );

  useThemeTransition(isLight);
  useThemeStorage(isLight);
  const { visible, show, hide } = useVisibility();
  const variables = useThemeVariables(isLight);
  let icon: ReactNode = <LightbulbOutlineSVGIcon />;
  if (visible !== isLight) {
    icon = <LightbulbSVGIcon />;
  }

  return (
    <UpdateVariables variables={variables}>
      <AppBarAction
        id="toggle-theme"
        first
        tooltip="Toggle light/dark theme"
        onClick={() => setLightTheme(prevDark => !prevDark)}
        onMouseEnter={show}
        onMouseLeave={hide}
        className={cn("toggle-theme", {
          "toggle-theme--on": isLight,
          "toggle-theme--off": !isLight,
        })}
      >
        {icon}
      </AppBarAction>
    </UpdateVariables>
  );
};

export default ToggleTheme;
