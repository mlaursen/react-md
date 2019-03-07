import React, { FunctionComponent } from "react";
import {
  Tree,
  TreeData,
  TreeDataList,
  useTreeItemSelect,
  useTreeItemExpansion,
} from "@react-md/tree";

function createItem(index: number, depth: number, prefix: string): TreeData {
  const id = `${prefix}-${index}`;
  let childItems;
  if (depth < 2) {
    childItems = Array.from(new Array(3)).map((_, i) =>
      createItem(i, depth + 1, `${prefix}-${index}`)
    );
  }

  return {
    itemId: `item${id}`,
    children: `Item at depth: ${depth} and index: ${index}`,
    childItems,
  };
}

const data: TreeDataList = Array.from(new Array(10)).map((_, i) =>
  createItem(i, 0, "")
);

const Simple: FunctionComponent = () => {
  const { selectedIds, onItemSelect } = useTreeItemSelect([
    "simple-tree-item-0",
  ]);
  const { expandedIds, onItemExpandedChange } = useTreeItemExpansion([]);
  return (
    <Tree
      id="simple-tree"
      aria-label="Simple tree"
      data={data}
      selectedIds={selectedIds}
      expandedIds={expandedIds}
      onItemSelect={onItemSelect}
      onItemExpandedChange={onItemExpandedChange}
    />
  );
};

export default Simple;
