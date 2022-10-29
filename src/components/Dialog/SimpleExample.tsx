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

export interface SimpleExampleProps {
  depth?: number;
}

export default function SimpleExample({
  depth = 0,
}: SimpleExampleProps): ReactElement {
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
        aria-labelledby={`dialog-title-${depth}`}
      >
        <DialogHeader>
          <DialogTitle id={`dialog-title-${depth}`}>Simple Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography margin="bottom">
            This is some text in a dialog.
          </Typography>
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
