import { useToggle } from "@react-md/core";
import { ExpansionPanel } from "@react-md/expansion-panel";
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
