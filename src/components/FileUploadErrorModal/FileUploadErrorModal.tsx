import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import type { FileValidationError } from "@react-md/form";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

import { ErrorRenderer } from "./ErrorRenderer";

export interface FileUploadErrorModalProps {
  errors: readonly FileValidationError<never>[];
  clearErrors(): void;
}

export function FileUploadErrorModal({
  errors,
  clearErrors,
}: FileUploadErrorModalProps): ReactElement {
  // Having the visibility being derived on the `errors.length > 0` would make
  // it so the errors are cleared during the exit animation. To fix this, keep a
  // separate `visible` state and set it to `true` whenever a new error is
  // added. When the modal is closed, set the `visible` state to false and wait
  // until the modal has closed before clearing the errors.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(errors.length > 0);
  }, [errors]);

  const onRequestClose = (): void => {
    setVisible(false);
  };

  return (
    <Dialog
      aria-labelledby="error-modal-title"
      modal
      onRequestClose={onRequestClose}
      visible={visible}
      onExited={clearErrors}
    >
      <DialogHeader>
        <DialogTitle id="error-modal-title">File Upload Errors</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {errors.map((error) => (
          <ErrorRenderer key={error.key} error={error} />
        ))}
      </DialogContent>
      <DialogFooter>
        <Button onClick={onRequestClose}>Okay</Button>
      </DialogFooter>
    </Dialog>
  );
}
