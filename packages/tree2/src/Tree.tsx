import React, {
  FC,
  forwardRef,
  ReactNode,
  ReactElement,
  MutableRefObject,
} from "react";
import cn from "classnames";
import { FontIcon } from "@react-md/icon";
import { List, ListElement, ListProps } from "@react-md/list";
import { bem, WithForwardedRef } from "@react-md/utils";

import defaultItemRenderer from "./defaultItemRenderer";
import {
  TreeItemExpansion,
  TreeItemExpansionIcon,
  TreeItemSelection,
  UnknownTreeItem,
  TreeItemIds,
  ProvidedTreeItemProps,
  TreeItemProps,
  TreeData,
  TreeItemSorter,
  TreeItemId,
  ProvidedTreeProps,
} from "./types";
import useNestedTreeList, { NestedTreeItem } from "./useNestedTreeList";
import getTreeItemId from "./getTreeItemId";
import defaultGetItemValue from "./defaultGetItemValue";
import defaultGetItemLabel from "./defaultGetItemLabel";

export interface TreeProps<T extends TreeItemIds = UnknownTreeItem>
  extends ListProps,
    TreeItemExpansionIcon,
    TreeItemExpansion,
    TreeItemSelection {
  /**
   * The id for the tree element. This is required for a lot of accessibility features.
   */
  id: string;

  /**
   * An optional label string that describes this tree. Either this or the `aria-labelledby` prop are
   * required for a11y.
   */
  "aria-label"?: string;

  /**
   * An optional id that points to an element that labels this tree. Either this or the `aria-label`
   * prop are required for a11y.
   */
  "aria-labelledby"?: string;

  /**
   * The data to render within the tree.
   */
  data: TreeData<T>;

  /**
   * An optional id to use to determine the root items within the tree. You'll most likely want to
   * keep this as the default of `null`, but it can also be used if you have a different identifier
   * for root items.
   */
  rootId?: null | TreeItemId;

  /**
   * @see TreeItemSorter
   */
  sort?: TreeItemSorter<T>;

  /**
   * A function that gets called to render each `TreeItem` within the tree. This can be overridden if you need
   * to add additional functionality around the `TreeItem` (such as drag and drop). The default behavior is to
   * extract the `ListItem` props:
   * - `leftIcon`
   * - `rightIcon`
   * - `leftAvatar`
   * - `rightAvatar`
   * - `children`
   * - `to` / `href`
   * - `isLink`
   *
   * and try to render as a `TreeItem` with those props. It will also override the `expanderLeft` and `expanderIcon`
   * on the `TreeItem` with whatever was provided to the `Tree` component.
   */
  itemRenderer?: (
    providedProps: ProvidedTreeItemProps,
    item: T,
    treeProps: ProvidedTreeProps
  ) => ReactElement | null;

  /**
   * Boolean if multiple items within the tree can be selected at once.
   */
  multiSelect?: boolean;

  /**
   * The key to use to extract a renderable label from each tree item. This will be displayed in the DOM as
   * the `children` in each tree item.
   */
  labelKey?: string;

  /**
   * The key to use to extract a text string from each tree item. This is used for keyboard accessibility and
   * being able to "search" the tree for items starting with the typed letters.
   */
  valueKey?: string;

  /**
   * A function to extract the renderable label from each tree item. The default behavior will be to just
   * return `item[labelKey]`.
   */
  getItemLabel?: (item: T, labelKey: string) => ReactNode;

  /**
   * A function to extract the text string from each tree item. The default behavior will be to return
   * the `item[valueKey]` and stringify it.
   */
  getItemValue?: (item: T, valueKey: string) => string;

  /**
   * A function to get additional props to pass to each tree item. It will be provided the current
   * item.
   *
   * Note: It is generally recommended to use the `itemRenderer` instead for additional functionality as
   * you will have more control. This prop is more for applying custom styles or display data on the item.
   */
  getItemProps?: (item: T) => TreeItemProps | undefined;
}

type WithRef = WithForwardedRef<ListElement>;
type DefaultProps = Required<
  Pick<
    TreeProps,
    | "rootId"
    | "multiSelect"
    | "expanderIcon"
    | "expanderLeft"
    | "itemRenderer"
    | "labelKey"
    | "valueKey"
    | "getItemLabel"
    | "getItemValue"
    | "getItemProps"
  >
>;
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
