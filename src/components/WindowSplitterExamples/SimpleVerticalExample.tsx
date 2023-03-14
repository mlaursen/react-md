import {
  Box,
  Card,
  CardContent,
  Typography,
  useWindowSplitter,
  WindowSplitter,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useId } from "react";
import { InlineCode } from "../Code";

export function SimpleVerticalExample(): ReactElement {
  const panelId = useId();
  const { value, splitterProps } = useWindowSplitter({
    min: 52,
    max: 800,
    vertical: true,
    defaultValue: 52,
  });

  return (
    <>
      <Typography>
        The drag handle will become visible by hovering the bottom edge of the{" "}
        <InlineCode>Main Panel</InlineCode> or focusing by tabbing or other
        means. Once focused, you can use the{" "}
        <InlineCode kbd>ArrowUp</InlineCode>,{" "}
        <InlineCode kbd>ArrowDown</InlineCode>,{" "}
        <InlineCode kbd>Home</InlineCode>, and <InlineCode kbd>End</InlineCode>{" "}
        keys to move the window splitter.
      </Typography>
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
    </>
  );
}
