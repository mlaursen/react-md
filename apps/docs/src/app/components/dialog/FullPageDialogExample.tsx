import {
  AppBar,
  AppBarTitle,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useToggle,
} from "react-md";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { useId, type ReactElement } from "react";

export default function FullPageDialogExample(): ReactElement {
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
        aria-labelledby={titleId}
        type="full-page"
        visible={visible}
        onRequestClose={hideDialog}
      >
        <AppBar>
          <Button aria-label="Close" onClick={hideDialog} buttonType="icon">
            <CloseIcon />
          </Button>
          <AppBarTitle id={titleId}>Simple Full Page Dialog</AppBarTitle>
        </AppBar>
        <DialogContent>
          <Typography margin="none">This is some text in a dialog.</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
