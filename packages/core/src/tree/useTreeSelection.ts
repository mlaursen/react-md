"use client";
import { useCallback, useState } from "react";
import { type UseStateSetter } from "../types.js";
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
  toggleTreeItemSelection(itemId: string): void;
  selectMultipleTreeItems: UseStateSetter<TreeItemIdSet>;
}

/**
 * @since 6.0.0 Renamed from `useTreeItemSelection` and uses a Set
 * instead of a list to increase performance.
 */
export function useTreeSelection(
  defaultSelectedIds?: TreeDefaultIds,
  multiSelect = false
): Required<TreeSelection> {
  const [selectedIds, setSelectedIds] = useState<TreeItemIdSet>(() => {
    const defaultIds =
      typeof defaultSelectedIds === "function"
        ? defaultSelectedIds()
        : defaultSelectedIds;

    return new Set(defaultIds);
  });

  const toggleTreeItemSelection = useCallback(
    (itemId: string) => {
      setSelectedIds((selectedIds) => {
        if (!multiSelect) {
          return selectedIds.has(itemId) ? selectedIds : new Set([itemId]);
        }

        const nextSelectedIds = new Set(selectedIds);
        if (selectedIds.has(itemId)) {
          nextSelectedIds.delete(itemId);
        } else {
          nextSelectedIds.add(itemId);
        }

        return nextSelectedIds;
      });
    },
    [multiSelect]
  );

  return {
    selectedIds,
    multiSelect,
    toggleTreeItemSelection,
    selectMultipleTreeItems: setSelectedIds,
  };
}
