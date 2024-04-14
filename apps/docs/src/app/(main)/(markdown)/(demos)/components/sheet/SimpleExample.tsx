"use client";
import { Button } from "@react-md/core/button/Button";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  const { toggled, enable, disable } = useToggle();

  return (
    <>
      <Button onClick={enable}>Show</Button>
      <Sheet aria-label="Example" visible={toggled} onRequestClose={disable}>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography>Hello, world!</Typography>
        </DialogContent>
      </Sheet>
    </>
  );
}
