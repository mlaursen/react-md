// TODO: A `Dialog` set the `defaultFocus` but that is no longer supported. Enable the `autoFocus` prop on the target element instead.
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
  return (<>
    <Button id="simple-dialog-toggle" onClick={enable}>
      Show Dialog
    </Button>
    <Dialog
      id="simple-dialog"
      visible={visible}
      onRequestClose={disable}
      aria-labelledby="dialog-title"
      disableOverlay
      overlayProps={{
        noOpacity: true,
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
    </Dialog>
  </>);
}
