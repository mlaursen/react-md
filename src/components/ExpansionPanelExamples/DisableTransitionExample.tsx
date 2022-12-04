import {
  ExpansionList,
  ExpansionPanel,
  useExpansionPanels,
} from "@react-md/expansion-panel";
import type { ReactElement } from "react";

export function DisableTransitionExample(): ReactElement {
  const { getPanelProps } = useExpansionPanels({
    multiple: true,
    disableTransition: true,
  });

  return (
    <ExpansionList style={{ width: "100%", maxWidth: "30rem" }}>
      <ExpansionPanel {...getPanelProps(0)} headerChildren="Panel 1">
        Panel 1 Contents
      </ExpansionPanel>
      <ExpansionPanel {...getPanelProps(1)} headerChildren="Panel 2">
        Panel 2 Contents
      </ExpansionPanel>
      <ExpansionPanel {...getPanelProps(2)} headerChildren="Panel 3">
        Panel 3 Contents
      </ExpansionPanel>
    </ExpansionList>
  );
}
