"use client";
import { Chip, useToggle } from "react-md";
import { type ReactElement } from "react";

export default function ThemedSelectedStateExample(): ReactElement {
  const { toggled, toggle } = useToggle();

  return (
    <>
      <Chip selected={toggled} selectedThemed onClick={toggle}>
        Chip
      </Chip>
      <Chip selected={toggled} selectedThemed onClick={toggle} theme="outline">
        Chip
      </Chip>
    </>
  );
}
