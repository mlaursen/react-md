import { identity, useEnsuredId } from "@react-md/core";
import { LinkProvider } from "@react-md/link";
import { List } from "@react-md/list";
import type { MutableRefObject, ReactElement, ReactNode } from "react";
import { createRef, useMemo } from "react";

import { DefaultTreeItemRenderer } from "./DefaultTreeItemRenderer";
import { tree } from "./styles";
import { TreeProvider } from "./TreeProvider";
import type {
  CurrentTreeItem,
  RenderableTreeItemNode,
  TreeItemNode,
  TreeProps,
} from "./types";
import { useTreeA11y } from "./useTreeA11y";
import { useTreeItems } from "./useTreeItems";
import { getTreeItemId } from "./utils";

const noop = (): undefined => undefined;
const alwaysTrue = (): true => true;
type CSSProperties = React.CSSProperties & {
  "--rmd-tree-depth": number;
};

export function Tree<T extends TreeItemNode>(
  props: TreeProps<T>
): ReactElement {
  const {
    id,
    data,
    sort = identity,
    rootId = null,
    treeRef,
    className,
    expandedIds,
    selectedIds,
    onItemExpansion,
    onItemSelection,
    onMultiItemExpansion,
    onMultiItemSelection,
    onBlur,
    onFocus,
    onKeyDown,
    renderer: TreeItemRenderer = DefaultTreeItemRenderer,
    multiSelect = false,
    expansionMode = "auto",
    expanderIcon,
    expanderLeft = false,
    isTreeItem = alwaysTrue,
    linkComponent,
    getTreeItemProps = noop,
    disableTransition = false,
    ...remaining
  } = props;

  const treeId = useEnsuredId(id, "tree");
  const {
    treeProps,
    activeIndex,
    visibleItems,
    isTreeFocused,
    visibleIndexLookup,
    itemIdsAtDepth,
  } = useTreeA11y({
    onBlur,
    onFocus,
    onKeyDown,
    expandedIds,
    selectedIds,
    onItemExpansion,
    onMultiItemSelection,
    onMultiItemExpansion,
  });

  const items = useTreeItems({ data, sort, rootId });

  const children = useMemo(() => {
    // the visibleItems need to be rebuilt each time the `renderTreeItems` is
    // triggered to get the correct order.
    visibleItems.current = [];
    visibleIndexLookup.current = new Map();
    itemIdsAtDepth.current = new Map();

    interface RenderOptions {
      items: readonly RenderableTreeItemNode<T>[];
      depth: number;
      parentIndexes: readonly number[];
      parentExpanded: boolean;
      parentVisibleIndex: number;
    }

    const renderTreeItems = (options: RenderOptions): ReactNode => {
      const {
        items,
        depth,
        parentIndexes,
        parentExpanded,
        parentVisibleIndex,
      } = options;

      return items.map((item, index) => {
        const { itemId, childItems } = item;
        const id = getTreeItemId({ treeId, index, parentIndexes });
        const visibleIndex = visibleItems.current.length;
        const itemRef: MutableRefObject<HTMLSpanElement | null> = createRef();
        const focused = isTreeFocused && activeIndex === visibleIndex;
        const selected = selectedIds.has(itemId);
        const expanded = expandedIds.has(itemId);
        const isLeafNode = !childItems;

        const itemIds = itemIdsAtDepth.current.get(depth) ?? [];
        itemIds.push(itemId);
        itemIdsAtDepth.current.set(depth, itemIds);

        const current: CurrentTreeItem<T> = {
          item,
          depth,
          focused,
          expanded,
          selected,
          isLeafNode,
        };

        if (parentExpanded && isTreeItem(item)) {
          visibleIndexLookup.current.set(itemId, visibleIndex);
          visibleItems.current.push({
            ...item,
            id,
            depth,
            expanded,
            disabled: getTreeItemProps(current)?.disabled || false,
            itemRef,
            parentVisibleIndex,
          });
        }

        let children: ReactNode;
        if (childItems && parentExpanded) {
          // the child items need to be rendered **before** rendering the other
          // items at the current depth so the `visibleItems` are ordered
          // correctly. This is why the child items are not rendered until they
          // are expanded as well.
          children = renderTreeItems({
            items: childItems,
            depth: depth + 1,
            parentIndexes: [...parentIndexes, index + 1],
            parentExpanded: expanded,
            parentVisibleIndex: visibleIndex,
          });
        }

        return (
          <TreeItemRenderer
            {...current}
            key={itemId}
            id={id}
            childItems={children}
            contentRef={itemRef}
            getTreeItemProps={getTreeItemProps}
          />
        );
      });
    };

    return renderTreeItems({
      items,
      depth: 0,
      parentIndexes: [],
      parentExpanded: true,
      parentVisibleIndex: -1,
    });
  }, [
    TreeItemRenderer,
    activeIndex,
    expandedIds,
    getTreeItemProps,
    isTreeFocused,
    isTreeItem,
    itemIdsAtDepth,
    items,
    selectedIds,
    treeId,
    visibleIndexLookup,
    visibleItems,
  ]);

  const style: CSSProperties = {
    ...remaining.style,
    "--rmd-tree-depth": -1,
  };

  return (
    <TreeProvider
      data={data}
      rootId={rootId}
      multiSelect={multiSelect}
      expanderIcon={expanderIcon}
      expanderLeft={expanderLeft}
      expansionMode={expansionMode}
      onItemExpansion={onItemExpansion}
      onItemSelection={onItemSelection}
      disableTransition={disableTransition}
      onMultiItemExpansion={onMultiItemExpansion}
      onMultiItemSelection={onMultiItemSelection}
    >
      <LinkProvider link={linkComponent}>
        <List
          {...remaining}
          {...treeProps}
          style={style}
          aria-activedescendant={visibleItems.current[activeIndex]?.id}
          aria-multiselectable={multiSelect || undefined}
          id={treeId}
          ref={treeRef}
          role="tree"
          tabIndex={0}
          className={tree({ className })}
        >
          {children}
        </List>
      </LinkProvider>
    </TreeProvider>
  );
}
