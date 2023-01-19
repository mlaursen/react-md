import { ExpansionPanel, useToggle } from "@react-md/core";
import type { ReactElement } from "react";

export function SinglePanelExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  return (
    <ExpansionPanel
      disabled
      expanded={toggled}
      onExpandClick={toggle}
      headerChildren="Only One Panel"
    >
      Some content.
    </ExpansionPanel>
  );
}
