import { cnb } from "cnbuilder";
import { Box, NoSsr, useWindowSplitter, WindowSplitter } from "@react-md/core";
import type { ReactElement } from "react";
import { useId } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";
import { Resettable } from "src/components/Resettable";
import { Card, CardContent } from "@react-md/card";

function SimpleExample(): ReactElement {
  const { value, dragging, splitterProps } = useWindowSplitter({
    min: 68,
    defaultValue: Math.min(400, window.innerWidth / 3),
    max: Math.min(800, window.innerWidth - 64),
  });
  const panelId = useId();
  const panelId2 = useId();
  const {
    value: value2,
    dragging: dragging2,
    splitterProps: splitterProps2,
  } = useWindowSplitter({
    min: 52,
    defaultValue: 52,
    max: 800,
    vertical: true,
  });

  return (
    <Box
      grid
      align="start"
      style={{
        "--rmd-window-splitter-position": `${value}px`,
        minHeight: "50vh",
        width: "100%",
        // display: "grid",
        gridTemplateColumns: `var(--rmd-window-splitter-position, 50) 1fr`,
        position: "relative",
      }}
      disablePadding
    >
      <Card id={panelId} fullWidth>
        <CardContent>Main Panel</CardContent>
      </Card>
      <WindowSplitter
        aria-controls={panelId}
        aria-labelledby={panelId}
        {...splitterProps}
        dragging={dragging}
        disableFixed
      />
      <Box
        stacked
        style={{
          "--rmd-window-splitter-position": `${value2}px`,
          position: "relative",
        }}
        disablePadding
      >
        <Card fullWidth style={{ height: value2 }}>
          <CardContent>Other content</CardContent>
        </Card>
        <WindowSplitter
          aria-controls={panelId2}
          aria-label="Boop"
          {...splitterProps2}
          dragging={dragging2}
          disableFixed
        />
        <Card fullWidth>
          <CardContent>Additional content</CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default function UseWindowSplitter(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <NoSsr>
          <SimpleExample />
        </NoSsr>
      </Box>
    </Resettable>
  );
}
