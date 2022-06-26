import { cnb } from "cnbuilder";
import {
  ActiveDescendantMovementProvider,
  useActiveDescendantFocus,
  useEnsuredId,
  useIsomorphicLayoutEffect,
  useKeyboardFocusContext,
} from "@react-md/core";
import type { ReactElement, ReactNode } from "react";
import { useMemo, useRef } from "react";
import { TreeItem } from "./TreeItem";
import type { TreeItemNode, TreeRendererProps } from "./types";
import { useTreeItems } from "./useTreeItems";
import { getTreeItemId } from "./utils";
import { List } from "@react-md/list";

const identity = <T,>(items: T): T => items;

type ItemLookup = Map<
  string,
  Readonly<TreeItemNode & { isLeafNode: boolean; parentDomId: string }>
>;

export function TreeRenderer(props: TreeRendererProps): ReactElement {
  const {
    id: propId,
    data,
    sort = identity,
    rootId = null,
    treeRef,
    className,
    tabIndex = 0,
    multiSelect = false,
    selectedIds,
    onItemSelection,
    onMultiItemSelection: _onMultiItemSelection,
    expandedIds,
    onItemExpansion,
    onMultiItemExpansion: _onMultiItemExpansion,
    onFocus,
    onKeyDown,
    getTreeItemProps,
    expansionMode = "item",
    ...remaining
  } = props;

  const treeId = useEnsuredId(propId, "tree");
  const items = useTreeItems({ data, sort, rootId });
  const itemLookup = useRef<ItemLookup>();

  const children = useMemo(() => {
    const lookup: ItemLookup = new Map();
    const renderTreeItems = (
      items: readonly TreeItemNode[],
      depth: number,
      parentIndexes: readonly number[],
      parentDomId: string
    ): ReactNode => {
      const listSize = items.length;

      return items.map((item, index) => {
        const { itemId, childItems } = item;
        const id = getTreeItemId({ index, treeId, parentIndexes });
        const selected = selectedIds.has(itemId);
        const expanded = expandedIds.has(itemId);
        const isLeafNode = !childItems;

        lookup.set(id, { ...item, parentDomId, isLeafNode });

        let renderChildItems: (() => ReactNode) | undefined;
        if (childItems) {
          renderChildItems = () =>
            renderTreeItems(
              childItems,
              depth + 1,
              [...parentIndexes, index + 1],
              id
            );
        }

        return (
          <TreeItem
            {...getTreeItemProps({
              ...item,
              expanded,
              selected,
            })}
            id={id}
            key={itemId}
            depth={depth}
            listSize={listSize}
            itemIndex={index}
            selected={selected}
            expanded={expanded}
            isLeafNode={isLeafNode}
            onItemSelection={() => {
              onItemSelection(itemId);
            }}
            onItemExpansion={() => {
              onItemExpansion(itemId, !expanded);
            }}
            renderChildItems={renderChildItems}
          />
        );
      });
    };

    const result = renderTreeItems(items, 0, [], "");
    itemLookup.current = lookup;
    return result;
  }, [
    expandedIds,
    getTreeItemProps,
    items,
    onItemExpansion,
    onItemSelection,
    selectedIds,
    treeId,
  ]);
  const {
    providerProps,
    focusIndex: _focusIndex,
    ...containerProps
  } = useActiveDescendantFocus<HTMLUListElement>({
    onFocus(event) {
      onFocus?.(event);
      if (event.isPropagationStopped()) {
        return;
      }

      if (event.target !== event.currentTarget) {
        event.currentTarget.focus();
      }
    },
    onKeyDown(event) {
      onKeyDown?.(event);
      if (event.isPropagationStopped()) {
        return;
      }

      const { activeId, setActiveId } = providerProps;
      const item = itemLookup.current?.get(activeId);
      if (!item) {
        return;
      }
      const { itemId, parentDomId, isLeafNode } = item;

      let flagged = false;
      const expanded = expandedIds.has(itemId);
      switch (event.key) {
        case " ":
        case "Enter":
          flagged = true;
          onItemSelection(itemId);
          if (!isLeafNode && expansionMode !== "icon") {
            onItemExpansion(itemId, !expanded);
          }
          break;
        case "ArrowLeft":
          if (isLeafNode && parentDomId) {
            flagged = true;
            setActiveId(parentDomId);
          } else if (!isLeafNode) {
            flagged = true;
            onItemExpansion(itemId, false);
          }
          break;
        case "ArrowRight":
          if (expanded) {
            setActiveId((activeId) => `${activeId}-1`);
          } else if (!isLeafNode) {
            onItemExpansion(itemId, true);
          }
          flagged = true;
          break;
      }

      if (flagged) {
        event.preventDefault();
        event.stopPropagation();
      }

      // if (event.key === "Enter" || event.key === " ") {
      //   if (event.key === " ") {
      //     event.preventDefault();
      //   }

      //   event.stopPropagation();
      //   onItemSelection(itemId);
      //   if (!isLeafNode) {
      //     // onItemExpansion(itemId, !expanded);
      //   }
      // } else if (event.key === "ArrowLeft") {
      //   if (isLeafNode && parentId) {
      //     const id = activeId.substring(0, activeId.lastIndexOf("-"));
      //     setActiveId(id);
      //   } else if (!isLeafNode) {
      //     onItemExpansion(itemId, false);
      //   }
      // } else if (event.key === "ArrowRight") {
      //   if (expanded) {
      //     setActiveId(`${activeId}-1`);
      //   } else if (!isLeafNode) {
      //     onItemExpansion(itemId, true);
      //   }
      // }

      // if (!multiSelect) {
      //   return;
      // }
    },
  });

  const { watching } = useKeyboardFocusContext();
  // NOTE: Might not work for reordering yet
  // NOTE: Maybe only do on keyboard?
  useIsomorphicLayoutEffect(() => {
    // need to use raf because of the collapse transition
    const frame = window.requestAnimationFrame(() => {
      const compare = new Intl.Collator(undefined, { numeric: true }).compare;
      watching.current.sort((a, b) => compare(a.element.id, b.element.id));
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [expandedIds]);

  return (
    <ActiveDescendantMovementProvider {...providerProps}>
      <List
        {...remaining}
        {...containerProps}
        id={treeId}
        ref={treeRef}
        role="tree"
        className={cnb("rmd-tree", className)}
        tabIndex={tabIndex}
      >
        {children}
      </List>
    </ActiveDescendantMovementProvider>
  );
}
