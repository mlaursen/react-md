import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  SkipToMainContent,
  main,
  useToggle,
} from "@react-md/core";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { useId, type ReactElement } from "react";
import styles from "./CustomFocusTargetExample.module.scss";

export default function CustomFocusTargetExample(): ReactElement {
  const mainId = useId();
  const { toggled, toggle, disable } = useToggle();

  return (
    <>
      <Button onClick={toggle}>Show</Button>
      <Dialog
        aria-label="Example"
        visible={toggled}
        onRequestClose={disable}
        type="full-page"
      >
        <DialogHeader>
          <SkipToMainContent mainId={mainId} className={styles.link} />
          <DialogTitle>Example</DialogTitle>
          <Button aria-label="Close" buttonType="icon" onClick={disable}>
            <CloseIcon />
          </Button>
        </DialogHeader>
        <DialogContent
          id={mainId}
          className={main({ className: styles.content })}
          // the target element **must** be focusable, so set it to `-1` if it
          // isn't to show that it can be programmatically focusable
          tabIndex={-1}
        >
          {"Here's the main content!"}
          <Button>Button!</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
