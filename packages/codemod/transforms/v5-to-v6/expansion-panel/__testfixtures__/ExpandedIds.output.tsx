import { type ReactElement } from "react";
import { ExpansionList, ExpansionPanel, useExpansionPanels } from "react-md";

export default function Example(): ReactElement {
  const {
    getPanelProps: getPanelProps,
    expandedIds: TODO_1_EXPANDED_IDS
  } = useExpansionPanels({
    baseId: "simple-panels",
    defaultExpandedIndex: 0
  });

  const expandedIds = [...TODO_1_EXPANDED_IDS];

  expandedIds.forEach((expandedId) => {
    // do something
  });

  return (
    <ExpansionList>
      <ExpansionPanel header="Panel 1" {...getPanelProps(0)}>
        Panel 1 Content
      </ExpansionPanel>
      <ExpansionPanel header="Panel 2" {...getPanelProps(1)}>
        Panel 2 Content
      </ExpansionPanel>
      <ExpansionPanel header="Panel 3" {...getPanelProps(2)}>
        Panel 3 Content
      </ExpansionPanel>
    </ExpansionList>
  );
}
