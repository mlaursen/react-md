import { ElementType, useRef } from "react";
import { Link } from "@react-md/link";
import {
  BaseTreeItem,
  getItemsFrom,
  TreeData,
  TreeItemExpansion,
  TreeItemId,
  TreeItemSelection,
  useTreeItemExpansion,
} from "@react-md/tree";

import { LayoutNavigationItem, LayoutNavigationTree } from "./types";

export interface LayoutNavigationState<
  T extends BaseTreeItem = LayoutNavigationItem
> extends TreeItemSelection,
    TreeItemExpansion {
  /**
   * The navigation items to use that will be passed to the `Tree` component
   * from `@react-md/tree`
   */
  navItems: LayoutNavigationTree<T>;

  /**
   * The link component to use when a nav item is clicked. This defaults to the
   * `Link` component from `@react-md/link`, but can also be a `Link` from
   * `react-router` or another routing library.
   */
  linkComponent: ElementType;
}

/**
 * @internal
 */
const getParentIds = (
  itemId: TreeItemId,
  navItems: TreeData<BaseTreeItem>
): TreeItemId[] => getItemsFrom(navItems, itemId).map(({ itemId }) => itemId);

/**
 * This is used to disable the item select and multi item select functionality
 * since only one id can be selected at a time, and it'll always be the current
 * pathname's itemId
 *
 * @internal
 */
const noop = (): void => {
  // do nothing
};

/**
 * This used to just be `pathname.replace(/\?.*$/, "")` but that can apparently
 * cause performance issues or a DoS attack if the pathname contains multiple
 * ?`?` (shouldn't really be possible though)
 *
 * @remarks \@since 2.9.0
 */
const removeQueryParams = (pathname: string): string => {
  const i = pathname.indexOf("?");
  if (i === -1) {
    return pathname;
  }

  return pathname.substring(0, i);
};

/**
 * This is a pretty reasonable default implementation for having a navigation
 * tree within the Layout component. The way it'll work is that the current
 * route will be the only selected item within the tree. When the pathname
 * changes, the selectedIds will be updated to only be the current pathname once
 * again.
 *
 * This means that you can use whatever routing library or history provider that
 * ensures that your layout re-renders on a path change.
 *
 * @see LayoutNavigationTree for description of the navItems
 * @param navItems - All the navigation items within your layout. This is used
 * for determining which parent tree items should be expanded when the route
 * changes so the current route won't be hidden from view. This sort of flow
 * happens if you have a link outside of the navigation tree.
 * @param pathname - The current pathname
 * @param linkComponent - The link component to use within the navigation tree
 * for any item that has a `to` or `href` attribute. This defaults to the `Link`
 * from `@react-md/link` but should be changed to whatever link component you
 * need if using a routing library like `react-router`.
 * @returns the required `Tree` selection and expansion state and handlers that
 * should be passed to the `Layout` component.
 */
export function useLayoutNavigation<
  T extends BaseTreeItem = LayoutNavigationItem
>(
  navItems: LayoutNavigationTree<T>,
  pathname: string,
  linkComponent: ElementType = Link
): LayoutNavigationState<T> {
  const itemId = removeQueryParams(pathname);
  const { expandedIds, onItemExpansion, onMultiItemExpansion } =
    useTreeItemExpansion(() => getParentIds(itemId, navItems));

  const prevItemId = useRef(itemId);
  const prevNavItems = useRef(navItems);
  if (prevItemId.current !== itemId || prevNavItems.current !== navItems) {
    prevItemId.current = itemId;
    prevNavItems.current = navItems;
    onMultiItemExpansion(
      Array.from(new Set([...expandedIds, ...getParentIds(itemId, navItems)]))
    );
  }

  return {
    navItems,
    multiSelect: false,
    selectedIds: [itemId],
    onItemSelect: noop,
    onMultiItemSelect: noop,
    expandedIds,
    onItemExpansion,
    onMultiItemExpansion,
    linkComponent,
  };
}
