import React, { FunctionComponent, Fragment } from "react";
import { Button } from "@react-md/button";
import { Dialog, DialogContent, DialogFooter } from "@react-md/dialog";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";

const AlertDialogs: FunctionComponent = () => {
  const { toggled: visible, enable, disable } = useToggle();
  const discard = () => {
    disable();
  };
  return (
    <Fragment>
      <Button id="alert-dialog-toggle" onClick={enable}>
        Show Alert
      </Button>
      <Dialog
        id="alert-dialog"
        role="alertdialog"
        visible={visible}
        onRequestClose={disable}
        aria-labelledby="dialog-title"
      >
        <DialogContent>
          <Text id="dialog-title" type="subtitle-1" noMargin color="secondary">
            Discard draft?
          </Text>
        </DialogContent>
        <DialogFooter>
          <Button id="dialog-cancel" onClick={disable}>
            Cancel
          </Button>
          <Button id="dialog-discard" onClick={discard}>
            Discard
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default AlertDialogs;
