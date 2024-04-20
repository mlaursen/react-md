"use client";
import { useEffect, useMemo } from "react";
import { type TreeProps } from "../tree/Tree.js";
import {
  type DefaultTreeItemNode,
  type TreeData,
  type TreeItemDefaultIds,
  type TreeItemNode,
} from "../tree/types.js";
import { type TreeImplementation } from "../tree/useTree.js";
import { useTreeExpansion } from "../tree/useTreeExpansion.js";
import { getTreeItemsFrom } from "../tree/utils.js";

const noop = (): void => {
  // do nothing
};

/**
 * @internal
 */
const getParentIds = (
  itemId: string,
  navItems: TreeData<TreeItemNode>
): readonly string[] =>
  getTreeItemsFrom(navItems, itemId).map(({ itemId }) => itemId);

/**
 * @since 6.0.0 Removed the `linkComponent` option.
 */
export interface LayoutTreeOptions<
  T extends TreeItemNode = DefaultTreeItemNode,
> {
  /**
   * The current pathname which is used as the tree `itemId`.
   */
  pathname: string;

  /**
   * @example
   * ```tsx
   * const navItems = {
   *   "/": {
   *     itemId: "/",
   *     parentId: null,
   *     children: "Home",
   *     leftAddon: <HomeIcon />,
   *     to: "/",
   *   },
   *   "/route-1": {
   *     itemId: "/route-1",
   *     parentId: null,
   *     children: "Route 1",
   *     leftAddon: <TvIcon />,
   *     to: "/route-1",
   *   },
   *   "/route-2": {
   *     itemId: "/route-2",
   *     parentId: null,
   *     children: "Route 2",
   *     leftAddon: <AppsIcon />,
   *     to: "/route-2",
   *   },
   *   "/route-3": {
   *     itemId: "/route-3",
   *     parentId: null,
   *     children: "Route 3",
   *     leftAddon: <BookIcon />,
   *     to: "/route-3",
   *   },
   * } satisfies TreeData;
   * ```
   */
  navItems: TreeData<T>;

  /**
   * @defaultValue `getParentIds(pathname, navItems)`
   */
  defaultExpandedIds?: TreeItemDefaultIds;
}

/**
 * @since 6.0.0 Renamed from `LayoutNavigationState`, removed the
 * `linkComponent`, and remap `navItems` to `data` so it can be passed to the
 * `Tree` component.
 */
export interface LayoutTreeImplementation<
  T extends TreeItemNode = DefaultTreeItemNode,
> extends Pick<TreeProps<T>, "data">,
    TreeImplementation {}

/**
 * Before considering to use a `Tree` for site navigation, it is important to
 * understand:
 * - There is a lot of functionality required to implement the tree widget so
 *   your bundle size will increase
 * - A pattern more suited for typical site navigation with expandable groups of
 *   links is the disclosure pattern.
 * - @see https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/
 *
 * This is a pretty reasonable default implementation for having a navigation
 * tree within the Layout component. The way it'll work is that the current
 * route will be the only selected item within the tree. When the pathname
 * changes, the selectedIds will be updated to only be the current pathname once
 * again.
 *
 * This means that you can use whatever routing library or history provider that
 * ensures that your layout re-renders on a path change.
 *
 * @example
 * ```tsx
 * import { Tree, useLayoutTree } from "@react-md/core";
 * import type { TreeData } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * // choose your routing library...
 * import { Link, useLocation } from "react-router";
 *
 * const navItems = {
 *   "/": {
 *     itemId: "/",
 *     parentId: null,
 *     children: "Home",
 *     leftAddon: <HomeIcon />,
 *     to: "/",
 *   },
 *   "/route-1": {
 *     itemId: "/route-1",
 *     parentId: null,
 *     children: "Route 1",
 *     leftAddon: <TvIcon />,
 *     to: "/route-1",
 *   },
 *   "/route-2": {
 *     itemId: "/route-2",
 *     parentId: null,
 *     children: "Route 2",
 *     leftAddon: <AppsIcon />,
 *     to: "/route-2",
 *   },
 *   "/route-3": {
 *     itemId: "/route-3",
 *     parentId: null,
 *     children: "Route 3",
 *     leftAddon: <BookIcon />,
 *     to: "/route-3",
 *   },
 * } satisfies TreeData;
 *
 * function Example(): ReactElement {
 *   const { pathname } = useLocation();
 *   const tree = useLayoutTree({
 *     navItems,
 *     pathname,
 *   });
 *
 *   return (
 *     <Tree
 *       {...tree}
 *       aria-label="Navigation"
 *       linkComponent={Link}
 *     />
 *   );
 * }
 * ```
 *
 * @since 6.0.0 Renamed from `useLayoutNavigation`.
 */
export function useLayoutTree(
  options: LayoutTreeOptions
): LayoutTreeImplementation {
  const { defaultExpandedIds, navItems, pathname } = options;

  const selectedIds = useMemo(() => new Set([pathname]), [pathname]);
  const { expandedIds, expandMultipleTreeItems, toggleTreeItemExpansion } =
    useTreeExpansion(
      defaultExpandedIds ?? (() => getParentIds(pathname, navItems))
    );

  useEffect(() => {
    expandMultipleTreeItems((prevExpandedIds) => {
      const nextExpandedIds = new Set([
        ...prevExpandedIds,
        ...getParentIds(pathname, navItems),
      ]);

      return nextExpandedIds;
    });
  }, [expandMultipleTreeItems, pathname, navItems]);

  return {
    data: navItems,
    multiSelect: false,
    selectedIds,
    expandedIds,
    expandMultipleTreeItems,
    toggleTreeItemExpansion,
    toggleTreeItemSelection: noop,
    selectMultipleTreeItems: noop,
  };
}
