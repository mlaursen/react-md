import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";

import "./toggle-theme.scss";

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

const ToggleTheme: FunctionComponent = () => {
  const [isLight, setIsDark] = useState(
    () => window.localStorage.getItem("isLight") === "true"
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const root = document.documentElement;
    root.classList.add("toggle-theme-transition");

    const timeout = window.setTimeout(() => {
      root.classList.remove("toggle-theme-transition");
    }, 150);
    return () => {
      window.clearTimeout(timeout);
      root.classList.remove("toggle-theme-transition");
    };
  }, [isLight]);

  useEffect(() => {
    const root = document.documentElement;
    const key = isLight ? "light" : "dark";

    Object.entries(LIGHT_THEMES).forEach(([key, value]) => {
      // my app is pre-built for dark theme, so just reset all values when
      // dark
      root.style.setProperty(`--rmd-${key}`, isLight ? value : "");
    });

    window.localStorage.setItem("isLight", isLight.toString());
  }, [isLight]);

  return (
    <Tooltipped
      id="toggle-theme"
      tooltip="Toggle light/dark theme"
      onClick={() => setIsDark(prevDark => !prevDark)}
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
  );
};

export default ToggleTheme;
