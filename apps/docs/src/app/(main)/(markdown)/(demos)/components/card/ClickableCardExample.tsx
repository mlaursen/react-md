"use client";
import { CardContent } from "@react-md/core/card/CardContent";
import { ClickableCard } from "@react-md/core/card/ClickableCard";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function ClickableCardExample(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  return (
    <>
      <ClickableCard onClick={enable}>
        <CardContent>Wow</CardContent>
      </ClickableCard>
      <Dialog
        visible={toggled}
        onRequestClose={disable}
        aria-label="Bigger Wow"
      >
        <DialogHeader>
          <DialogTitle>WOW!</DialogTitle>
        </DialogHeader>
      </Dialog>
    </>
  );
}
