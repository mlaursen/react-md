import { type ReactElement } from "react";
import { ExpansionList, ExpansionPanel, usePanels } from "react-md";

export default function Example(): ReactElement {
  const [panels, onKeyDown, expandedIds, setExpandedIds] = usePanels({
    idPrefix: "simple-panels",
    count: 3,
    defaultExpandedIndex: 0,
  });

  return (
    <ExpansionList onKeyDown={onKeyDown}>
      <ExpansionPanel header="Panel 1" {...panels[0]}>
        Panel 1 Content
      </ExpansionPanel>
      <ExpansionPanel header="Panel 2" {...panels[1]}>
        Panel 2 Content
      </ExpansionPanel>
      <ExpansionPanel header="Panel 3" {...panels[2]}>
        Panel 3 Content
      </ExpansionPanel>
    </ExpansionList>
  );
}
