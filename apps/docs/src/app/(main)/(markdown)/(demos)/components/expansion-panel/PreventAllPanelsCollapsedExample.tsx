"use client";

import { ExpansionList } from "@react-md/core/expansion-panel/ExpansionList";
import { ExpansionPanel } from "@react-md/core/expansion-panel/ExpansionPanel";
import { useExpansionPanels } from "@react-md/core/expansion-panel/useExpansionPanels";
import { type ReactElement } from "react";

export default function PreventAllPanelsCollapsedExample(): ReactElement {
  const { getPanelProps } = useExpansionPanels({
    preventAllCollapsed: true,

    // this can work with multiple expandable panels as well
    // multiple: true,

    // can set a custom default expanded index
    // defaultExpandedIndex: 1,
  });

  return (
    <ExpansionList style={{ width: "100%" }}>
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
