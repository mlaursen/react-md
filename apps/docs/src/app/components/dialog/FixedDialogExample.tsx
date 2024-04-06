"use client";
import {
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FixedDialog,
  Typography,
  useToggle,
} from "react-md";
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
