"use client";

import { type UseStateSetter } from "../types.js";
import { useReadonlySet } from "../useReadonlySet.js";
import { type TreeDefaultIds, type TreeItemIdSet } from "./types.js";

/**
 * @since 6.0.0 Renamed from `TreeItemExpansion` and uses a Set
 * instead of a list to increase performance. Also renamed `onItemExpansion` to
 * `toggleTreeItemExpansion` and `onMultiItemExpansion` to
 * `expandMultipleTreeItems`.
 */
export interface TreeExpansion {
  expandedIds: TreeItemIdSet;
  toggleTreeItemExpansion: (itemId: string) => void;
  expandMultipleTreeItems: UseStateSetter<TreeItemIdSet>;
}

/**
 * @see {@link https://next.react-md.dev/components/tree | Tree Demos}
 * @since 6.0.0 Renamed from `useTreeItemExpansion` and uses a Set
 * instead of a list to increase performance.
 */
export function useTreeExpansion(
  defaultExpandedIds?: TreeDefaultIds
): TreeExpansion {
  const { value, setValue, toggleValue } = useReadonlySet({
    defaultValue: defaultExpandedIds,
  });

  return {
    expandedIds: value,
    toggleTreeItemExpansion: toggleValue,
    expandMultipleTreeItems: setValue,
  };
}
