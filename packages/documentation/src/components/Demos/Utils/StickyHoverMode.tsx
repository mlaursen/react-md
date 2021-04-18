import React, { ReactElement, useRef } from "react";
import { Button } from "@react-md/button";
import { DialogContent, FixedDialog } from "@react-md/dialog";
import { BELOW_CENTER_ANCHOR, useHoverMode } from "@react-md/utils";

export default function StickyHoverMode(): ReactElement {
  const {
    stuck,
    active,
    handlers,
    stickyHandlers,
    visible,
    setVisible,
  } = useHoverMode({
    sticky: true,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button {...stickyHandlers} ref={buttonRef}>
        Button
      </Button>
      <FixedDialog
        aria-label="Additional Information"
        id="some-dialog-id"
        visible={visible}
        onRequestClose={() => setVisible(false)}
        {...handlers}
        anchor={BELOW_CENTER_ANCHOR}
        fixedTo={buttonRef}
        options={{ preventOverlap: true }}
        overlay={!stuck && active ? false : undefined}
        disableScrollLock={!active}
      >
        <DialogContent>Some amazing content!</DialogContent>
      </FixedDialog>
    </>
  );
}
