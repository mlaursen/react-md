"use client";
import { useCallback, useState } from "react";
import type { UseStateSetter } from "../types.js";
import type { TreeItemDefaultIds, TreeItemIdSet } from "./types.js";

/**
 * @remarks \@since 6.0.0 Renamed from `TreeItemExpansion` and uses a Set
 * instead of a list to increase performance. Also renamed `onItemExpansion` to
 * `toggleTreeItemExpansion` and `onMultiItemExpansion` to
 * `expandMultipleTreeItems`.
 */
export interface TreeExpansion {
  expandedIds: TreeItemIdSet;
  toggleTreeItemExpansion(itemId: string): void;
  expandMultipleTreeItems: UseStateSetter<TreeItemIdSet>;
}

/**
 * @remarks \@since 6.0.0 Renamed from `useTreeItemExpansion` and uses a Set
 * instead of a list to increase performance.
 */
export function useTreeExpansion(
  defaultExpandedIds?: TreeItemDefaultIds
): TreeExpansion {
  const [expandedIds, setExpandedIds] = useState<TreeItemIdSet>(() => {
    const defaultIds =
      typeof defaultExpandedIds === "function"
        ? defaultExpandedIds()
        : defaultExpandedIds;

    return new Set(defaultIds);
  });

  const toggleTreeItemExpansion = useCallback((itemId: string) => {
    setExpandedIds((prevExpandedIds) => {
      const expandedIds = new Set(prevExpandedIds);
      if (expandedIds.has(itemId)) {
        expandedIds.delete(itemId);
      } else {
        expandedIds.add(itemId);
      }

      return expandedIds;
    });
  }, []);

  return {
    expandedIds,
    toggleTreeItemExpansion,
    expandMultipleTreeItems: setExpandedIds,
  };
}
