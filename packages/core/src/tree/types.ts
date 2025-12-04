import { type ReactNode } from "react";

import { type ListItemChildrenProps } from "../list/types.js";
import { type UseStateInitializer } from "../types.js";
import { type RenderRecursiveItemsProps } from "../utils/RenderRecursively.js";

/**
 * @since 6.0.0 This was renamed from `TreeItemIds`
 */
export interface TreeItemNode {
  itemId: string;
  parentId: string | null;
}

/**
 * The default tree item node allows for any props for rendering children within
 * list items and rendering links.
 *
 * @since 6.0.0
 */
export interface DefaultTreeItemNode
  extends TreeItemNode, ListItemChildrenProps {
  /**
   * If this is defined, the `TreeItem` will render the content within a `Link`
   * instead of a `<span>`.
   */
  to?: string;

  /**
   * If this is defined, the `TreeItem` will render the content within a `Link`
   * instead of a `<span>`.
   */
  href?: string;

  /**
   * This should only be provided if {@link to} or {@link href} exist on the
   * node.
   */
  rel?: string;

  /**
   * This should only be provided if {@link to} or {@link href} exist on the
   * node.
   */
  target?: string;

  /**
   * An alias for the {@link children} within a tree item. This will be used
   * over the {@link children} if both exist.
   */
  name?: ReactNode;

  /**
   * The children to display in the tree item.
   *
   * @see {@link name}
   */
  children?: ReactNode;

  /** @see {@link ListItemProps.disabled} */
  disabled?: boolean;

  /** @see {@link ListItemProps.disabledOpacity} */
  disabledOpacity?: boolean;

  className?: string;
  contentClassName?: string;
}

/**
 * @example Default Structure
 * ```tsx
 * import { type TreeData } from "@react-md/core/tree/types";
 * import FolderIcon from "@react-md/material-icons/FolderIcon";
 *
 * export const MY_DATA: TreeData = {
 *   "item-1": {
 *     itemId: "item-1",
 *     parentId: null,
 *     name: "Root Level Item 1",
 *   },
 *   "item-2": {
 *     itemId: "item-2",
 *     parentId: "item-1",
 *     name: "A child for the first item",
 *     leftAddon: <FolderIcon />,
 *   },
 *   "item-3": {
 *     itemId: "item-3",
 *     parentId: "item-1",
 *     children: "Another child for the first item",
 *     leftAddon: <FolderIcon />,
 *     rightAddon: <span>Something custom</span>,
 *   },
 * };
 * ```
 *
 * @since 6.0.0 Updated the default types
 * @see {@link DefaultTreeItemNode}
 */
export type TreeData<T extends TreeItemNode = DefaultTreeItemNode> = Record<
  string,
  T
>;

/**
 * @since 6.0.0 This used to be `ExpandedIds`/`SelectedIds` but was converted to
 * a `Set` to increase performance for large trees.
 */
export type TreeItemIdSet = ReadonlySet<string>;

/**
 * @since 6.0.0
 */
export type TreeDefaultIds = UseStateInitializer<
  readonly string[] | ReadonlySet<string>
>;

/**
 * A function to call that will sort the items within the tree for each unique
 * `parentId`. If you have a tree like:
 *
 * ```
 * a
 * ├── a1
 * b
 * ├── b1
 * ├── b2
 * │   └── b2.1
 * c
 * ├── c1
 * ├── c2
 * └── c3
 * ```
 *
 * This function will be called with:
 *
 * - `[a1]`
 * - `[b2.1]`
 * - `[b1, b2]`
 * - `[c1, c2, c3]`
 * - `[a, b, c]`
 *
 * Note: This **should be memoized** to prevent rerendering the entire tree each
 * render.
 */
export type TreeItemSorter<T extends TreeItemNode = DefaultTreeItemNode> = (
  items: readonly T[]
) => readonly T[];

/**
 * @since 6.0.0
 */
export type TreeItemRendererProps<
  T extends TreeItemNode = DefaultTreeItemNode,
> = RenderRecursiveItemsProps<T, TreeData<T>>;
