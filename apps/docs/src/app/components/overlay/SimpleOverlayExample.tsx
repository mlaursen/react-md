"use client";
import { Button, Overlay, useToggle } from "react-md";
import { type ReactElement } from "react";

export default function SimpleOverlayExample(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  return (
    <>
      <Button onClick={enable}>Show Overlay</Button>
      <Overlay visible={toggled} onClick={disable} />
    </>
  );
}
