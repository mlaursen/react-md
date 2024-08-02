"use client";
import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { useWindowSplitter } from "@react-md/core/window-splitter/useWindowSplitter";
import { WindowSplitter } from "@react-md/core/window-splitter/WindowSplitter";
import { useId, type ReactElement } from "react";

export default function RelativeVerticalExample(): ReactElement {
  const panelId = useId();
  const { value, splitterProps } = useWindowSplitter({
    min: 52,
    max: 800,
    vertical: true,
    defaultValue: 52,
  });

  return (
    <Box
      stacked
      style={{
        "--rmd-window-splitter-position": `${value}px`,
        position: "relative",
      }}
      fullWidth
      disablePadding
    >
      <Card id={panelId} fullWidth style={{ height: value }}>
        <CardContent>Main Panel</CardContent>
      </Card>
      <WindowSplitter
        aria-controls={panelId}
        aria-labelledby={panelId}
        {...splitterProps}
        disableFixed
      />
      <Card fullWidth>
        <CardContent>Secondary Panel</CardContent>
      </Card>
    </Box>
  );
}
