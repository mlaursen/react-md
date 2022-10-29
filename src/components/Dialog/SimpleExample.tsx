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

export default function SimpleExample({
  depth = 0,
}: {
  depth?: number;
}): ReactElement {
  const {
    toggled: visible,
    enable: showDialog,
    disable: hideDialog,
  } = useToggle(false);
  return (
    <>
      <Button id="simple-dialog-toggle" onClick={showDialog}>
        Show
      </Button>
      <Dialog
        id={`simple-dialog-${depth}`}
        visible={visible}
        onRequestClose={hideDialog}
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Simple Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography margin="none">This is some text in a dialog.</Typography>
          <SimpleExample depth={depth + 1} />
        </DialogContent>
        <DialogFooter>
          <Button id="dialog-close" onClick={hideDialog}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
