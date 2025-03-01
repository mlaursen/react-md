import { ReactElement } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
  useToggle,
} from "react-md";

export default function Demo(): ReactElement {
  const [visible, enable, disable] = useToggle(false);
  return (
    <>
      <Button id="simple-dialog-toggle" onClick={enable}>
        Show Dialog
      </Button>
      <Dialog
        id="simple-dialog"
        visible={visible}
        onRequestClose={disable}
        aria-labelledby="dialog-title"
        forceContainer
        defaultFocus="last"
        disableFocusContainer
        disableFocusCache
        disableFocusOnMount
        disableTabFocusWrap
        disableFocusOnMountScroll
        disableFocusOnUnmount
        unmountFocusFallback
        disableNestedDialogFixes
        component="nav"
        overlay={false}
        overlayHidden
        overlayStyle={{ color: "red" }}
        overlayClassName="custom-overlay-class"
        containerStyle={{ backgroundColor: "orange" }}
        containerClassName="custom-container-class"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Simple Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography margin="none">This is some text in a dialog.</Typography>
        </DialogContent>
        <DialogFooter>
          <Button id="dialog-close" onClick={disable}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
