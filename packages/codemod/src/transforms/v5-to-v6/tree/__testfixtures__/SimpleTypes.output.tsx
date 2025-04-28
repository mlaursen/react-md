import { TreeItemIdSet, TreeItemNode } from "react-md";

export interface Example1 extends TreeItemNode {
  itemId: string;
  selectedIds: TreeItemIdSet;
  expandedIds: TreeItemIdSet;
}
