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

export default function SettingInitialFocusExample(): ReactElement {
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
        <DialogContent>
          <Typography margin="bottom">
            This is some text in a dialog.
          </Typography>
        </DialogContent>
        <DialogFooter>
          <Button autoFocus onClick={hideDialog}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
