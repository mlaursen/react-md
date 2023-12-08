"use client";
import { ExpansionPanel, useToggle } from "@react-md/core";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  const { toggled, toggle } = useToggle(true);

  return (
    <ExpansionPanel
      expanded={toggled}
      onExpandClick={toggle}
      headerChildren="Panel 1"
    >
      Contents
    </ExpansionPanel>
  );
}
