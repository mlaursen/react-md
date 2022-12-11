import type { TreeData } from "@react-md/tree";
import { getChildItems } from "@react-md/tree";

import type { Folder } from "src/constants/folders";

export const isFolder = (item: unknown): item is Folder =>
  !!item && "itemId" in item;

interface Options {
  data: TreeData<Folder>;
  draggingItem: unknown;
  currentItemId: string;
}

export const isValidFolderPath = (options: Options): boolean => {
  const { data, draggingItem, currentItemId } = options;
  if (!isFolder(draggingItem)) {
    return false;
  }

  const draggingItemId = draggingItem.itemId;
  const draggingParentId = draggingItem.parentId;

  return (
    currentItemId !== draggingItemId &&
    currentItemId !== draggingParentId &&
    !getChildItems(data, draggingItemId, true).find(
      (childFolder) => currentItemId === childFolder.itemId
    )
  );
};
