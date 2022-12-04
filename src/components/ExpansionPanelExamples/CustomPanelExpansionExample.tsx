import {
  ExpansionList,
  ExpansionPanel,
  useExpansionPanels,
} from "@react-md/expansion-panel";
import type { ReactElement } from "react";

const panel1Id = "custom-panel-1";
const panel2Id = "custom-panel-2";
const panel3Id = "custom-panel-3";

export function CustomPanelExpansionExample(): ReactElement {
  const {
    getPanelProps,
    // if you need these for some reason
    // expandedIds,
    // setExpandedIds,
  } = useExpansionPanels({
    multiple: true,
    defaultExpandedIds: () => [panel1Id, panel2Id, panel3Id],
  });

  return (
    <ExpansionList style={{ width: "100%", maxWidth: "30rem" }}>
      <ExpansionPanel {...getPanelProps(panel1Id)} headerChildren="Panel 1">
        Panel 1 Contents
      </ExpansionPanel>
      <ExpansionPanel {...getPanelProps(panel2Id)} headerChildren="Panel 2">
        Panel 2 Contents
      </ExpansionPanel>
      <ExpansionPanel {...getPanelProps(panel3Id)} headerChildren="Panel 3">
        Panel 3 Contents
      </ExpansionPanel>
    </ExpansionList>
  );
}
