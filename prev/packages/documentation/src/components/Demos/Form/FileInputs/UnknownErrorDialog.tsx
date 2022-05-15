import type { ReactElement } from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";

const noop = (): void => {
  // do nothing
};

export interface UnknownErrorDialogProps {
  visible: boolean;
  reset(): void;
}

export default function UnknownErrorDialog({
  visible,
  reset,
}: UnknownErrorDialogProps): ReactElement {
  return (
    <Dialog
      id="unknown-error-dialog"
      aria-labelledby="unknown-error-dialog-title"
      modal
      visible={visible}
      onRequestClose={noop}
    >
      <DialogHeader>
        <DialogTitle id="unknown-error-dialog-title">Upload Error</DialogTitle>
      </DialogHeader>
      <DialogContent>
        An unknown upload error has occurred. Reset the demo and try again.
      </DialogContent>
      <DialogFooter>
        <Button onClick={reset}>Reset</Button>
      </DialogFooter>
    </Dialog>
  );
}
