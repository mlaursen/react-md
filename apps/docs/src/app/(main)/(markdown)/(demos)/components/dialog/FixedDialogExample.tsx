"use client";
import { Button } from "@react-md/core/button/Button";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { DialogFooter } from "@react-md/core/dialog/DialogFooter";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { FixedDialog } from "@react-md/core/dialog/FixedDialog";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import { useId, useRef, type ReactElement } from "react";

export default function FixedDialogExample(): ReactElement {
  const {
    toggled: visible,
    enable: showDialog,
    disable: hideDialog,
  } = useToggle(false);
  const fixedTo = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  return (
    <>
      <Button ref={fixedTo} onClick={showDialog}>
        Show
      </Button>
      <FixedDialog
        aria-labelledby={titleId}
        fixedTo={fixedTo}
        visible={visible}
        onRequestClose={hideDialog}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Hello, world!</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography margin="none">Additional content</Typography>
        </DialogContent>
        <DialogFooter>
          <Button onClick={hideDialog}>OK</Button>
        </DialogFooter>
      </FixedDialog>
    </>
  );
}
