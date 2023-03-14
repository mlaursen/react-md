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

export function ResizableVerticalSheetExample(): ReactElement {
  const sheetId = useId();
  const { height } = useWindowSize({ disableWidth: true });

  const [position, setPosition] = useState<"top" | "bottom">("top");
  const { toggled: visible, enable: show, disable: hide } = useToggle();

  const { value, splitterProps } = useWindowSplitter({
    min: 256,
    max: Math.max(400, height - height / 4),
    reversed: position === "bottom",
    vertical: true,
    defaultValue: 256,
  });

  return (
    <>
      <Button onClick={show}>Show</Button>
      <Sheet
        aria-label="Resizable Sheet"
        id={sheetId}
        style={{
          "--rmd-sheet-height": `${value}px`,
          "--rmd-window-splitter-position": `${value}px`,
        }}
        position={position}
        verticalSize="touch"
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
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
          </Select>
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
