// TODO: A `Dialog` set the `defaultFocus` but that is no longer supported. Enable the `autoFocus` prop on the target element instead.
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
        disableOverlay
        options={{ xMargin: 12, yMargin: 12 }}
        getFixedPositionOptions={() => ({
          vhMargin: 20,
          vwMargin: 20,
        })}
        overlayProps={{
          style: { color: "red" },
          className: "custom-overlay-class"
        }}
        containerProps={{
          style: { backgroundColor: "orange" },
          className: "custom-container-class"
        }}
        isFocusTypeDisabled={() => true}>
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
