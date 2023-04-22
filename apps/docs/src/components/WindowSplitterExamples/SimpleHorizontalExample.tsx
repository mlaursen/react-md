import {
  Box,
  Card,
  CardContent,
  NoSsr,
  Typography,
  useResizeObserver,
  useWindowSplitter,
  WindowSplitter,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useCallback, useId, useState } from "react";
import { InlineCode } from "../Code";

const MIN_MAIN_PANEL_WIDTH = 120;
const MIN_SECOND_PANEL_WIDTH = 240;

function Example(): ReactElement {
  const panelId = useId();
  const [max, setMax] = useState(window.innerWidth - MIN_SECOND_PANEL_WIDTH);
  const targetRef = useResizeObserver({
    disableHeight: true,
    onUpdate: useCallback((entry) => {
      setMax(entry.borderBoxSize[0].inlineSize - MIN_SECOND_PANEL_WIDTH);
    }, []),
  });
  const { value, splitterProps } = useWindowSplitter({
    min: MIN_MAIN_PANEL_WIDTH,
    max,

    // This is the amount to change the value when the `ArrowLeft`/`ArrowRight`
    // keys are pressed. You'll probably want to update this since it defaults
    // to `1px`.
    // step: 1,

    // The default value will be 50% based on the min anx max
    // defaultValue: Math.ceil((max - MIN_MAIN_PANEL_WIDTH) / 2),
  });

  return (
    <div>
      <Typography>
        The drag handle will become visible by hovering the right edge of the{" "}
        <InlineCode>Main Panel</InlineCode> or focusing by tabbing or other
        means. Once focused, you can use the{" "}
        <InlineCode kbd>ArrowRight</InlineCode>,{" "}
        <InlineCode kbd>ArrowLeft</InlineCode>,{" "}
        <InlineCode kbd>Home</InlineCode>, and <InlineCode kbd>End</InlineCode>{" "}
        keys to move the window splitter.
      </Typography>
      <Box
        align="stretch"
        grid
        fullWidth
        ref={targetRef}
        style={{
          "--rmd-window-splitter-position": `${value}px`,
          position: "relative",
          gridTemplateColumns: "var(--rmd-window-splitter-position, 33%) 1fr",
        }}
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
        />
        <Card fullWidth>
          <CardContent>Second Panel</CardContent>
        </Card>
      </Box>
    </div>
  );
}

export function SimpleHorizontalExample(): ReactElement {
  // wrap in `NoSsr` since I want the size to be determined based on the window
  return (
    <NoSsr>
      <Example />
    </NoSsr>
  );
}
