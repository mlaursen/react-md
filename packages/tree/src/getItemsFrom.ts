import { BaseTreeItem, TreeData, TreeItemId, UnknownTreeItem } from "./types";

/**
 * This will get all the items from the provided itemId up to the root of the
 * tree that can be used for drag and drop behavior or building a breadcrumb
 * list.
 *
 * @param data - The flattened tree data to navigate.
 * @param itemId - The item id to start the search at.
 * @returns an ordered list of the current item followed by all the direct
 * parents of that item.
 */
export function getItemsFrom<T extends BaseTreeItem = UnknownTreeItem>(
  data: TreeData<T>,
  itemId: TreeItemId | null
): readonly T[] {
  const items: T[] = [];
  let currentId = itemId;
  while (currentId) {
    const item = data[currentId];
    currentId = (item && item.parentId) || null;
    if (item) {
      items.push(item);
    }
  }

  return items;
}
