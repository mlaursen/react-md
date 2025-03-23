"use client";

import { type UseStateSetter } from "../types.js";
import { useReadonlySet } from "../useReadonlySet.js";
import { type TreeDefaultIds, type TreeItemIdSet } from "./types.js";

/**
 * @since 6.0.0 Renamed from `TreeItemSelection` and uses a Set
 * instead of a list to increase performance. Also renamed `onItemSelect` to
 * `toggleTreeItemSelection` and `onMultiItemSelect` to
 * `selectMultipleTreeItems`.
 */
export interface TreeSelection {
  /** @defaultValue `false` */
  multiSelect?: boolean;
  selectedIds: ReadonlySet<string>;
  toggleTreeItemSelection: (itemId: string) => void;
  selectMultipleTreeItems: UseStateSetter<TreeItemIdSet>;
}

/**
 * @see {@link https://next.react-md.dev/components/tree|Tree Demos}
 * @since 6.0.0 Renamed from `useTreeItemSelection` and uses a Set
 * instead of a list to increase performance.
 */
export function useTreeSelection(
  defaultSelectedIds?: TreeDefaultIds,
  multiSelect = false
): Required<TreeSelection> {
  const { value, setValue, toggleValue } = useReadonlySet({
    toggleType: multiSelect ? "multiple" : "single-select",
    defaultValue: defaultSelectedIds,
  });

  return {
    multiSelect,
    selectedIds: value,
    toggleTreeItemSelection: toggleValue,
    selectMultipleTreeItems: setValue,
  };
}
