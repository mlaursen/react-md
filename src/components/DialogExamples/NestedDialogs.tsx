import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
  useToggle,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useId } from "react";

export function NestedDialogs(): ReactElement {
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
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Simple Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent style={{ textAlign: "center" }}>
          <Typography margin="bottom">
            This is some text in a dialog.
          </Typography>
          <NestedDialogs />
        </DialogContent>
        <DialogFooter>
          <Button onClick={hideDialog}>Close</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
