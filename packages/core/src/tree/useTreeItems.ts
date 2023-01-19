import { useMemo } from "react";
import type {
  TreeItemSorter,
  TreeItemNode,
  TreeData,
  DefaultTreeItemNode,
} from "./types";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export type RenderedTreeItemsMetadata = Map<string | null, Set<string>>;

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export type RenderableTreeItemNode<
  T extends TreeItemNode = DefaultTreeItemNode
> = T & {
  childItems?: readonly RenderableTreeItemNode<T>[];
};

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface BuildTreeOptions<T extends TreeItemNode> {
  sort: TreeItemSorter<T>;
  nodes: T[];
  parentId: string | null;
  metadata: RenderedTreeItemsMetadata;
}

/**
 * This util performantly builds a nested list of tree items from a giant flat
 * list of items by linking items together with the provided `parentId`. This
 * will also recursively build the tree and _hopefully_ all items will be added.
 *
 * @internal
 * @remarks \@since 6.0.0 Updated to include the {@link RenderedTreeItemsMetadata}
 */
export function buildTree<T extends TreeItemNode>(
  options: BuildTreeOptions<T>
): readonly RenderableTreeItemNode<T>[] | undefined {
  const { sort, nodes, parentId, metadata } = options;
  const childIds = metadata.get(parentId) || new Set();
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
      childIds.add(item.itemId);
      // shallow cloning so childItems doesn't get applied to the original data
      // set
      childItems.unshift({ ...item });
    }
  }

  if (!childItems.length) {
    return undefined;
  }

  metadata.set(parentId, childIds);
  childItems.forEach((childItem) => {
    childItem.childItems = buildTree({
      sort,
      nodes,
      parentId: childItem.itemId,
      metadata,
    });
  });

  return sort(childItems);
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface TreeItemOptions<T extends TreeItemNode> {
  data: TreeData<T>;
  sort: TreeItemSorter<T>;
  rootId: string | null;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
interface TreeItems<T extends TreeItemNode> {
  items: readonly RenderableTreeItemNode<T>[];
  metadata: RenderedTreeItemsMetadata;
}

/**
 * @internal
 * @remarks \@since 6.0.0 converted to use an object argument instead of
 * multiple arguments.
 */
export function useTreeItems<T extends TreeItemNode>(
  options: TreeItemOptions<T>
): TreeItems<T> {
  const { data, sort, rootId } = options;

  return useMemo(() => {
    const values = Object.values(data);
    const metadata = new Map<string, Set<string>>();
    const items = buildTree<T>({
      sort,
      nodes: values,
      parentId: rootId,
      metadata,
    });

    if (process.env.NODE_ENV !== "production" && values.length) {
      /* eslint-disable no-console */
      console.warn(`The following tree items are orphaned without a parent:`);
      console.warn(values.slice());
    }

    return {
      items: items || [],
      metadata,
    };
  }, [data, rootId, sort]);
}
