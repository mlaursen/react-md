/**
 * A really simple helper function to implment a treeitem's expansion change logic that can be
 * added to a component's state (or redux). A new `expandedIds` list will only be returned
 * if the ids have changed, otherwise the original `expandedIds` list will be returned.
 */
export default function handleItemExpandedChange(
  itemId: string,
  expanded: boolean,
  expandedIds: string[]
) {
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
