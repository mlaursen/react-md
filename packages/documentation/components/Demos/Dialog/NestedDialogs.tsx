import React, { FunctionComponent } from "react";
import { AppBar, AppBarNav, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  NestedDialogContextProvider,
} from "@react-md/dialog";
import { KeyboardArrowLeftSVGIcon } from "@react-md/material-icons";
import { useToggle } from "@react-md/utils";

import "./nested-dialogs.scss";
import LoremIpsum from "./LoremIpsum";
import NestedDemo from "./NestedDemo";

const NestedDialogs: FunctionComponent = () => {
  const { toggled: visible, enable, disable } = useToggle();
  const dialogId = "nested-demo-dialog-full-page";
  return (
    <NestedDialogContextProvider>
      <Button id="nested-demo-button-first" onClick={enable}>
        Show Main Dialog
      </Button>
      <Dialog
        id={dialogId}
        visible={visible}
        onRequestClose={disable}
        aria-labelledby={`${dialogId}-title`}
        type="full-page"
      >
        <AppBar theme="default">
          <AppBarNav aria-label="Close" onClick={disable}>
            <KeyboardArrowLeftSVGIcon />
          </AppBarNav>
          <AppBarTitle>Main Full Page Dialog</AppBarTitle>
        </AppBar>
        <DialogContent className="nested-dialogs-content">
          <NestedDemo depth={0} />
          <LoremIpsum />
        </DialogContent>
      </Dialog>
    </NestedDialogContextProvider>
  );
};

export default NestedDialogs;
