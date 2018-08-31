import * as React from "react";
import { TreeView, TreeViewControls } from "@react-md/tree-view";

import simpleData from "./simpleData";

const MultiSelectionTreeExample = () => (
  <TreeViewControls
    id="navigation-example"
    aria-label="MultiSelectionTree Example"
    data={simpleData}
    multiSelect={true}
  >
    {props => <TreeView {...props} />}
  </TreeViewControls>
);

export default MultiSelectionTreeExample;
