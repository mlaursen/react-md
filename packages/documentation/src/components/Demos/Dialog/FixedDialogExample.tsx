import { ReactElement, useRef } from "react";
import {
  AppBar,
  AppBarAction,
  AppBarNav,
  AppBarTitle,
} from "@react-md/app-bar";
import { DialogContent, FixedDialog } from "@react-md/dialog";
import {
  CloseSVGIcon,
  MenuSVGIcon,
  MoreVertSVGIcon,
} from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { useToggle } from "@react-md/utils";

export default function FixedDialogExample(): ReactElement {
  const fixedTo = useRef<HTMLButtonElement>(null);
  const [visible, show, hide] = useToggle(false);
  return (
    <AppBar>
      <AppBarNav aria-label="Nav">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Title</AppBarTitle>
      <AppBarAction
        id="fixed-to-action"
        ref={fixedTo}
        onClick={show}
        first
        last
      >
        <MoreVertSVGIcon />
      </AppBarAction>
      <FixedDialog
        id="fixed-dialog-1"
        visible={visible}
        aria-labelledby="fixed-dialog-1-title"
        onRequestClose={hide}
        fixedTo={fixedTo}
        options={{ xMargin: 12, yMargin: 12 }}
      >
        <AppBar>
          <AppBarTitle id="fixed-dialog-1-title">Title</AppBarTitle>
          <AppBarAction onClick={hide} first last>
            <CloseSVGIcon />
          </AppBarAction>
        </AppBar>
        <DialogContent>
          <Typography>Here&apos;s some content.</Typography>
        </DialogContent>
      </FixedDialog>
    </AppBar>
  );
}
