import {
  useCSSVariables,
  useWindowSplitter,
  WindowSplitter,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useMemo } from "react";

import styles from "./ContainerSplitter.module.scss";

export function ContainerSplitter(): ReactElement {
  const { value, dragging, splitterProps } = useWindowSplitter({
    min: 96,
    max: 600,
    defaultValue: 256,
  });

  useCSSVariables(
    useMemo(
      () => [
        {
          name: "--dnd-panel-width",
          value: `${value}px`,
        },
      ],
      [value]
    )
  );

  return (
    <WindowSplitter
      aria-label="Resize Navigation"
      aria-controls="layout-nav-container"
      {...splitterProps}
      dragging={dragging}
      className={styles.splitter}
      disableFixed
    />
  );
}
