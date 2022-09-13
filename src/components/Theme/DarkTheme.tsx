import { getDerivedTheme, useHtmlClassName, useTheme } from "@react-md/core";
import { useEffect } from "react";

import styles from "./DarkTheme.module.scss";

let loadedOnce = false;

export default function DarkTheme(): null {
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
