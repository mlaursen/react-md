import {
  useCSSVariables,
  useWindowSplitter,
  WindowSplitter,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useMemo } from "react";

import styles from "./HowToUseSplitter.module.scss";

export function HowToUseSplitter(): ReactElement {
  const { value, splitterProps } = useWindowSplitter({
    min: 416,
    max: 600,
    defaultValue: 416,
    reversed: true,
    localStorageKey: "howToUseWidth",
  });

  useCSSVariables(
    useMemo(
      () => [{ name: "--how-to-use-width", value: `${value}px` }],
      [value]
    )
  );

  return (
    <WindowSplitter
      aria-label="Resize How to Use"
      aria-controls="how-to-use-sheet"
      {...splitterProps}
      className={styles.splitter}
    />
  );
}
