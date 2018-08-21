import { IIndexKeyAny, TreeViewDataList } from "../types";

/**
 * Attempts to find the `TreeItemDataList` based on a stack of item indexes by digging down into the
 * provided `data` list.
 */
export default function findTreeItemDataList<D = IIndexKeyAny>(stack: number[], data: TreeViewDataList<D>) {
  let list = data;
  for (const index of stack) {
    const temp = list[index];
    if (!temp.childItems) {
      return [];
    }

    list = temp.childItems;
  }

  return list;
}
