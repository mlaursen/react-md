/**
 * A small util for recursively generating a unique id for each tree item based
 * on the current depth within the tree and the index within the current list.
 *
 * @param treeId - The base id of the tree element
 * @param index - The current index of the item
 * @param parentIndexes - A list of parent indexes that are joined together with
 * `'-'` to generate the full id.
 * @internal
 */
export function getTreeItemId(
  treeId: string,
  index: number,
  parentIndexes: readonly number[] = []
): string {
  if (!parentIndexes.length) {
    return `${treeId}-item-${index + 1}`;
  }

  return `${treeId}-item-${parentIndexes.join("-")}-${index + 1}`;
}
