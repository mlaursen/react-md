import { TreeViewDataList } from "../types";

/**
 * A utility function that will find all ids for the provided `toMatchIds`. This is generally used
 * to automatically expand parent lements if a child node has been expanded.
 */
export default function findAllIds<D>(
  data: TreeViewDataList<D>,
): string[] {
  const ids: string[] = [];
  for (const item of data) {
    ids.push(item.itemId);

    if (item.childItems) {
      [].push.apply(ids, findAllIds(item.childItems));
    }
  }

  return ids;
}
