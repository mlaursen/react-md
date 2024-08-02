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

export default function HorizontalResizableSheetExample(): ReactElement {
  const sheetId = useId();
  const titleId = useId();

  const { enable: show, disable: hide, toggled: visible } = useToggle();

  const { width } = useWindowSize({ disableHeight: true });
  const { value, splitterProps } = useWindowSplitter({
    min: 256,
    max: Math.max(400, width - width / 4),
    defaultValue: 256,
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
          "--rmd-sheet-static-width": `${value}px`,
          "--rmd-window-splitter-position": `${value}px`,
        }}
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
