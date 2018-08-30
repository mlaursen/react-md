import { TreeViewDataList } from "../types";

/**
 * An extremely simple util to get all ids from the TreeViewDataList.
 */
export default function findAllIds<D>(data: TreeViewDataList<D>): string[] {
  const ids: string[] = [];
  for (const item of data) {
    ids.push(item.itemId);

    if (item.childItems) {
      [].push.apply(ids, findAllIds(item.childItems));
    }
  }

  return ids;
}
