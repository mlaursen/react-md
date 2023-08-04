import {
  useCSSVariables,
  useLocalStorageWindowSplitter,
  useWindowSize,
  WindowSplitter,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useMemo } from "react";

import styles from "./HowToUseSplitter.module.scss";

const min = 416;

export function HowToUseSplitter(): ReactElement {
  const { width } = useWindowSize({ disableHeight: true });
  const { value, splitterProps } = useLocalStorageWindowSplitter({
    min,
    max: Math.max(600, width - width * 0.45),
    key: "howToUseWidth",
    defaultValue: min,
    reversed: true,
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
