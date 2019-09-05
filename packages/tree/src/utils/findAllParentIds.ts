import { TreeDataList } from "../types";

/**
 * A utility function that will find all parent ids for the provided `toMatchIds`. This is generally
 * used to automatically expand parent lements if a child node has been expanded.
 */
export default function findAllParentIds<D>(
  data: TreeDataList<D>,
  toMatchIds: string[],
  parentIds: string[] = []
): string[] {
  const ids: string[] = [];
  if (!toMatchIds.length) {
    return ids;
  }

  data.forEach(({ itemId, childItems }) => {
    if (childItems && childItems.length) {
      ids.push(
        ...findAllParentIds(childItems, toMatchIds, parentIds.concat([itemId]))
      );
    }

    if (toMatchIds.includes(itemId)) {
      ids.push(...parentIds);
    }
  });

  // remove duplicates
  return ids.filter((id, i, list) => list.indexOf(id) === i);
}