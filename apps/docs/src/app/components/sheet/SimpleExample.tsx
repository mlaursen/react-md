"use client";
import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Sheet,
  Typography,
  useToggle,
} from "react-md";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  const { toggled, enable, disable } = useToggle();

  return (
    <>
      <Button onClick={enable}>Show</Button>
      <Sheet aria-label="Example" visible={toggled} onRequestClose={disable}>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography>Hello, world!</Typography>
        </DialogContent>
      </Sheet>
    </>
  );
}
