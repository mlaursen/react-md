"use client";
import { getDerivedTheme, useTheme } from "@react-md/core/theme/ThemeProvider";
import { useHtmlClassName } from "@react-md/core/useHtmlClassName";
import { useEffect } from "react";

import styles from "./SystemTheme.module.scss";

let loadedOnce = false;

export default function SystemTheme(): null {
  useHtmlClassName(styles.container);
  const { setDerivedTheme } = useTheme();
  useEffect(() => {
    if (loadedOnce) {
      return;
    }

    loadedOnce = true;
    setDerivedTheme(getDerivedTheme());
  }, [setDerivedTheme]);
  return null;
}
