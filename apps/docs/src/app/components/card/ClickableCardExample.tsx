"use client";
import {
  CardContent,
  ClickableCard,
  Dialog,
  DialogHeader,
  DialogTitle,
  useToggle,
} from "@react-md/core";
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
