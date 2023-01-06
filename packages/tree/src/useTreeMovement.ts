import type {
  KeyboardMovementProviderImplementation,
  NonNullMutableRef,
} from "@react-md/core";
import {
  getNextFocusableIndex,
  useKeyboardMovementProvider,
} from "@react-md/core";
import type {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import { useRef } from "react";
import type { TreeItemMetadataLookup } from "./TreeProvider";
import type { TreeData, TreeItemNode } from "./types";
import type { TreeExpansion } from "./useTreeExpansion";
import type { RenderedTreeItemsMetadata } from "./useTreeItems";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
const getTreeItemsOnly = (container: HTMLElement): readonly HTMLElement[] => {
  const items = [
    ...container.querySelectorAll<HTMLElement>('[role="treeitem"]'),
  ];

  return items.filter(
    (item) =>
      // do not include items that have a `hidden` parent group
      item.offsetParent &&
      // this is a super edge case, but make sure that tree items that are
      // currently in the collapse animation are not included as well
      item
        .closest("[role='group']")
        ?.previousElementSibling?.closest("[role='treeitem']")
        ?.getAttribute("aria-expanded") !== "false"
  );
};

/**
 * @remarks \@since 6.0.0
 * @internal
 */
interface TreeMovementOptions<T extends TreeItemNode> extends TreeExpansion {
  data: TreeData<T>;
  metadata: RenderedTreeItemsMetadata;
  onClick: MouseEventHandler<HTMLUListElement> | undefined;
  onFocus: FocusEventHandler<HTMLUListElement> | undefined;
  onKeyDown: KeyboardEventHandler<HTMLUListElement> | undefined;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
interface TreeMovement
  extends KeyboardMovementProviderImplementation<HTMLUListElement> {
  metadataLookup: NonNullMutableRef<TreeItemMetadataLookup>;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export function useTreeMovement<T extends TreeItemNode>(
  options: TreeMovementOptions<T>
): TreeMovement {
  const {
    onClick,
    onFocus,
    onKeyDown,
    data,
    metadata,
    expandedIds,
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

      if (!item) {
        return;
      }

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
            const focusables = getTreeItemsOnly(event.currentTarget);
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
              const focusables = getTreeItemsOnly(event.currentTarget);
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
          const itemIds = metadata.get(item.parentId);
          if (itemIds) {
            expandMultipleTreeItems((prev) => new Set([...prev, ...itemIds]));
            currentFocusIndex.current = -1;
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
    getFocusableElements: getTreeItemsOnly,
  });

  return {
    metadataLookup,
    ...movement,
  };
}
