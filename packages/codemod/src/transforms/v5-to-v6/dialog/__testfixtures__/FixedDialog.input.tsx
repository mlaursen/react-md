import { ReactElement, useRef } from "react";
import {
  Button,
  FixedDialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
  useToggle,
} from "react-md";

export default function Demo(): ReactElement {
  const [visible, enable, disable] = useToggle(false);
  const fixedTo = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button id="simple-dialog-toggle" onClick={enable} ref={fixedTo}>
        Show Dialog
      </Button>
      <FixedDialog
        id="simple-dialog"
        fixedTo={fixedTo}
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
        overlayStyle={{ color: "red" }}
        overlayClassName="custom-overlay-class"
        containerStyle={{ backgroundColor: "orange" }}
        containerClassName="custom-container-class"
        options={{ xMargin: 12, yMargin: 12 }}
        getOptions={() => ({
          vhMargin: 20,
          vwMargin: 20,
        })}
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
      </FixedDialog>
    </>
  );
}
