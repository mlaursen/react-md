import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
  useToggle,
} from "react-md";
import { useId, type ReactElement } from "react";

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
