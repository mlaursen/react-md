import type { ListItemChildrenAddonProps } from "@react-md/list";
import { ListItemChildrenProps } from "@react-md/list";
import type { Dispatch, HTMLAttributes, Ref, SetStateAction } from "react";
import {
  FocusEventHandler,
  KeyboardEventHandler,
  ReactElement,
  ReactNode,
} from "react";

export interface TreeItemNode {
  itemId: string;
  parentId: string | null;
  childItems?: readonly TreeItemNode[];
}

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
export type TreeItemSorter = (
  items: readonly Readonly<TreeItemNode>[]
) => readonly Readonly<TreeItemNode>[];

/**
 * Note: This **should be memoized** to prevent rerendering the entire tree each
 * render.
 */
export type TreeData = Record<string, TreeItemNode>;
export type ReadonlyTreeData = Record<string, Readonly<TreeItemNode>>;

export type TreeItemIdSet = Set<string>;

export interface TreeSelection {
  /**
   * @defaultValue `false`
   */
  multiSelect?: boolean;
  selectedIds: TreeItemIdSet;
  onItemSelection(itemId: string): void;
  onMultiItemSelection(itemIds: TreeItemIdSet): void;
}

export interface TreeExpansion {
  expandedIds: TreeItemIdSet;
  onItemExpansion(itemId: string, expanded: boolean): void;
  onMultiItemExpansion: Dispatch<SetStateAction<TreeItemIdSet>>;
}

export type TreeHTMLAttributes = Omit<HTMLAttributes<HTMLUListElement>, "role">;

export interface ConfigurableTreeItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, "id">,
    ListItemChildrenAddonProps {
  /**
   * If this prop is provided, the `TreeItem` will render as a `Link` from
   * `react-router-dom` instead of as a `span`.
   */
  to?: string;
  href?: string;

  disabled?: boolean;

  /**
   * Boolean if the tree item should display a collapse/expand button before the
   * other `children` when there are child items.
   *
   * Note: this can also be configured by the
   * {@link TreeProps.disableCollapsibleRoots} which is the main use-case for
   * this prop.
   *
   * @defaultValue `true`
   */
  collapsible?: boolean;
  contentClassName?: string;

  /**
   * @defaultValue `false`
   */
  disableCollapseTransition?: boolean;
}

export interface TreeItemRenderOptions extends TreeItemNode {
  expanded: boolean;
  selected: boolean;
}

export type GetTreeItemProps = (
  item: Readonly<TreeItemRenderOptions>
) => ConfigurableTreeItemProps;

/**
 *
 */
export type TreeExpansionMode = "item" | "icon";

export interface TreeRendererProps
  extends TreeHTMLAttributes,
    TreeExpansion,
    TreeSelection {
  treeRef?: Ref<HTMLUListElement>;
  /** @defaultValue `0` */
  tabIndex?: number;

  data: ReadonlyTreeData;

  /** @defaultValue `identity` */
  sort?: TreeItemSorter;
  /**
   * @defaultValue `null`
   */
  rootId?: string | null;

  /**
   * @see {@link TreeExpansionMode}
   * @defaultValue `"item"`
   */
  expansionMode?: TreeExpansionMode;

  getTreeItemProps: GetTreeItemProps;
}
