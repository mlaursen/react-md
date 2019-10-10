import React, { FC, forwardRef, ReactNode, MutableRefObject } from "react";
import cn from "classnames";
import { FontIcon } from "@react-md/icon";
import { List, ListElement } from "@react-md/list";
import { bem, WithForwardedRef } from "@react-md/utils";

import defaultGetItemLabel from "./defaultGetItemLabel";
import defaultGetItemValue from "./defaultGetItemValue";
import defaultTreeItemRenderer from "./defaultTreeItemRenderer";
import { ProvidedTreeProps, TreeProps, UnknownTreeItem } from "./types";
import { NestedTreeItem } from "./useNestedTreeList";
import useTreeMovement from "./useTreeMovement";

type WithRef = WithForwardedRef<ListElement>;
type DefaultProps = ProvidedTreeProps;
type WithDefaultProps = TreeProps & DefaultProps & WithRef;

const block = bem("rmd-tree");

/**
 * Creates an accessible tree widget that allows you to show hierarchical data
 * in a list presentation view. This component requires the selection and expansion
 * state to be provided/controlled but you can use the `useTreeItemSelection` and
 * `useTreeItemExpansion` hooks for a great starting point for this functionality.
 */
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
    onBlur,
    onFocus,
    onKeyDown,
    ...props
  } = providedProps as WithDefaultProps;
  const { id } = props;

  const {
    items,
    activeId,
    setActiveId,
    itemIdRefs,
    handleBlur,
    handleFocus,
    handleKeyDown,
  } = useTreeMovement({
    id,
    data,
    sort,
    rootId,
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
  });

  const renderChildItems = (
    items: NestedTreeItem<UnknownTreeItem>[],
    depth: number,
    parentIndexes: number[]
  ): ReactNode => {
    const listSize = items.length;

    return items.map((item, index) => {
      const { itemId, childItems, isCustom } = item;
      const selected = selectedIds.includes(itemId);
      const expanded = expandedIds.includes(itemId);
      let id = "";
      let ref: MutableRefObject<HTMLLIElement | null> | undefined;
      let visibleIndex = -1;
      if (!isCustom) {
        ({ id, ref, visibleIndex } = itemIdRefs[itemId]);
      }

      const focused = id === activeId;

      return itemRenderer(
        {
          key: itemId,
          id,
          liRef: ref,
          depth,
          listSize,
          itemIndex: index,
          selected,
          expanded,
          focused,
          onClick() {
            setActiveId(itemId);
            onItemSelect(itemId);
            if (childItems) {
              onItemExpansion(itemId, !expanded);
            }
          },
          renderChildItems: childItems
            ? () =>
                renderChildItems(childItems, depth + 1, [
                  ...parentIndexes,
                  index + 1,
                ])
            : undefined,
        },
        { ...item, visibleIndex },
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
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    >
      {renderChildItems(items, 0, [])}
    </List>
  );
};

const defaultProps: DefaultProps = {
  rootId: null,
  multiSelect: false,
  expanderLeft: false,
  expanderIcon: <FontIcon>keyboard_arrow_down</FontIcon>,
  itemRenderer: defaultTreeItemRenderer,
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

// This actually works pretty nice since the only time you really need the
// "strict" typing for the TreeItem is the `itemRenderer`. Since I also expose
// the `TreeItemRenderer` type, you can strictly type it there if needed and
// will not cause type errors.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default forwardRef<ListElement, TreeProps<any>>((props, ref) => (
  <Tree {...props} forwardedRef={ref} />
));
