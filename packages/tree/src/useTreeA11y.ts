import {
  findMatchIndex,
  getSearchText,
  useIsomorphicLayoutEffect,
  useUserInteractionMode,
} from "@react-md/core";
import type {
  Dispatch,
  FocusEvent,
  FocusEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  MutableRefObject,
  RefObject,
  SetStateAction,
} from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  RenderableTreeItemNode,
  TreeExpansion,
  TreeSelection,
} from "./types";

/** @internal */
const EMPTY_DEPTH_LOOKUP = new Map<number, string[]>();
const EMPTY_ID_LOOKUP = new Map<string, number>();

/** @internal */
interface VisibleTreeItem extends RenderableTreeItemNode {
  id: string;
  depth: number;
  disabled: boolean;
  expanded: boolean;
  itemRef: RefObject<HTMLElement>;
  parentVisibleIndex: number;
}

/** @internal */
interface TreeA11yOptions
  extends TreeExpansion,
    Omit<TreeSelection, "multiSelect" | "onItemSelection"> {
  onBlur?: FocusEventHandler<HTMLUListElement>;
  onFocus?: FocusEventHandler<HTMLUListElement>;
  onKeyDown?: KeyboardEventHandler<HTMLUListElement>;
}

/** @internal */
interface ReturnValue {
  treeProps: {
    onBlur: FocusEventHandler<HTMLUListElement>;
    onFocus: FocusEventHandler<HTMLUListElement>;
    onKeyDown: KeyboardEventHandler<HTMLUListElement>;
  };
  activeIndex: number;
  visibleItems: MutableRefObject<VisibleTreeItem[]>;
  isTreeFocused: boolean;
  visibleIndexLookup: MutableRefObject<Map<string, number>>;
  /**
   * This is a map of `depth -> [...itemIds]`
   */
  itemIdsAtDepth: MutableRefObject<Map<number, string[]>>;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

/** @internal */
export function useTreeA11y(options: TreeA11yOptions): ReturnValue {
  const {
    onBlur,
    onFocus,
    onKeyDown,
    selectedIds,
    expandedIds,
    onItemExpansion,
    onMultiItemSelection: _onMultiItemSelection,
    onMultiItemExpansion,
  } = options;

  const blurRaf = useRef(0);
  const visibleItems = useRef<VisibleTreeItem[]>([]);
  const itemIdsAtDepth = useRef(EMPTY_DEPTH_LOOKUP);
  const visibleIndexLookup = useRef(EMPTY_ID_LOOKUP);
  const prevExpandedIds = useRef(expandedIds);
  const prevSelectedIds = useRef(selectedIds);

  const mode = useUserInteractionMode();
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const isTreeFocused = mode === "keyboard" && focused;

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLUListElement>) => {
      onBlur?.(event);
      if (event.isPropagationStopped()) {
        return;
      }

      blurRaf.current = window.requestAnimationFrame(() => {
        setFocused(false);
      });
    },
    [onBlur]
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLUListElement>) => {
      onFocus?.(event);
      if (event.isPropagationStopped()) {
        return;
      }

      setFocused(true);
      window.cancelAnimationFrame(blurRaf.current);

      if (event.currentTarget !== event.target) {
        event.currentTarget.focus();
        return;
      }

      const isExpandedChange =
        expandedIds !== prevExpandedIds.current &&
        expandedIds.size < prevExpandedIds.current.size;
      prevExpandedIds.current = expandedIds;

      setActiveIndex((prevActiveIndex) => {
        if (isExpandedChange || prevActiveIndex === -1) {
          return Math.max(
            0,
            visibleItems.current.findIndex((item) =>
              selectedIds.has(item.itemId)
            )
          );
        }

        if (prevActiveIndex !== -1) {
          return prevActiveIndex;
        }

        return 0;
      });
    },
    [expandedIds, onFocus, selectedIds]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLUListElement>) => {
      onKeyDown?.(event);
      if (event.isPropagationStopped()) {
        return;
      }

      const currentItem = visibleItems.current[activeIndex];
      if (!currentItem) {
        return;
      }

      const lastIndex = visibleItems.current.length - 1;
      const {
        depth,
        itemId,
        disabled,
        expanded,
        childItems,
        itemRef,
        parentVisibleIndex,
      } = currentItem;

      const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
      let flagged = false;
      switch (key) {
        case " ":
          flagged = true;
          if (!disabled) {
            itemRef.current?.click();
          }
          break;
        case "Enter":
          flagged = true;
          if (!disabled) {
            itemRef.current?.click();
          }

          break;
        case "ArrowDown":
          setActiveIndex((prevIndex) => Math.min(lastIndex, prevIndex + 1));
          flagged = true;
          break;
        case "ArrowUp":
          setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1));
          flagged = true;
          break;
        case "ArrowLeft":
          if (!disabled && expanded) {
            onItemExpansion(itemId, false);
          } else if (parentVisibleIndex !== -1) {
            setActiveIndex(parentVisibleIndex);
          }

          flagged = true;
          break;
        case "ArrowRight":
          if (childItems && !disabled) {
            if (!expanded) {
              onItemExpansion(itemId, true);
            } else {
              setActiveIndex(activeIndex + 1);
            }
          }

          flagged = true;
          break;
        case "Home":
          setActiveIndex(0);
          flagged = true;
          break;
        case "End":
          flagged = true;
          setActiveIndex(lastIndex);
          break;
        case "*": {
          flagged = true;
          const ids = itemIdsAtDepth.current.get(depth);
          if (ids) {
            onMultiItemExpansion((prev) => new Set([...prev, ...ids]));
          }

          break;
        }
        default: {
          if (key.length !== 1 || altKey || ctrlKey || metaKey || shiftKey) {
            return;
          }

          flagged = true;

          // TODO: I might need to cache this if there are 1000+ visible items
          const values = visibleItems.current.map((item) => {
            const element = item.itemRef.current;
            return element ? getSearchText(element, true) : "";
          });

          setActiveIndex((prevActiveIndex) => {
            const index = findMatchIndex({
              value: key,
              values,
              startIndex: prevActiveIndex,
              isSelfMatchable: true,
            });

            return index === -1 ? prevActiveIndex : index;
          });
        }
      }

      if (flagged) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [activeIndex, onItemExpansion, onKeyDown, onMultiItemExpansion]
  );

  useEffect(() => {
    const isSelectedChange =
      selectedIds !== prevSelectedIds.current &&
      (selectedIds.size === 1 ||
        selectedIds.size > prevSelectedIds.current.size);
    prevSelectedIds.current = selectedIds;

    if (!isSelectedChange) {
      return;
    }

    const list = [...selectedIds];
    const last = list[list.length - 1];
    const visibleIndex = visibleIndexLookup.current.get(last);
    if (typeof visibleIndex === "number") {
      setActiveIndex(visibleIndex);
    }
  }, [mode, selectedIds]);

  useIsomorphicLayoutEffect(() => {
    if (mode !== "keyboard") {
      return;
    }

    visibleItems.current[activeIndex]?.itemRef.current?.scrollIntoView(false);
  }, [mode, activeIndex]);

  return {
    treeProps: {
      onBlur: handleBlur,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
    },
    activeIndex,
    setActiveIndex,
    visibleItems,
    isTreeFocused,
    visibleIndexLookup,
    itemIdsAtDepth,
  };
}
