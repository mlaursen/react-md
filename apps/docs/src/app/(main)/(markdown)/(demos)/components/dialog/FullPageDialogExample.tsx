import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { type ReactElement, useId } from "react";

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
