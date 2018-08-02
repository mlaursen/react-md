import * as React from "react";
import { TreeViewDataList, TreeView, TreeViewControls } from "@react-md/tree-view";

const data: TreeViewDataList = [
  {
    itemId: "item-1",
    children: "Item 1",
    childItems: [
      {
        itemId: "item-1-1",
        children: "Item 1-1",
      },
      {
        itemId: "item-1-2",
        children: "Item 1-2",
      },
    ],
  },
  {
    itemId: "item-2",
    children: "Item 2",
  },
  {
    itemId: "item-3",
    children: "Item 3",
    childItems: [
      {
        itemId: "item-3-1",
        children: "Item 3-1",
      },
      {
        itemId: "item-3-2",
        children: "Item 3-2",
      },
      {
        itemId: "item-3-3",
        children: "Item 3-3",
      },
    ],
  },
];

const SimpleExample: React.SFC<{}> = () => (
  <TreeViewControls id="navigation-example" aria-label="Simple Example" data={data}>
    {props => <TreeView {...props} style={{ width: "100%" }} />}
  </TreeViewControls>
);

export default SimpleExample;
