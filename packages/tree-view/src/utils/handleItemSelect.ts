function handleSingleItemSelect(itemId: string, selectedIds: string[]) {
  if (selectedIds[0] === itemId && selectedIds.length === 1) {
    return selectedIds;
  }

  return [itemId];
}

function handleMultiItemSelect(itemId: string, selectedIds: string[]) {
  const i = selectedIds.indexOf(itemId);
  const nextSelectedIds = selectedIds.slice();
  if (i === -1) {
    nextSelectedIds.push(itemId);
  } else {
    nextSelectedIds.splice(i, 1);
  }

  return nextSelectedIds;
}

/**
 * A really simple helper function to implement the single item treeview selection logic.
 * A new `expandedIds` list will only be returned if the ids have changed, otherwise the
 * original `expandedIds` list will be returned.
 */
export default function handleItemSelect(itemId: string, selectedIds: string[], multiSelect: boolean = false) {
  if (multiSelect) {
    return handleMultiItemSelect(itemId, selectedIds);
  }

  return handleSingleItemSelect(itemId, selectedIds);
}
