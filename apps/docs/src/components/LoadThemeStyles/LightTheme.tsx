"use client";
import { getDerivedTheme, useHtmlClassName, useTheme } from "@react-md/core";
import { useEffect } from "react";

import styles from "./LightTheme.module.scss";

let loadedOnce = false;

export default function LightTheme(): null {
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
