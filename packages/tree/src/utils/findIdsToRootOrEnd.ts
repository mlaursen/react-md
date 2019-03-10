import { AnyRecord, TreeData, TreeDataList, TreeElement } from "../types.d";
import buildItemIndexStack from "./buildItemIndexStack";
import findTreeItemElement from "./findTreeItemElement";

export interface RootOrEndIdsConfig<D = AnyRecord> {
  element: HTMLElement;
  data: TreeDataList<D>;
  treeEl: TreeElement;
  selectedIds: string[];
  toRoot?: boolean;
}

export default function findIdsToRootOrEnd<D>({
  element,
  data,
  treeEl,
  selectedIds,
  toRoot = true,
}: RootOrEndIdsConfig<D>): string[] {
  const itemElement = findTreeItemElement(element);
  if (!itemElement) {
    return selectedIds;
  }

  const ids: string[] = selectedIds.slice();
  const indexStack = buildItemIndexStack(itemElement, treeEl, true);
  const dataStack: TreeDataList<D>[] = [];
  const lastIndex = indexStack[indexStack.length - 1];

  let item: TreeData<D> | null = null;
  let list = data;
  for (const index of indexStack) {
    const temp = list[index];

    dataStack.unshift(list);
    list = temp.childItems as TreeDataList<D>;
    if (index === lastIndex) {
      item = temp;
    }
  }

  if (!item || indexStack.length !== dataStack.length) {
    return selectedIds;
  }

  for (let i = 0; i < dataStack.length; i += 1) {
    const index = indexStack[i];
    const dataList = dataStack[i];
    let start = 0;
    let end = index + 1;
    if (!toRoot) {
      start = index;
      end = dataList.length;
    }

    const sliced = dataList.slice(start, end);
    ids.push(...sliced.map(({ itemId }) => itemId));
  }

  const nextSelectedIds = ids.filter(
    (itemId, i, idsList) => idsList.indexOf(itemId) === i
  );
  if (nextSelectedIds.length !== selectedIds.length) {
    return nextSelectedIds;
  }

  return selectedIds;
}
