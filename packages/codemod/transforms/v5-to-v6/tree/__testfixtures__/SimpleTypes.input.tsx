import { TreeItemId, TreeItemIds, ExpandedIds, SelectedIds } from "react-md";

export interface Example1 extends TreeItemIds {
  itemId: TreeItemId;
  selectedIds: SelectedIds;
  expandedIds: ExpandedIds;
}
