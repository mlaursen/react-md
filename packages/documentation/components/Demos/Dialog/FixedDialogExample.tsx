import React, { FC, useRef } from "react";
import {
  AppBar,
  AppBarNav,
  AppBarAction,
  AppBarTitle,
} from "@react-md/app-bar";
import {
  MoreVertSVGIcon,
  MenuSVGIcon,
  CloseSVGIcon,
} from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";
import { FixedDialog, DialogContent } from "@react-md/dialog";

const FixedDialogExample: FC = () => {
  const actionRef = useRef<HTMLButtonElement | null>(null);
  const { toggled: visible, enable: show, disable: hide } = useToggle();
  return (
    <AppBar>
      <AppBarNav aria-label="Nav">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Title</AppBarTitle>
      <AppBarAction
        id="fixed-to-action"
        ref={actionRef}
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
        fixedTo={actionRef.current}
        options={{ xMargin: 12, yMargin: 12 }}
      >
        <AppBar>
          <AppBarTitle id="fixed-dialog-1-title">Title</AppBarTitle>
          <AppBarAction onClick={hide} first last>
            <CloseSVGIcon />
          </AppBarAction>
        </AppBar>
        <DialogContent>
          <Text>Here's some content.</Text>
        </DialogContent>
      </FixedDialog>
    </AppBar>
  );
};

export default FixedDialogExample;
