import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button, Typography, useToggle } from "@react-md/core";
import { DialogContent, FixedDialog } from "@react-md/dialog";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
import type { ReactElement } from "react";
import { useId, useRef } from "react";

export function FixedDialogExample(): ReactElement {
  const titleId = useId();
  const fixedTo = useRef<HTMLButtonElement>(null);
  const { toggled: visible, toggle, disable: hide } = useToggle(false);

  return (
    <AppBar style={{ marginBottom: "10rem" }}>
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
        aria-labelledby={titleId}
      >
        <AppBar theme="clear">
          <AppBarTitle id={titleId}>Title</AppBarTitle>
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
