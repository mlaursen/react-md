import type { TreeItemNode } from "./types";

interface TreeItemIdOptions {
  treeId: string;
  index: number;
  parentIndexes: readonly number[];
}

/**
 * @internal
 */
export function getTreeItemId(options: TreeItemIdOptions): string {
  const { treeId, index, parentIndexes } = options;

  let parents = "";
  if (parentIndexes.length) {
    parents = `-${parentIndexes.join("-")}`;
  }

  return `${treeId}-item${parents}-${index + 1}`;
}

export function isNonRootTreeItem(item: Readonly<TreeItemNode>): boolean {
  return item.parentId !== null;
}
