import type { ListItemChildrenAddonProps } from "@react-md/list";
import type { Dispatch, HTMLAttributes, Ref, SetStateAction } from "react";

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
 * When this is set to `"auto"`, clicking on a tree item with a mouse or with
 * the Enter/Space keys will select and expand/collapse the tree item. The user
 * can still use the ArrowLeft and ArrowRight keys to expand/collapse nested
 * tree items.
 *
 * When this is set to `"manual"`, clicking on a tree item with a mouse or with
 * the Enter/Space keys will only select that tree item. The user must use the
 * ArrowLeft and ArrowRight keys to expand/collapse nested tree items.
 *
 * The main use-case for the `"manual"` setting is creating a navigation tree
 * that requires the user to click on an icon or a button to expand the child
 * items.
 */
export type TreeExpansionMode = "auto" | "manual";

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
   * @defaultValue `"auto"`
   */
  expansionMode?: TreeExpansionMode;

  getTreeItemProps: GetTreeItemProps;
}
