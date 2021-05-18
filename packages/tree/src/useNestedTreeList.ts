import { useMemo } from "react";

import { BaseTreeItem, TreeData, TreeItemId, TreeItemSorter } from "./types";

/**
 * @internal
 */
export type NestedTreeItem<T extends BaseTreeItem> = T & {
  childItems?: NestedTreeItem<T>[];
};

/**
 * This util performantly builds a nested list of tree items from a giant flat
 * list of items by linking items together with the provided `parentId`. This
 * will also recursively build the tree and _hopefully_ all items will be added.
 *
 * If there are no children for a specific item
 *
 * TODO: Add a dev-only warning/error if the tree is built, but there are some
 * items that never referenced another `itemId`
 *
 * @internal
 */
export function buildTree<T extends BaseTreeItem>(
  parentId: null | TreeItemId,
  items: T[],
  sort?: TreeItemSorter<T>
): NestedTreeItem<T>[] | undefined {
  const childItems: NestedTreeItem<T>[] = [];

  // doing a "reverse" order filter/move so that the items array shrinks while
  // looping. This makes it so that the entire items array doesn't need to
  // continually be looped through as more items are added to the tree, only the
  // remaining items will have to be looped
  let i = items.length;
  while (i > 0) {
    i -= 1;
    if (items[i] && items[i].parentId === parentId) {
      const [item] = items.splice(i, 1);
      // shallow cloning so childItems doesn't get applied to the original data
      // set
      childItems.unshift({ ...item });
    }
  }

  if (!childItems.length) {
    return undefined;
  }

  childItems.forEach((childItem) => {
    childItem.childItems = buildTree(childItem.itemId, items, sort);
  });

  return sort ? sort(childItems) : childItems;
}

/**
 * This is an internal hook that will create a renderable nested list view of
 * the tree data.
 *
 * @internal
 * @param tree - The full tree to convert to a nested list representation
 * @param sort - An optional function that sorts the items at each level
 * @param rootId - The starting `parentId` to use while building the tree. This
 * defaults to `null` since this is most likely the general use case, but if
 * there's a different unique identifier for the "root level" items, that can be
 * used instead.
 */
export function useNestedTreeList<T extends BaseTreeItem>(
  tree: TreeData<T>,
  sort?: TreeItemSorter<T>,
  rootId: null | TreeItemId = null
): readonly NestedTreeItem<T>[] {
  return useMemo(
    () => buildTree(rootId, Object.values(tree), sort) || [],
    [rootId, sort, tree]
  );
}
