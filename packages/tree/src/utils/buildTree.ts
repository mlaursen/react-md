import { FlattenedTreeDataList, FlattenedTreeSort } from "../types.d";

/**
 * Recursively builds a tree from a flattened data structure. This will either return a
 * list of items or undefined if there are were no child items.
 */
export default function buildTree<D>(
  parentId: string | null,
  list: FlattenedTreeDataList<D>,
  sort?: FlattenedTreeSort<D>
): FlattenedTreeDataList<D> | undefined {
  const childTreeItems: FlattenedTreeDataList<D> = [];
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
