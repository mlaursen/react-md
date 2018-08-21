import { IIndexKeyAny, TreeViewData, TreeViewDataList, TreeViewElement } from "../types";
import buildItemIndexStack from "./buildItemIndexStack";
import findTreeItemElement from "./findTreeItemElement";

export interface IRootOrEndIdsConfig<D = IIndexKeyAny> {
  element: HTMLElement;
  data: TreeViewDataList<D>;
  treeEl: TreeViewElement;
  selectedIds: string[];
  toRoot?: boolean;
}

export default function findIdsToRootOrEnd<D>({
  element,
  data,
  treeEl,
  selectedIds,
  toRoot = true,
}: IRootOrEndIdsConfig<D>): string[] {
  const itemElement = findTreeItemElement(element);
  if (!itemElement) {
    return selectedIds;
  }

  const ids: string[] = selectedIds.slice();
  const indexStack = buildItemIndexStack(itemElement, treeEl, true);
  const dataStack: Array<TreeViewDataList<D>> = [];
  const lastIndex = indexStack[indexStack.length - 1];

  let item: TreeViewData<D> | null = null;
  let list = data;
  for (const index of indexStack) {
    const temp = list[index];

    dataStack.unshift(list);
    list = temp.childItems as TreeViewDataList<D>;
    if (index === lastIndex) {
      item = temp;
    }
  }

  if (!item || indexStack.length !== dataStack.length) {
    return selectedIds;
  }

  for (let i = 0; i < dataStack.length; i++) {
    const index = indexStack[i];
    const dataList = dataStack[i];
    const current = dataList[index];
    let start = 0;
    let end = index + 1;
    if (!toRoot) {
      start = index;
      end = dataList.length;
    }

    const sliced = dataList.slice(start, end);
    [].push.apply(ids, sliced.map(({ itemId }) => itemId));
  }

  if (ids.length !== selectedIds.length) {
    return ids;
  }

  return selectedIds;
}
