import * as React from "react";
import { TreeView, TreeViewControls } from "@react-md/tree-view";

import simpleData from "./simpleData";

const SingleSelectionTreeExample = () => (
  <TreeViewControls
    id="single-selection-tree-example"
    aria-label="Single Selection Tree Example"
    data={simpleData}
  >
    {props => <TreeView {...props} />}
  </TreeViewControls>
);

export default SingleSelectionTreeExample;
