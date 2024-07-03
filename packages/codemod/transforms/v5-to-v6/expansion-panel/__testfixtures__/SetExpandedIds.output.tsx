import { type ReactElement } from "react";
import { ExpansionList, ExpansionPanel, useExpansionPanels, UseStateSetter } from "react-md";

export default function Example(): ReactElement {
  const {
    getPanelProps: getPanelProps,
    expandedIds: TODO_1_EXPANDED_IDS,
    setExpandedIds: TODO_2_SET_EXPANDED_IDS
  } = useExpansionPanels({
    baseId: "simple-panels",
    defaultExpandedIndex: 0
  });

  const setExpandedIds: UseStateSetter<string[]> = value => {
    TODO_2_SET_EXPANDED_IDS(prevSet => {
      if (value instanceof Function) {
        return new Set(value([...prevSet]));
      }

      return new Set(value);
    });
  };

  const expandedIds = [...TODO_1_EXPANDED_IDS];

  return (
    (<ExpansionList>
      <ExpansionPanel header="Panel 1" {...getPanelProps(0)}>
        Panel 1 Content
      </ExpansionPanel>
      <ExpansionPanel header="Panel 2" {...getPanelProps(1)}>
        Panel 2 Content
      </ExpansionPanel>
      <ExpansionPanel header="Panel 3" {...getPanelProps(2)}>
        Panel 3 Content
      </ExpansionPanel>
    </ExpansionList>)
  );
}
