import React, { FunctionComponent, Fragment } from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";
import { AppBar, AppBarNav, AppBarTitle } from "@react-md/app-bar";
import { ArrowBackSVGIcon } from "@react-md/material-icons";

const FullPageExample: FunctionComponent = () => {
  const { toggled, toggle, enable, disable } = useToggle();
  return (
    <Fragment>
      <Button id="dialog-toggle-2" onClick={enable}>
        Show Dialog
      </Button>
      <Dialog
        id="dialog-2"
        type="full-page"
        visible={toggled}
        onRequestClose={disable}
        aria-labelledby="dialog-title"
      >
        <AppBar>
          <AppBarNav onClick={disable} aria-label="Close">
            <ArrowBackSVGIcon />
          </AppBarNav>
          <AppBarTitle id="dialog-title">Full Page Dialog</AppBarTitle>
        </AppBar>
        <DialogContent>
          <Text>Hello, world!</Text>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default FullPageExample;
