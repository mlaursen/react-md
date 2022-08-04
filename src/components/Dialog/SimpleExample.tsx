import { Button } from "@react-md/button";
import { Typography, useToggle } from "@react-md/core";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import type { ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  const { toggled: visible, enable, disable } = useToggle(false);
  return (
    <>
      <Button id="simple-dialog-toggle" onClick={enable}>
        Show
      </Button>
      <Dialog
        id="simple-dialog"
        visible={visible}
        onRequestClose={disable}
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Simple Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography margin="none">This is some text in a dialog.</Typography>
        </DialogContent>
        <DialogFooter>
          <Button id="dialog-close" onClick={disable}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
