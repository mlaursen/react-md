import { TreeViewDataList } from "./types";

/**
 * A really simple helper function to implement the single item treeview selection logic.
 * A new `expandedIds` list will only be returned if the ids have changed, otherwise the
 * original `expandedIds` list will be returned.
 */
export function handleSingleItemSelect(itemId: string, selectedIds: string[]) {
  if (selectedIds[0] === itemId && selectedIds.length === 1) {
    return selectedIds;
  }

  return [itemId];
}

/**
 * A really simple helper function to implment a treeitem's expansion change logic that can be
 * added to a component's state (or redux). A new `expandedIds` list will only be returned
 * if the ids have changed, otherwise the original `expandedIds` list will be returned.
 */
export function handleItemExpandedChange(itemId: string, expanded: boolean, expandedIds: string[]) {
  const i = expandedIds.indexOf(itemId);
  if (i === -1 && expanded) {
    const nextExpandedIds = expandedIds.slice();
    nextExpandedIds.push(itemId);
    return nextExpandedIds;
  } else if (i !== -1 && !expanded) {
    const nextExpandedIds = expandedIds.slice();
    nextExpandedIds.splice(i, 1);
    return nextExpandedIds;
  }

  return expandedIds;
}

/**
 * A utility function that will find all parent ids for the provided `toMatchIds`. This is generally used
 * to automatically expand parent lements if a child node has been expanded.
 */
export function findAllParentIds<D>(
  items: TreeViewDataList<D>,
  toMatchIds: string[],
  parentIds: string[] = []
): string[] {
  const ids: string[] = [];
  items.forEach(({ itemId, childItems }) => {
    if (childItems && childItems.length) {
      [].push.apply(ids, findAllParentIds(childItems, toMatchIds, parentIds.concat([itemId])));
    }

    if (toMatchIds.indexOf(itemId) !== -1) {
      [].push.apply(ids, parentIds);
    }
  });

  // remove duplicates
  return ids.filter((id, i, list) => list.indexOf(id) === i);
}
