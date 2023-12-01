import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
  useToggle,
} from "@react-md/core";
import { useId, type ReactElement } from "react";
import styles from "./CustomTransitionExample.module.scss";

export default function CustomTransitionExample(): ReactElement {
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
        className={styles.dialog}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
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