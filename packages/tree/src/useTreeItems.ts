import { useMemo } from "react";
import type {
  TreeItemSorter,
  RenderableTreeItemNode,
  TreeItemNode,
  TreeData,
} from "./types";

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
export function buildTree<T extends TreeItemNode>(
  parentId: string | null,
  nodes: T[],
  sort: TreeItemSorter<T>
): readonly RenderableTreeItemNode<T>[] | undefined {
  const childItems: RenderableTreeItemNode<T>[] = [];

  // doing a "reverse" order filter/move so that the items array shrinks while
  // looping. This makes it so that the entire items array doesn't need to
  // continually be looped through as more items are added to the tree, only the
  // remaining items will have to be looped
  let i = nodes.length;
  while (i > 0) {
    i -= 1;
    if (nodes[i] && nodes[i].parentId === parentId) {
      const [item] = nodes.splice(i, 1);
      // shallow cloning so childItems doesn't get applied to the original data
      // set
      childItems.unshift({ ...item });
    }
  }

  if (!childItems.length) {
    return undefined;
  }

  childItems.forEach((childItem) => {
    childItem.childItems = buildTree(childItem.itemId, nodes, sort);
  });

  return sort(childItems);
}

export interface TreeItemOptions<T extends TreeItemNode> {
  data: TreeData<T>;
  sort: TreeItemSorter<T>;
  rootId: string | null;
}

/**
 *
 * @internal
 */
export function useTreeItems<T extends TreeItemNode>(
  options: TreeItemOptions<T>
): readonly RenderableTreeItemNode<T>[] {
  const { data, sort, rootId } = options;

  return useMemo(() => {
    const values = Object.values(data);
    const items = buildTree(rootId, values, sort) || [];
    if (process.env.NODE_ENV !== "production" && values.length) {
      /* eslint-disable no-console */
      console.warn(`The following tree items are orphaned without a parent:`);
      console.warn(values.slice());
    }

    return items;
  }, [data, rootId, sort]);
}