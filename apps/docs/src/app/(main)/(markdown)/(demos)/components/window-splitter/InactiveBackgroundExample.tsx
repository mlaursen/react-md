"use client";

import { useSsr } from "@react-md/core/SsrProvider";
import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { useElementSize } from "@react-md/core/useElementSize";
import { WindowSplitter } from "@react-md/core/window-splitter/WindowSplitter";
import { useWindowSplitter } from "@react-md/core/window-splitter/useWindowSplitter";
import { type ReactElement, useId } from "react";

import styles from "./InactiveBackgroundExample.module.scss";

const MIN_MAIN_PANEL_WIDTH = 140;
const MIN_SECOND_PANEL_WIDTH = 240;

export default function InactiveBackgroundExample(): ReactElement {
  const panelId = useId();
  const ssr = useSsr();
  const { width, elementRef } = useElementSize({
    disableHeight: true,
    defaultValue: () => {
      let width = 1080;
      if (!ssr) {
        width = window.innerWidth;
      }

      return { height: 80, width };
    },
  });
  const max = width - MIN_SECOND_PANEL_WIDTH;
  const { value, splitterProps } = useWindowSplitter({
    min: MIN_MAIN_PANEL_WIDTH,
    max,
  });

  return (
    <Box
      align="stretch"
      grid
      fullWidth
      ref={elementRef}
      style={{
        "--rmd-window-splitter-position": `${value}px`,
      }}
      className={styles.container}
      disableWrap
      disablePadding
    >
      <Card id={panelId} fullWidth>
        <CardContent>Main Panel</CardContent>
      </Card>
      <WindowSplitter
        {...splitterProps}
        aria-controls={panelId}
        aria-labelledby={panelId}
        disableFixed
        inactiveBackground
      />
      <Card className={styles.second} fullWidth>
        <CardContent>Second Panel</CardContent>
      </Card>
    </Box>
  );
}
