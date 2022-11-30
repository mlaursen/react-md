import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { Typography, useToggle } from "@react-md/core";
import { Dialog, DialogContent } from "@react-md/dialog";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import type { ReactElement } from "react";
import { useId } from "react";

export function FullPageExample(): ReactElement {
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
        type="full-page"
        visible={visible}
        onRequestClose={hideDialog}
        aria-labelledby={titleId}
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