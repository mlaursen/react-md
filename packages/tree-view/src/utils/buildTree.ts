import { FlattenedTreeViewData, FlattenedTreeViewDataList, FlattenedTreeViewSort } from "../types";

/**
 * Recursively builds a tree from a flattened data structure. This will either return a
 * list of items or undefined if there are were no child items.
 */
export default function buildTree<D>(
  parentId: string | null,
  list: FlattenedTreeViewDataList<D>,
  sort?: FlattenedTreeViewSort<D>
): FlattenedTreeViewDataList<D> | undefined {
  const childTreeItems: FlattenedTreeViewDataList<D> = [];
  let i = list.length;
  while (i > 0) {
    i -= 1;
    if (list[i] && list[i].parentId === parentId) {
      const [item] = list.splice(i, 1);
      childTreeItems.unshift(item);
    }
  }

  if (!childTreeItems.length) {
    return undefined;
  }

  childTreeItems.forEach(treeItem => {
    treeItem.childItems = buildTree(treeItem.itemId, list);
  });

  return sort ? sort(childTreeItems) : childTreeItems;
}
