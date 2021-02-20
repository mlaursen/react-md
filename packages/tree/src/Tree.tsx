import React, {
  forwardRef,
  MutableRefObject,
  ReactElement,
  ReactNode,
} from "react";
import cn from "classnames";
import { useIcon } from "@react-md/icon";
import { List, ListElement } from "@react-md/list";
import { bem } from "@react-md/utils";

import { defaultGetItemLabel } from "./defaultGetItemLabel";
import { defaultGetItemValue } from "./defaultGetItemValue";
import { defaultTreeItemRenderer } from "./defaultTreeItemRenderer";
import { TreeProps, UnknownTreeItem } from "./types";
import { NestedTreeItem } from "./useNestedTreeList";
import { useTreeMovement } from "./useTreeMovement";

const block = bem("rmd-tree");
const defaultGetItemProps = (): undefined => undefined;

/**
 * Creates an accessible tree widget that allows you to show hierarchical data
 * in a list presentation view. This component requires the selection and
 * expansion state to be provided/controlled but you can use the
 * `useTreeItemSelection` and `useTreeItemExpansion` hooks for a great starting
 * point for this functionality.
 */
export const Tree = forwardRef<ListElement, TreeProps<any>>(function Tree( // eslint-disable-line @typescript-eslint/no-explicit-any
  {
    id,
    className,
    itemRenderer = defaultTreeItemRenderer,
    data,
    multiSelect = false,
    selectedIds,
    onItemSelect,
    onMultiItemSelect,
    expandedIds,
    onItemExpansion,
    onMultiItemExpansion,
    expanderLeft = false,
    expanderIcon: propExpanderIcon,
    labelKey = "name",
    valueKey = "name",
    getItemLabel = defaultGetItemLabel,
    getItemValue = defaultGetItemValue,
    getItemProps = defaultGetItemProps,
    linkComponent,
    sort,
    rootId = null,
    onBlur,
    onFocus,
    onKeyDown,
    ...props
  },
  ref
) {
  const expanderIcon = useIcon("dropdown", propExpanderIcon);

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
    items: readonly NestedTreeItem<UnknownTreeItem>[],
    depth: number,
    parentIndexes: readonly number[]
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
        {
          id,
          expanderLeft,
          expanderIcon: expanderIcon as ReactElement,
          multiSelect,
          labelKey,
          valueKey,
          getItemLabel,
          getItemValue,
          getItemProps,
          linkComponent,
          rootId,
          ...props,
        }
      );
    });
  };

  return (
    <List
      {...props}
      ref={ref}
      id={id}
      aria-activedescendant={activeId}
      aria-multiselectable={multiSelect || undefined}
      role="tree"
      tabIndex={0}
      className={cn(block(), className)}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    >
      {renderChildItems(items, 0, [])}
    </List>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Tree.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      onBlur: PropTypes.func,
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
      linkComponent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
        PropTypes.oneOf(["a"]),
      ]),
    };
  } catch (e) {}
}
