import { useCallback, useState } from "react";

import { SelectedIds, TreeItemId, TreeItemSelection } from "./types";

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
export function useTreeItemSelection(
  defaultSelectedIds: SelectedIds | (() => SelectedIds),
  multiSelect = false
): Required<TreeItemSelection> {
  const [selectedIds, setSelectedIds] = useState(defaultSelectedIds);
  const onItemSelect = useCallback(
    (itemId: TreeItemId) => {
      setSelectedIds((selectedIds) => {
        if (!multiSelect) {
          if (selectedIds[0] === itemId && selectedIds.length === 1) {
            return selectedIds;
          }

          return [itemId];
        }

        const i = selectedIds.indexOf(itemId);
        const nextSelectedIds = selectedIds.slice();
        if (i === -1) {
          nextSelectedIds.push(itemId);
        } else {
          nextSelectedIds.splice(i, 1);
        }

        return nextSelectedIds;
      });
    },
    [multiSelect]
  );

  const onMultiItemSelect = useCallback((itemIds: SelectedIds) => {
    setSelectedIds(itemIds);
  }, []);

  return {
    selectedIds,
    multiSelect,
    onItemSelect,
    onMultiItemSelect,
  };
}
