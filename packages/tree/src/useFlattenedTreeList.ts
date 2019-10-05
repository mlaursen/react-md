import { useMemo, MutableRefObject } from "react";

import { NestedTreeItem } from "./useNestedTreeList";
import { TreeItemId, UnknownTreeItem, TreeProps, ExpandedIds } from "./types";
import getTreeItemId from "./getTreeItemId";

export interface SearchableTreeItem {
  /**
   * A DOM Node `id` to use.
   */
  id: string;

  /**
   * A searchable value for the tree item.
   */
  value: string;

  isParent: boolean;
  itemId: TreeItemId;
  parentId: TreeItemId | null;
}

type TreeConfig = Required<
  Pick<TreeProps<UnknownTreeItem>, "valueKey" | "getItemValue">
>;

interface FlattenOptions extends TreeConfig {
  list: SearchableTreeItem[];
  item: NestedTreeItem<UnknownTreeItem>;
  index: number;
  baseId: string;
  parentIndexes: number[];
}

function flatten({
  list,
  item,
  index,
  baseId,
  parentIndexes,
  valueKey,
  getItemValue,
}: FlattenOptions): SearchableTreeItem[] {
  if (item.isCustom) {
    return list;
  }

  const id = getTreeItemId(baseId, index, parentIndexes);
  const value = getItemValue(item, valueKey);
  const { itemId, parentId, childItems } = item;
  list.push({
    id,
    itemId,
    parentId,
    isParent: !!childItems,
    value,
  });

  if (!childItems) {
    return list;
  }

  const nextIndexes = [...parentIndexes, index + 1];
  childItems.forEach((child, childIndex) => {
    flatten({
      list,
      item: child,
      index: childIndex,
      valueKey,
      getItemValue,
      baseId,
      parentIndexes: nextIndexes,
    });
  });

  return list;
}

interface Options extends TreeConfig {
  id: string;
  items: NestedTreeItem<UnknownTreeItem>[];
  expandedIds: ExpandedIds;
}

export type TreeItemRef = MutableRefObject<HTMLLIElement | null>;
export interface TreeItemIdRef {
  id: string;
  ref: TreeItemRef;
}

export type TreeItemIdRefRecord = Record<TreeItemId, TreeItemIdRef>;

type ReturnValue = [
  SearchableTreeItem[],
  TreeItemIdRefRecord,
  SearchableTreeItem[]
];

/**
 * Creates a flattened and ordered list of all the tree items that are current visible
 * in the DOM based on the expanded ids. This is only required for handling keyboard
 * navigation with `aria-activedescendant` movement so the items can be "focused" with
 * typeahead and keyboard movement since the keyboard movement API requires DOM refs
 * to be passed to each element.
 *
 * This flattened list will remove the `childItems` (if it existed) on each item for
 * simplicity and the child items aren't needed for this flattened list.
 *
 * @private
 */
export default function useFlattenedTreeList({
  id,
  items,
  expandedIds,
  valueKey,
  getItemValue,
}: Options): ReturnValue {
  const flattenedItems = useMemo(
    () =>
      items.reduce<SearchableTreeItem[]>(
        (list, item, index) =>
          flatten({
            list,
            item,
            index,
            valueKey,
            getItemValue,
            baseId: id,
            parentIndexes: [],
          }),
        []
      ),
    [getItemValue, id, items, valueKey]
  );

  const itemRefs = useMemo(
    () =>
      flattenedItems.reduce<TreeItemIdRefRecord>(
        (collection, item) => ({
          ...collection,
          [item.itemId]: {
            id: item.id,
            ref: { current: null },
          },
        }),
        {}
      ),
    [flattenedItems]
  );

  const visibleItems = flattenedItems.filter(
    ({ parentId }) => parentId === null || expandedIds.includes(parentId)
  );

  return [visibleItems, itemRefs, flattenedItems];
}
