import { useMemo, useState } from "react";
import {
  KeyboardFocusChangeEvent,
  useKeyboardFocusEventHandler,
  useSearchEventHandler,
} from "@react-md/wia-aria";

import {
  FlattenedTreeSort,
  AnyRecord,
  FlattenedTree,
  TreeBaseProps,
  TreeIdsProps,
  TreeProps,
  TreeElement,
  FlattenedTreeDataList,
} from "./types.d";
import buildTree from "./utils/buildTree";
import findTreeItemFromElement from "./utils/findTreeItemFromElement";
import handleItemExpandedChange from "./utils/handleItemExpandedChange";
import handleItemSelect from "./utils/handleItemSelect";

interface TreeItemSelectHook
  extends Required<
      Pick<TreeBaseProps, "onItemSelect" | "onMultipleItemSelection">
    >,
    Pick<TreeIdsProps, "selectedIds"> {}

/**
 * A hook that implements the base functionality for selecting different
 * tree items.
 *
 * @param defaultSelectedIds - The default list of tree item ids that should
 * be expanded by default
 * @param multiSelect - Boolean if the tree can have multiple items selected
 * or not.
 */
export function useTreeItemSelect(
  defaultSelectedIds: string[] | (() => string[]),
  multiSelect: boolean = false
): TreeItemSelectHook {
  const [selectedIds, setSelectedIds] = useState(defaultSelectedIds);

  return {
    selectedIds,
    onItemSelect: itemId =>
      setSelectedIds(handleItemSelect(itemId, selectedIds, multiSelect)),
    onMultipleItemSelection: setSelectedIds,
  };
}

interface TreeItemExpansionHook
  extends Required<
      Pick<TreeBaseProps, "onItemExpandedChange" | "onMultipleItemExpansion">
    >,
    Pick<TreeIdsProps, "expandedIds"> {}

/**
 * A hook that implements the base functionality for epxnading different tree
 * items.
 */
export function useTreeItemExpansion(
  defaultExpandedIds: string[] | (() => string[])
): TreeItemExpansionHook {
  const [expandedIds, setExpandedIds] = useState(defaultExpandedIds);

  return {
    expandedIds,
    onItemExpandedChange: (itemId, expanded) =>
      setExpandedIds(handleItemExpandedChange(itemId, expanded, expandedIds)),
    onMultipleItemExpansion: setExpandedIds,
  };
}

export function useTreeMovement<D = AnyRecord>({
  selectedIds,
  expandedIds,
  data,
  onKeyDown,
  searchResetTime,
  disableGroupSelection,
  onItemSelect,
  onItemExpandedChange,
}: TreeProps<D>) {
  const [activeId, setActiveId] = useState(() => {
    if (selectedIds.length >= 1) {
      return selectedIds[0];
    } else if (data[0]) {
      return data[0].itemId;
    }

    return "";
  });

  const onKeyboardFocus: KeyboardFocusChangeEvent = (value, _event) => {
    setActiveId(value.element.id);
  };

  let { handlers } = useKeyboardFocusEventHandler<TreeElement>({
    onKeyboardFocus,
    handlers: {
      onClick: event => {
        if (!event.target) {
          return;
        }

        const element = event.target as HTMLElement;
        const item = findTreeItemFromElement(
          element,
          data,
          event.currentTarget
        );
        if (!item) {
          return;
        }

        const { itemId } = item;
        // make sure parent groups aren't opened or closed as well.
        event.stopPropagation();
        if (item.childItems) {
          const i = expandedIds.indexOf(itemId);
          onItemExpandedChange(itemId, i === -1);
        }

        // the event will not be trusted if it happens after the enter keypress. When
        // that happens, we only want the `onItemSelect` to be called when it is not already
        // selected as Enter will only select -- not toggle
        if (
          (!disableGroupSelection || !item.childItems) &&
          (event.isTrusted || !selectedIds.includes(itemId))
        ) {
          onItemSelect(itemId);
        }
      },
      onKeyDown: event => {
        if (onKeyDown) {
          onKeyDown(event);
        }

        const { key } = event;
        if (key === " " || key === "Enter") {
          const active = document.getElementById(activeId);
          if (active) {
            active.click();
          }
        }
      },
    },
  });

  ({ handlers } = useSearchEventHandler({
    handlers,
    onKeyboardFocus,
    searchResetTime,
  }));

  return {
    handlers,
    activeId,
    setActiveId,
  };
}

export function useFlattenedTree<D = AnyRecord>(
  data: FlattenedTree<D>,
  rootId: string | null,
  sort?: FlattenedTreeSort<D>
): FlattenedTreeDataList<D> {
  return useMemo(() => buildTree(rootId, Object.values(data), sort) || [], [
    data,
    rootId,
    sort,
  ]);
}
