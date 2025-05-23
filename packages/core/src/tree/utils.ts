import {
  type DefaultTreeItemNode,
  type TreeData,
  type TreeItemNode,
} from "./types.js";

/**
 * This will get all the items from the provided itemId up to the root of the
 * tree that can be used for drag and drop behavior or building a breadcrumb
 * list.
 *
 * @param data - The flattened tree data to navigate.
 * @param itemId - The item id to start the search at.
 * @returns an ordered list of the current item followed by all the direct
 * parents of that item.
 * @since 6.0.0 Renamed from `getItemsFrom` to `getTreeItemsFrom`.
 */
export function getTreeItemsFrom<T extends TreeItemNode = DefaultTreeItemNode>(
  data: TreeData<T>,
  itemId: string | null
): readonly T[] {
  const items: T[] = [];
  let currentId = itemId;
  while (currentId) {
    const item = data[currentId];
    currentId = item?.parentId ?? null;
    if (item) {
      items.push(item);
    }
  }

  return items;
}

/**
 * Gets all the child items for a specific parent item id. If the `recursive`
 * argument is enabled, all children of the items will also be returned instead
 * of only the top level items.
 *
 * @param data - Either the flattened tree data or a list of all the tree data
 * to iterate over
 * @param parentId - The parent id to get children of
 * @param recursive - Boolean if the children's children should also be returned
 * @returns a list of all the items for a specific parent item id. Note: if the
 * recursive param is enabled, the list will be ordered so that the children of
 * a item will appear before the next item at the same level. So you either need
 * to sort by `parentId` or something else if you want a specific order.
 * @since 6.0.0 Renamed from `getChildItems` to `getChildTreeItems`.
 */
export function getChildTreeItems<T extends TreeItemNode = DefaultTreeItemNode>(
  data: TreeData<T> | readonly T[],
  parentId: string | null,
  recursive = false
): readonly T[] {
  const items: readonly T[] = Array.isArray(data) ? data : Object.values(data);

  return items.reduce<T[]>((list, item) => {
    if (parentId !== item.parentId) {
      return list;
    }

    return [
      ...list,
      item,
      ...(recursive ? getChildTreeItems(items, item.itemId, recursive) : []),
    ];
  }, []);
}
