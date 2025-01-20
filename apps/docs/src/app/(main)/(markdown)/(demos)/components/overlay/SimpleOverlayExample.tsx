"use client";

import { Button } from "@react-md/core/button/Button";
import { Overlay } from "@react-md/core/overlay/Overlay";
import { useToggle } from "@react-md/core/useToggle";
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
