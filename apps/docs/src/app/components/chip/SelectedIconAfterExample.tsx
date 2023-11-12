"use client";
import { Chip, useToggle } from "@react-md/core";
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
