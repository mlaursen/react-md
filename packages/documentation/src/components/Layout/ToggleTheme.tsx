import React, {
  FunctionComponent,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import { UpdateVariables, UpdateRMDVariables } from "@react-md/theme";

import "./toggle-theme.scss";
import * as storage from "../../utils/storage";

const LIGHT_THEMES = {
  "theme-background": "#fafafa",
  "theme-surface": "#fff",
  "theme-on-surface": "#000",
  "theme-text-primary-on-background": "var(--rmd-theme-text-primary-on-light)",
  "theme-text-secondary-on-background":
    "var(--rmd-theme-text-secondary-on-light)",
  "theme-text-hint-on-background": "var(--rmd-theme-text-hint-on-light)",
  "theme-text-disabled-on-background":
    "var(--rmd-theme-text-disabled-on-light)",
  "theme-text-icon-on-background": "var(--rmd-theme-text-icon-on-light)",
  "divider-background-color": "var(--rmd-divider-background-color-on-light)",
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
  const variables = useThemeVariables(isLight);
  return (
    <UpdateRMDVariables variables={variables}>
      <Tooltipped
        id="toggle-theme"
        tooltip="Toggle light/dark theme"
        onClick={() => setLightTheme(prevDark => !prevDark)}
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
            <LightbulbOutlineSVGIcon />
            {tooltip}
          </AppBarAction>
        )}
      </Tooltipped>
    </UpdateRMDVariables>
  );
};

export default ToggleTheme;
