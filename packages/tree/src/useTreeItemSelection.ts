import { useCallback, useState } from "react";
import type { TreeItemIdSet, TreeSelection } from "./types";

/**
 * A hook that implements the base functionality for selecting different tree
 * items.
 *
 * @param defaultSelectedIds - The default list of tree item ids that should be
 * expanded by default
 * @param multiSelect - Boolean if the tree can have multiple items selected or
 * not.
 * @returns an object containing props that can be passed to the `Tree`
 * component to handle the selection state within the tree
 */
export function useTreeSelection(
  defaultSelectedIds?: readonly string[] | (() => readonly string[]),
  multiSelect = false
): Required<TreeSelection> {
  const [selectedIds, setSelectedIds] = useState(() => {
    const defaultIds =
      typeof defaultSelectedIds === "function"
        ? defaultSelectedIds()
        : defaultSelectedIds;

    return new Set(defaultIds);
  });
  const onItemSelection = useCallback(
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

  const onMultiItemSelection = useCallback((itemIds: TreeItemIdSet) => {
    setSelectedIds(itemIds);
  }, []);

  return {
    selectedIds,
    multiSelect,
    onItemSelection,
    onMultiItemSelection,
  };
}
