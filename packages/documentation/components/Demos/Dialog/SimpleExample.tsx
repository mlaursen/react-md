import React, { FC, Fragment } from "react";
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

const SimpleExample: FC = () => {
  const { toggled: visible, enable, disable } = useToggle();
  return (
    <Fragment>
      <Button id="simple-dialog-toggle" onClick={enable}>
        Show Dialog
      </Button>
      <Dialog
        id="simple-dialog"
        visible={visible}
        onRequestClose={disable}
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Simple Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Text margin="none">This is some text in a dialog.</Text>
        </DialogContent>
        <DialogFooter>
          <Button id="dialog-close" onClick={disable}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default SimpleExample;
