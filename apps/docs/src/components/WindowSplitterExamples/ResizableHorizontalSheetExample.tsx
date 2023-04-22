import {
  box,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Option,
  Select,
  Sheet,
  useToggle,
  useWindowSize,
  useWindowSplitter,
  WindowSplitter,
} from "@react-md/core";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import type { ReactElement } from "react";
import { useId, useState } from "react";
import { WritingDirectionButtons } from "../Layout/WritingDirectionButtons";

export function ResizableHorizontalSheetExample(): ReactElement {
  const sheetId = useId();
  const { width } = useWindowSize({ disableHeight: true });

  const [position, setPosition] = useState<"left" | "right">("left");
  const { toggled: visible, enable: show, disable: hide } = useToggle();

  const { value, splitterProps } = useWindowSplitter({
    min: 256,
    max: Math.max(400, width - width / 4),
    reversed: position === "right",
    defaultValue: 256,
  });

  return (
    <>
      <Button onClick={show}>Show</Button>
      <Sheet
        aria-label="Resizable Sheet"
        id={sheetId}
        style={{
          "--rmd-sheet-static-width": `${value}px`,
          "--rmd-window-splitter-position": `${value}px`,
        }}
        position={position}
        visible={visible}
        onRequestClose={hide}
      >
        <DialogHeader>
          <DialogTitle>Resizable Sheet</DialogTitle>
          <Button aria-label="Close" buttonType="icon" onClick={hide}>
            <CloseIcon />
          </Button>
        </DialogHeader>
        <DialogContent className={box({ stacked: true, align: "start" })}>
          <Select
            label="Sheet Position"
            value={position}
            onChange={(event) => setPosition(event.currentTarget.value)}
          >
            <Option value="left">left</Option>
            <Option value="right">right</Option>
          </Select>
          <WritingDirectionButtons />
        </DialogContent>
        <WindowSplitter
          {...splitterProps}
          aria-controls={sheetId}
          aria-label="Resize Sheet"
        />
      </Sheet>
    </>
  );
}
