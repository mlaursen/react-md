import { useCallback, useState } from "react";
import type {
  TreeItemDefaultIds,
  TreeExpansion,
  TreeItemIdSet,
  TreeSelection,
} from "./types";

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

  const onItemExpansion = useCallback((itemId: string, expanded: boolean) => {
    setExpandedIds((prevExpandedIds) => {
      const expandedIds = new Set(prevExpandedIds);
      if (expanded) {
        expandedIds.add(itemId);
      } else {
        expandedIds.delete(itemId);
      }

      return expandedIds;
    });
  }, []);

  return {
    expandedIds,
    onItemExpansion,
    onMultiItemExpansion: setExpandedIds,
  };
}

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
  defaultSelectedIds?: TreeItemDefaultIds,
  multiSelect = false
): Required<TreeSelection> {
  const [selectedIds, setSelectedIds] = useState<TreeItemIdSet>(() => {
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

export interface TreeHookOptions {
  multiSelect?: boolean;
  defaultExpandedIds?: TreeItemDefaultIds;
  defaultSelectedIds?: TreeItemDefaultIds;
}

export interface TreeImplementation
  extends Required<TreeSelection>,
    Required<TreeExpansion> {}

/**
 * @remarks \@since 6.0.0
 */
export function useTree(options: TreeHookOptions = {}): TreeImplementation {
  const {
    multiSelect = false,
    defaultExpandedIds,
    defaultSelectedIds,
  } = options;

  return {
    ...useTreeExpansion(defaultExpandedIds),
    ...useTreeSelection(defaultSelectedIds, multiSelect),
  };
}
