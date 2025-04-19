"use client";

import { Button } from "@react-md/core/button/Button";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { useToggle } from "@react-md/core/useToggle";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { type ReactElement, type ReactNode, useEffect } from "react";

export interface DevRegenDialogProps {
  children: ReactNode;
}

export function DevRegenDialog({
  children,
}: DevRegenDialogProps): ReactElement {
  const { toggled, enable, disable } = useToggle();
  useEffect(() => {
    enable();
  }, [enable]);

  return (
    <Dialog
      visible={toggled}
      onRequestClose={disable}
      aria-label="Regenerate SassDoc"
      type="custom"
      disableOverlay
      disableTransition
      disableScrollLock
      isFocusTypeDisabled={() => true}
      style={{ position: "relative" }}
      containerProps={{
        style: {
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translate3d(-50%, 0, 0)",
          zIndex: 300,
        },
      }}
    >
      <Button
        onClick={disable}
        buttonType="icon"
        style={{ position: "absolute", right: 0 }}
      >
        <CloseIcon />
      </Button>
      {children}
    </Dialog>
  );
}
