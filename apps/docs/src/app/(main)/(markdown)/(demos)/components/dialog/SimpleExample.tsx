import { Button } from "@react-md/core/button/Button";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { DialogFooter } from "@react-md/core/dialog/DialogFooter";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import { useId, type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  const {
    toggled: visible,
    enable: showDialog,
    disable: hideDialog,
  } = useToggle(false);
  const titleId = useId();

  return (
    <>
      <Button onClick={showDialog}>Show</Button>
      <Dialog
        aria-labelledby={titleId}
        visible={visible}
        onRequestClose={hideDialog}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Simple Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography margin="bottom">
            This is some text in a dialog.
          </Typography>
        </DialogContent>
        <DialogFooter>
          <Button onClick={hideDialog}>Close</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
