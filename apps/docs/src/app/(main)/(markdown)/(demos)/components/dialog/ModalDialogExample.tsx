import { Button } from "@react-md/core/button/Button";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { DialogFooter } from "@react-md/core/dialog/DialogFooter";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement, useId } from "react";

export default function ModalDialogExample(): ReactElement {
  const {
    toggled: visible,
    enable: showDialog,
    disable: hideDialog,
  } = useToggle(false);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <>
      <Button onClick={showDialog}>Show</Button>
      <Dialog
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        role="alertdialog"
        modal
        visible={visible}
        onRequestClose={hideDialog}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>
            Your session is about to expire
          </DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography id={descriptionId} margin="none">
            To extend your session, click the OK button
          </Typography>
        </DialogContent>
        <DialogFooter>
          <Button onClick={hideDialog}>OK</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
