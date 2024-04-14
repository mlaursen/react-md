"use client";
import { ExpansionPanel } from "@react-md/core/expansion-panel/ExpansionPanel";
import { TextField } from "@react-md/core/form/TextField";
import { useToggle } from "@react-md/core/useToggle";
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
