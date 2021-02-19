import { BaseTreeItem, TreeData, TreeItemId, UnknownTreeItem } from "./types";

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
 */
export function getChildItems<T extends BaseTreeItem = UnknownTreeItem>(
  data: TreeData<T> | readonly T[],
  parentId: TreeItemId | null,
  recursive = false
): readonly T[] {
  const items = Array.isArray(data) ? data : Object.values(data);

  return items.reduce<T[]>((list, item) => {
    if (parentId !== item.parentId) {
      return list;
    }

    return [
      ...list,
      item,
      ...(recursive ? getChildItems(items, item.itemId, recursive) : []),
    ];
  }, []);
}
