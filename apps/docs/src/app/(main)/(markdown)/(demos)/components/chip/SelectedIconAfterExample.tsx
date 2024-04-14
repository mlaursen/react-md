"use client";
import { Chip } from "@react-md/core/chip/Chip";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function SelectedIconAfterExample(): ReactElement {
  const { toggled, toggle } = useToggle();

  return (
    <>
      <Chip selected={toggled} onClick={toggle} selectedIconAfter>
        Chip
      </Chip>
      <Chip
        selected={toggled}
        onClick={toggle}
        selectedIconAfter
        theme="outline"
      >
        Chip
      </Chip>
    </>
  );
}
