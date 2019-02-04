import React, { FunctionComponent, useState, useEffect } from "react";
import { AvatarScssVariables } from "@react-md/avatar";
import { Button, ButtonScssVariables } from "@react-md/button";
import { LightbulbOutlineSVGIcon } from "@react-md/material-icons";
import { DividerScssVariables } from "@react-md/divider";
import { IconScssVariables } from "@react-md/icon";
import { ThemeScssVariables } from "@react-md/theme";

import styles from "./styles.module.scss";
import { upperFirst } from "lodash";

const THEMES = [
  AvatarScssVariables["rmd-avatar-theme-values"],
  ButtonScssVariables["rmd-button-theme-values"],
  DividerScssVariables["rmd-divider-theme-values"],
  IconScssVariables["rmd-icon-theme-values"],
  ThemeScssVariables["rmd-theme-values"],
];

const themes = {
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

    Object.entries(themes[key]).forEach(([key, value]) => {
      root.style.setProperty(`--rmd-${key}`, value);
    });
    window.localStorage.setItem("isLight", isLight.toString());
  }, [isLight]);

  return (
    <Button
      id="toggle-theme"
      onClick={() => setIsDark(prevDark => !prevDark)}
      theme="primary"
      themeType="contained"
      buttonType="icon"
      className={styles.root}
    >
      <LightbulbOutlineSVGIcon />
    </Button>
  );
};

export default ToggleTheme;
