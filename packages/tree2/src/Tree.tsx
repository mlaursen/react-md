import { FontIcon } from "@react-md/icon";
import { List, ListElement } from "@react-md/list";
import { bem, WithForwardedRef } from "@react-md/utils";
import cn from "classnames";
import React, { FC, forwardRef, MutableRefObject, ReactNode } from "react";

import defaultGetItemLabel from "./defaultGetItemLabel";
import defaultGetItemValue from "./defaultGetItemValue";
import defaultItemRenderer from "./defaultItemRenderer";
import getTreeItemId from "./getTreeItemId";
import { ProvidedTreeProps, TreeProps, UnknownTreeItem } from "./types";
import useNestedTreeList, { NestedTreeItem } from "./useNestedTreeList";

type WithRef = WithForwardedRef<ListElement>;
type DefaultProps = ProvidedTreeProps;
type WithDefaultProps = TreeProps & DefaultProps & WithRef;

const block = bem("rmd-tree");

const Tree: FC<TreeProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    itemRenderer,
    data,
    multiSelect,
    selectedIds,
    onItemSelect,
    onMultiItemSelect,
    expandedIds,
    onItemExpansion,
    onMultiItemExpansion,
    expanderLeft,
    expanderIcon,
    labelKey,
    valueKey,
    getItemLabel,
    getItemValue,
    getItemProps,
    sort,
    rootId,
    ...props
  } = providedProps as WithDefaultProps;
  const { id } = props;

  const treeItems = useNestedTreeList(data, sort, rootId);
  const activeId = "";

  const renderChildItems = (
    items: NestedTreeItem<UnknownTreeItem>[],
    depth: number,
    parentIndexes: number[] = []
  ): ReactNode => {
    const listSize = items.length;

    return items.map((item, index) => {
      const { itemId, childItems } = item;
      const treeItemId = getTreeItemId(id, index, parentIndexes);
      const selected = selectedIds.includes(itemId);
      const expanded = expandedIds.includes(itemId);
      const focused = treeItemId === activeId;

      // TODO: Update with itemRefs from useActiveDescendantMovement
      const ref: MutableRefObject<HTMLLIElement | null> = { current: null };

      return itemRenderer(
        {
          key: itemId,
          id: treeItemId,
          ref,
          depth,
          listSize,
          itemIndex: index,
          selected,
          expanded,
          focused,
          onClick() {
            // setFocusedIndex(visibleIndex);
            onItemSelect(itemId);
            if (childItems) {
              onItemExpansion(itemId, !expanded);
            }
          },
          renderChildItems: childItems
            ? () =>
                renderChildItems(childItems, depth + 1, [
                  ...parentIndexes,
                  index,
                ])
            : undefined,
        },
        item,
        providedProps as WithDefaultProps
      );
    });
  };

  return (
    <List
      {...props}
      aria-activedescendant={activeId}
      aria-multiselectable={multiSelect || undefined}
      tabIndex={0}
      role="tree"
      className={cn(block(), className)}
    >
      {renderChildItems(treeItems, 0, [])}
    </List>
  );
};

const defaultProps: DefaultProps = {
  rootId: null,
  multiSelect: false,
  expanderLeft: false,
  expanderIcon: <FontIcon>keyboard_arrow_down</FontIcon>,
  itemRenderer: defaultItemRenderer,
  labelKey: "name",
  valueKey: "name",
  getItemLabel: defaultGetItemLabel,
  getItemValue: defaultGetItemValue,
  getItemProps: () => undefined,
};

Tree.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Tree.displayName = "Tree";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Tree.propTypes = {
      id: PropTypes.string.isRequired,
      onFocus: PropTypes.func,
      onKeyDown: PropTypes.func,
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      // TODO: Update to custom prop validation for itemId and parentId
      data: PropTypes.object.isRequired,
      rootId: PropTypes.string,
      sort: PropTypes.func,
      selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
      onItemSelect: PropTypes.func.isRequired,
      onMultiItemSelect: PropTypes.func.isRequired,
      expandedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
      onItemExpansion: PropTypes.func.isRequired,
      onMultiItemExpansion: PropTypes.func.isRequired,
      multiSelect: PropTypes.bool,
      expanderLeft: PropTypes.bool,
      expanderIcon: PropTypes.node,
      itemRenderer: PropTypes.func,
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      getItemLabel: PropTypes.func,
      getItemValue: PropTypes.func,
      getItemProps: PropTypes.func,
    };
  }
}

export default forwardRef<ListElement, TreeProps>((props, ref) => (
  <Tree {...props} forwardedRef={ref} />
));
