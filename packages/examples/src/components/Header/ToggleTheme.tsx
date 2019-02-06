import React, { FunctionComponent, useState, useEffect } from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";

import "./toggle-theme.scss";

const THEMES = {
  dark: {
    "theme-background": "",
    "theme-surface": "",
    "theme-on-surface": "",
    "theme-text-primary-on-background": "",
    "theme-text-secondary-on-background": "",
    "theme-text-hint-on-background": "",
    "theme-text-disabled-on-background": "",
    "theme-text-icon-on-background": "",
    "divider-background-color": "",
  },
  light: {
    "theme-background": "#fafafa",
    "theme-surface": "#fff",
    "theme-on-surface": "#000",
    "theme-text-primary-on-background":
      "var(--rmd-theme-text-primary-on-light)",
    "theme-text-secondary-on-background":
      "var(--rmd-theme-text-secondary-on-light)",
    "theme-text-hint-on-background": "var(--rmd-theme-text-hint-on-light)",
    "theme-text-disabled-on-background":
      "var(--rmd-theme-text-disabled-on-light)",
    "theme-text-icon-on-background": "var(--rmd-theme-text-icon-on-light)",
    "divider-background-color": "var(--rmd-divider-background-color-on-light)",
  },
};

const ToggleTheme: FunctionComponent = () => {
  const [isLight, setIsDark] = useState(
    () => window.localStorage.getItem("isLight") === "true"
  );

  useEffect(() => {
    const root = document.documentElement;
    const key = isLight ? "light" : "dark";

    Object.entries(THEMES[key]).forEach(([key, value]) => {
      root.style.setProperty(`--rmd-${key}`, value);
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
