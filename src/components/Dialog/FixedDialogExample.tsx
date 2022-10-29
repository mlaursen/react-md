import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { Typography, useToggle } from "@react-md/core";
import { DialogContent, FixedDialog } from "@react-md/dialog";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import type { ReactElement } from "react";
import { useRef } from "react";

export default function FixedDialogExample(): ReactElement {
  const fixedTo = useRef<HTMLButtonElement>(null);
  const { toggled: visible, toggle, disable: hide } = useToggle(false);

  return (
    <AppBar>
      <Button aria-label="Nav" buttonType="icon">
        <MenuIcon />
      </Button>
      <AppBarTitle>Title</AppBarTitle>
      <Button
        aria-label="Options"
        buttonType="icon"
        ref={fixedTo}
        onClick={toggle}
      >
        <MoreVertIcon />
      </Button>
      <FixedDialog
        fixedTo={fixedTo}
        visible={visible}
        onRequestClose={hide}
        aria-label="Boop"
        options={{ xMargin: 12, yMargin: 12 }}
        aria-labelledby="dialog-title"
      >
        <AppBar theme="clear">
          <AppBarTitle id="dialog-title">Title</AppBarTitle>
          <Button onClick={hide} buttonType="icon" aria-label="Close">
            <CloseIcon />
          </Button>
        </AppBar>
        <DialogContent>
          <Typography>Here&apos;s some content.</Typography>
        </DialogContent>
      </FixedDialog>
    </AppBar>
  );
}
