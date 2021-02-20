import {
  FocusEventHandler,
  KeyboardEventHandler,
  useCallback,
  useRef,
} from "react";
import { ListElement } from "@react-md/list";
import {
  JumpMovementKey,
  MovementPresets,
  scrollIntoView,
  useActiveDescendantMovement,
  useIsUserInteractionMode,
} from "@react-md/utils";

import { TreeItemId, TreeProps, UnknownTreeItem } from "./types";
import {
  MetadataRecord,
  SearchableTreeItem,
  useFlattenedTreeList,
} from "./useFlattenedTreeList";
import { NestedTreeItem, useNestedTreeList } from "./useNestedTreeList";

type Options = Pick<
  TreeProps<UnknownTreeItem>,
  | "id"
  | "data"
  | "sort"
  | "onBlur"
  | "onFocus"
  | "onKeyDown"
  | "multiSelect"
  | "selectedIds"
  | "onItemSelect"
  | "onMultiItemSelect"
  | "expandedIds"
  | "onItemExpansion"
  | "onMultiItemExpansion"
> &
  Required<
    Pick<TreeProps<UnknownTreeItem>, "valueKey" | "getItemValue" | "rootId">
  >;

interface ReturnValue {
  /**
   * A nested list representation of the provided tree data. This is used for
   * rendering all the treeitem nodes.
   */
  items: readonly NestedTreeItem<UnknownTreeItem>[];

  /**
   * The current treeitem's DOM id that is currently keyboard focused.
   */
  activeId: string;

  /**
   * A function that updates the `activeId` based on the provided `itemId`. This
   * should really only be used whenever an item is clicked with a mouse or
   * touch since the `activeId` will be updated automatically for all the other
   * flows.
   */
  setActiveId(itemId: TreeItemId): void;

  /**
   * A record containing the DOM ids for each tree item along with a ref object
   * to provide to the itemRenderer for that item. This is just for a quick
   * lookup to help with all the tree traversal and keyboard movement.
   */
  itemIdRefs: MetadataRecord;

  /**
   * A blur handler that should be passed to the tree list element that handles
   * removing the `aria-activedescendant` when the tree is no longer within
   * focus. This will also call the optional `onBlur` prop.
   */
  handleBlur: FocusEventHandler<ListElement>;

  /**
   * A focus handler that should be passed to the tree element that handles
   * conditionally setting the default `aria-activedescendant` id on first
   * focus. This will also call the optional `onFocus` prop.
   */
  handleFocus: FocusEventHandler<ListElement>;

  /**
   * The keydown handler that should be passed to the tree list element that
   * handles all the keyboard functionality and movement.
   *
   * This will also call the optional `onKeyDown` prop.
   */
  handleKeyDown: KeyboardEventHandler<ListElement>;
}

/**
 * This is a temporary workaround for allowing the navigation tree to scroll
 * correctly with keyboard movement since it manually sets the
 * `overflow: visible` which prevents scrolling. I'll need to think of a better
 * way to find/get the scrollable element (if any). It might also just go into
 * the `scrollIntoView` util.
 *
 * @remarks \@since 2.5.3
 * @internal
 */
const getScrollContainer = (target: HTMLElement): HTMLElement | null => {
  if (target.classList.contains("rmd-layout-tree")) {
    return target.parentElement;
  }

  return target;
};

/**
 * This hook handles all the complex and "fun" stuff for selecting keyboard
 * accessibility within a tree and enabling keyboard movement, selection, and
 * expansion.
 *
 * @internal
 */
export function useTreeMovement({
  id,
  data,
  rootId,
  sort,
  onBlur,
  onFocus,
  onKeyDown,
  multiSelect,
  selectedIds,
  onItemSelect,
  onMultiItemSelect,
  expandedIds,
  onItemExpansion,
  onMultiItemExpansion,
  valueKey,
  getItemValue,
}: Options): ReturnValue {
  const items = useNestedTreeList(data, sort, rootId);
  const [visibleItems, itemIdRefs, flattenedItems] = useFlattenedTreeList({
    id,
    items,
    expandedIds,
    rootId,
    valueKey,
    getItemValue,
  });

  const isKeyboard = useIsUserInteractionMode("keyboard");

  const {
    activeId,
    onKeyDown: handleKeyDown,
    focusedIndex,
    setFocusedIndex,
  } = useActiveDescendantMovement<
    SearchableTreeItem,
    ListElement,
    HTMLLIElement
  >({
    ...MovementPresets.VERTICAL_TREE,
    items: visibleItems,
    baseId: id,
    getId(_baseId, index) {
      return (visibleItems[index] || { id: "" }).id;
    },
    onSpace(focusedIndex) {
      const item = visibleItems[focusedIndex];
      if (!item) {
        return;
      }

      const { itemId } = item;
      onItemSelect(itemId);
    },
    onChange(data) {
      const { index, target, query } = data;
      const { itemId } = visibleItems[index];
      // Note: have to do a custom `scrollIntoView` here instead of relying on
      // the `useActiveDescendantMovement`'s `scrollIntoView` because of how the
      // tree renders with the ref behavior.
      const item = itemIdRefs[itemId].ref.current;
      const container = getScrollContainer(target);
      if (
        item &&
        container &&
        container.scrollHeight > container.offsetHeight
      ) {
        scrollIntoView(container, item);
      }

      if (!multiSelect) {
        return;
      }

      const isToStart = query.endsWith(JumpMovementKey.ControlShiftHome);
      const isToEnd = query.endsWith(JumpMovementKey.ControlShiftEnd);
      if (!isToStart && !isToEnd) {
        return;
      }

      const start = isToStart ? 0 : focusedIndex;
      const end = isToStart ? focusedIndex + 1 : undefined;
      const jumpSelectedIds = visibleItems
        .slice(start, end)
        .map(({ itemId }) => itemId);
      const uniqueSelectedIds = Array.from(
        new Set([...selectedIds, ...jumpSelectedIds])
      );
      if (selectedIds.length !== uniqueSelectedIds.length) {
        onMultiItemSelect(uniqueSelectedIds);
      }
    },
    onKeyDown(event) {
      if (onKeyDown) {
        onKeyDown(event);
      }

      const item = visibleItems[focusedIndex];
      if (!item) {
        return;
      }

      const { itemId, parentId, isParent } = item;
      switch (event.key) {
        case "Enter": {
          if (isParent) {
            onItemExpansion(itemId, !expandedIds.includes(itemId));
            return;
          }

          const node = itemIdRefs[itemId].ref.current;
          const anchor =
            node &&
            node.getAttribute("role") === "none" &&
            node.querySelector<HTMLAnchorElement>("a[href]");
          if (!anchor) {
            onItemSelect(itemId);
            return;
          }

          // if a user is navigating through the app with a keyboard and presses
          // cmd+shift+enter (Mac) or ctrl+shift+enter (Windows), the link will
          // be forcefully opened in a new tab irregardless of the target
          // attribute on the anchor tag. Since a tree doesn't actually focus
          // the link in this case, need to "polyfill" it with this workaround.
          // the `meta` key is for Mac and `ctrlKey` for Windows
          const forceNewTab =
            event.shiftKey && (event.metaKey || event.ctrlKey);

          const prevTarget = anchor.target;
          if (forceNewTab) {
            anchor.target = "_blank";
          }
          anchor.click();
          if (forceNewTab) {
            anchor.target = prevTarget;
          }

          break;
        }
        case "ArrowRight":
          if (!isParent) {
            return;
          }

          if (!expandedIds.includes(itemId)) {
            onItemExpansion(itemId, true);
          } else {
            const nextIndex = focusedIndex + 1;
            const nextItem =
              itemIdRefs[visibleItems[nextIndex]?.itemId]?.ref.current;

            setFocusedIndex(nextIndex);
            scrollIntoView(event.currentTarget, nextItem);
          }
          break;
        case "ArrowLeft":
          if (isParent && expandedIds.includes(itemId)) {
            onItemExpansion(itemId, false);
          } else if (parentId !== rootId) {
            const parentIndex = visibleItems.findIndex(
              (item) => item.itemId === parentId
            );
            const parentItem =
              itemIdRefs[visibleItems[parentIndex]?.itemId]?.ref.current;

            setFocusedIndex(parentIndex);
            scrollIntoView(event.currentTarget, parentItem);
          }
          break;
        case "a": {
          if (!multiSelect || !event.ctrlKey) {
            return;
          }

          event.preventDefault();
          const allItemIds = visibleItems.map(({ itemId }) => itemId);
          if (selectedIds.length === allItemIds.length) {
            onMultiItemSelect([]);
          } else {
            onMultiItemSelect(allItemIds);
          }
          break;
        }
        case "*": {
          const item = visibleItems[focusedIndex];
          if (!item) {
            return;
          }

          const expectedExpandedIds = visibleItems
            .filter(
              ({ isParent, parentId }) => isParent && parentId === item.parentId
            )
            .map(({ itemId }) => itemId);
          const nextIds = Array.from(
            new Set([...expandedIds, ...expectedExpandedIds])
          );
          if (nextIds.length !== expandedIds.length) {
            onMultiItemExpansion(nextIds);

            // since new items will be rendered, need to also update the focused
            // index so the currently active item is still the "focused" item
            //
            // TODO: Look into a much better way to handle this sort of stuff..
            // This still doesn't correctly scroll the active element into view.
            // I should probably move all the scroll behavior into a useEffect
            // for whenever the focusedIndex changes.
            let visibleCount = 0;
            const lookup: Record<TreeItemId, boolean> = {};
            for (let i = 0; i < flattenedItems.length; i += 1) {
              const item = flattenedItems[i];
              let isVisible = item.parentId === rootId;
              if (item.parentId !== null && nextIds.includes(item.parentId)) {
                isVisible = !!lookup[item.parentId];
              }

              lookup[item.itemId] = isVisible;

              if (itemId === item.itemId) {
                setFocusedIndex(visibleCount);
                return;
              }

              if (isVisible) {
                visibleCount += 1;
              }
            }
          }
        }
        // no default
      }
    },
  });

  const lastFocus = useRef(0);
  const handleBlur = useCallback(
    (event: React.FocusEvent<ListElement>) => {
      if (onBlur) {
        onBlur(event);
      }

      if (
        document.activeElement &&
        event.currentTarget.contains(document.activeElement)
      ) {
        return;
      }

      lastFocus.current = focusedIndex;
      setFocusedIndex(-1);
    },
    [focusedIndex, onBlur, setFocusedIndex]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<ListElement>) => {
      if (onFocus) {
        onFocus(event);
      }

      if (focusedIndex !== -1) {
        // this happens when a tree item is clicked with the mouse or touch
        return;
      }

      let index = -1;
      // try to "focus" the first selected itemId if there is a selection.
      if (selectedIds.length) {
        index = visibleItems.findIndex((item) =>
          selectedIds.includes(item.itemId)
        );
      }

      // fallback to the first visible tree item if there were no selected ids
      if (index === -1) {
        index = Math.max(0, Math.min(lastFocus.current, visibleItems.length));
      }

      const currentItem = itemIdRefs[visibleItems[index]?.itemId]?.ref.current;
      if (currentItem && isKeyboard) {
        scrollIntoView(getScrollContainer(event.currentTarget), currentItem);
      }
      setFocusedIndex(index);
    },
    [
      focusedIndex,
      isKeyboard,
      itemIdRefs,
      onFocus,
      selectedIds,
      setFocusedIndex,
      visibleItems,
    ]
  );

  const setActiveId = useCallback(
    (itemId: TreeItemId) => {
      const index = visibleItems.findIndex((item) => item.itemId === itemId);
      if (index !== -1) {
        setFocusedIndex(index);
      }
    },
    [setFocusedIndex, visibleItems]
  );

  return {
    items,
    activeId,
    setActiveId,
    itemIdRefs,
    handleBlur,
    handleFocus,
    handleKeyDown,
  };
}
