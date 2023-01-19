import { Button, Typography, useToggle } from "@react-md/core";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import type { ReactElement } from "react";
import { useId } from "react";

export function PersistentDialog(): ReactElement {
  const titleId = useId();
  const {
    toggled: visible,
    enable: showDialog,
    disable: hideDialog,
  } = useToggle(false);
  return (
    <>
      <Button onClick={showDialog}>Show</Button>
      <Dialog
        visible={visible}
        onRequestClose={hideDialog}
        aria-labelledby={titleId}
        temporary={false}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Simple Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography margin="bottom">
            This is some text in a dialog.
          </Typography>
        </DialogContent>
        <DialogFooter>
          <Button onClick={hideDialog}>Close</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
