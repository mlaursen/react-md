"use client";
import { Button } from "@react-md/core/button/Button";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { useToggle } from "@react-md/core/useToggle";
import { useWindowSize } from "@react-md/core/useWindowSize";
import { useWindowSplitter } from "@react-md/core/window-splitter/useWindowSplitter";
import { WindowSplitter } from "@react-md/core/window-splitter/WindowSplitter";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { useId, type ReactElement } from "react";

export default function ReversedVerticalResizableSheetExample(): ReactElement {
  const sheetId = useId();
  const titleId = useId();

  const { enable: show, disable: hide, toggled: visible } = useToggle();

  const { height } = useWindowSize({ disableWidth: true });
  const { value, splitterProps } = useWindowSplitter({
    min: 256,
    // allow up to 3/4 of the window size
    max: Math.max(400, height - height / 4),

    // this normally defaults to `Math.ceil((max - min) / 2)`
    defaultValue: 256,
    vertical: true,
    reversed: true,
  });

  return (
    <>
      <Button onClick={show}>Show</Button>
      <Sheet
        aria-labelledby={titleId}
        id={sheetId}
        visible={visible}
        onRequestClose={hide}
        style={{
          "--rmd-sheet-height": `${value}px`,
          "--rmd-window-splitter-position": `${value}px`,
        }}
        position="bottom"
        verticalSize="touch"
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Resizable Sheet</DialogTitle>
          <Button aria-label="Close" onClick={hide} buttonType="icon">
            <CloseIcon />
          </Button>
        </DialogHeader>
        <WindowSplitter
          {...splitterProps}
          aria-controls={sheetId}
          aria-label="Resize Sheet"
        />
      </Sheet>
    </>
  );
}
