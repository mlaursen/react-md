"use client";

import type {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  Ref,
} from "react";
import { useRef } from "react";

import type { KeyboardMovementProviderImplementation } from "../movement/types.js";
import { useKeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { getNextFocusableIndex } from "../movement/utils.js";
import type { NonNullMutableRef } from "../types.js";
import type { TreeItemMetadataLookup } from "./TreeProvider.js";
import type { TreeData, TreeItemNode } from "./types.js";
import type { TreeExpansion } from "./useTreeExpansion.js";
import type { TreeItemChildIds } from "./useTreeItems.js";

/**
 * This helps catch the edge case where the collapse transition has occurred for
 * a tree item group, but the user uses the `ArrowDown` key before it has
 * finished. So to do this:
 *
 * - find the parent group of the tree item
 * - find the tree item that controls the group (the element before the group)
 * - check if the `aria-expanded` state is `"false"` meaning it is considered
 *   closed
 *
 * @internal
 * @since 6.0.0
 */
const isParentItemCollapsing = (item: HTMLElement): boolean =>
  item
    .closest("[role='group']")
    ?.previousElementSibling?.getAttribute("aria-expanded") === "false";

/**
 * @since 6.0.0
 * @internal
 */
const getVisibleTreeItems = (
  container: HTMLElement
): readonly HTMLElement[] => {
  const items = [
    ...container.querySelectorAll<HTMLElement>('[role="treeitem"]'),
  ];

  return items.filter(
    (item) =>
      // do not include items that have a `hidden` parent group
      item.offsetParent &&
      // do not include items that are about to become hidden
      !isParentItemCollapsing(item)
  );
};

/**
 * @since 6.0.0
 * @internal
 */
interface TreeMovementOptions<T extends TreeItemNode> extends TreeExpansion {
  ref?: Ref<HTMLUListElement>;
  data: TreeData<T>;
  onClick: MouseEventHandler<HTMLUListElement> | undefined;
  onFocus: FocusEventHandler<HTMLUListElement> | undefined;
  onKeyDown: KeyboardEventHandler<HTMLUListElement> | undefined;
  selectedIds: ReadonlySet<string>;
  treeItemChildIds: TreeItemChildIds;
}

/**
 * @since 6.0.0
 * @internal
 */
interface TreeMovement extends KeyboardMovementProviderImplementation<HTMLUListElement> {
  /**
   * This will be mutated by the `TreeItem` component and used to handle
   * keyboard movement.
   */
  metadataLookup: NonNullMutableRef<TreeItemMetadataLookup>;
}

/**
 * @since 6.0.0
 * @internal
 */
export function useTreeMovement<T extends TreeItemNode>(
  options: TreeMovementOptions<T>
): TreeMovement {
  const {
    ref,
    onClick,
    onFocus,
    onKeyDown,
    data,
    expandedIds,
    selectedIds,
    treeItemChildIds,
    toggleTreeItemExpansion,
    expandMultipleTreeItems,
  } = options;

  const metadataLookup = useRef<TreeItemMetadataLookup>({
    expandable: {},
    disabledItems: {},
    elementToItem: {},
    itemToElement: {},
  });
  const movement = useKeyboardMovementProvider({
    ref,
    onClick,
    onFocus,
    onKeyDown,
    extendKeyDown(movementData) {
      const { event, activeDescendantId, currentFocusIndex, setFocusIndex } =
        movementData;
      const { expandable, disabledItems, elementToItem, itemToElement } =
        metadataLookup.current;
      const itemId = elementToItem[activeDescendantId];
      const item = data[itemId];

      /* c8 ignore start */
      if (!item) {
        return;
      }
      /* c8 ignore stop */

      const disabled = disabledItems[itemId];
      const expanded = expandedIds.has(itemId);

      let flagged = false;
      switch (event.key) {
        case "ArrowLeft":
          if (expanded && !disabled) {
            flagged = true;
            toggleTreeItemExpansion(itemId);
          } else if (item.parentId) {
            // do not flag for this case since setFocusIndex already does this
            const parentId = itemToElement[item.parentId];
            const focusables = getVisibleTreeItems(event.currentTarget);
            const index = focusables.findIndex(
              (element) => element.id === parentId
            );
            setFocusIndex(index, focusables);
          }

          break;
        case "ArrowRight":
          if (expandable[itemId] && !disabled) {
            if (!expanded) {
              flagged = true;
              toggleTreeItemExpansion(itemId);
            } else {
              // do not flag for this case since setFocusIndex already does this
              const focusables = getVisibleTreeItems(event.currentTarget);
              const index = getNextFocusableIndex({
                loopable: false,
                increment: true,
                focusables,
                includeDisabled: true,
                currentFocusIndex: currentFocusIndex.current,
              });

              setFocusIndex(index, focusables);
            }
          }

          break;
        case "*": {
          flagged = true;
          const itemIds = treeItemChildIds.get(item.parentId);
          if (itemIds) {
            const expandableIds = [...itemIds].filter(
              (itemId) => expandable[itemId]
            );
            if (expandableIds.length > 0) {
              expandMultipleTreeItems(
                (prev) => new Set([...prev, ...expandableIds])
              );
              currentFocusIndex.current = -1;
            }
          }
          break;
        }
      }

      if (flagged) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    searchable: true,
    tabIndexBehavior: "virtual",
    getFocusableElements: getVisibleTreeItems,
    getDefaultFocusedIndex(options) {
      const { focusables } = options;
      const { elementToItem } = metadataLookup.current;

      return focusables.findIndex((element) =>
        selectedIds.has(elementToItem[element.id])
      );
    },
  });

  return {
    metadataLookup,
    ...movement,
  };
}
