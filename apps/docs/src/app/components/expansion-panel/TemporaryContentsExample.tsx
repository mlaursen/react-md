"use client";
import { ExpansionPanel, TextField, useToggle } from "react-md";
import { type ReactElement } from "react";

export default function TemporaryContentsExample(): ReactElement {
  const { toggled, toggle } = useToggle(true);

  return (
    <ExpansionPanel
      expanded={toggled}
      onExpandClick={toggle}
      headerChildren="Panel"
      temporary
    >
      <PanelContents />
    </ExpansionPanel>
  );
}

function PanelContents(): ReactElement {
  return <TextField label="Label" />;
}
