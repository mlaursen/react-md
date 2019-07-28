import { TreeDataList } from "../types";

/**
 * An extremely simple util to get all ids from the TreeViewDataList.
 */
export default function findAllIds<D>(data: TreeDataList<D>): string[] {
  const ids: string[] = [];
  for (const item of data) {
    ids.push(item.itemId);

    if (item.childItems) {
      ids.push(...findAllIds(item.childItems));
    }
  }

  return ids;
}
