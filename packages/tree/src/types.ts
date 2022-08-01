import type {
  ElementInteractionHandlers,
  UseStateInitializer,
  UseStateSetter,
} from "@react-md/core";
import type { CustomLinkComponent } from "@react-md/link";
import type { ListItemChildrenAddonProps } from "@react-md/list";
import type {
  ElementType,
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
  Ref,
} from "react";

export interface TreeItemNode {
  itemId: string;
  parentId: string | null;
}

export interface DefaultTreeItemNode
  extends TreeItemNode,
    ListItemChildrenAddonProps {
  to?: string;
  href?: string;
  name?: ReactNode;
  rel?: string;
  target?: string;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
}

export type RenderableTreeItemNode<
  T extends TreeItemNode = DefaultTreeItemNode
> = T & {
  childItems?: readonly RenderableTreeItemNode<T>[];
};

export type TreeData<T extends TreeItemNode = DefaultTreeItemNode> = Record<
  string,
  T
>;
export type ReadonlyTreeData<T extends TreeItemNode = DefaultTreeItemNode> =
  Readonly<Record<string, Readonly<T>>>;

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

export type TreeItemIdSet = ReadonlySet<string>;
export type TreeItemDefaultIds = UseStateInitializer<readonly string[]>;

export type SelectTreeItem = (itemId: string) => void;

export interface TreeSelection {
  /**
   * @defaultValue `false`
   */
  multiSelect?: boolean;
  selectedIds: TreeItemIdSet;
  onItemSelection(itemId: string): void;
  onMultiItemSelection(itemIds: TreeItemIdSet): void;
}

/**
 * @defaultValue `"both"`
 */
export type TreeTransition = "both" | "collapse" | "rotator" | "none";

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
export type SetTreeItemExpansion = (itemId: string, expanded: boolean) => void;
export interface TreeExpansion {
  expandedIds: TreeItemIdSet;
  onItemExpansion: SetTreeItemExpansion;
  onMultiItemExpansion: UseStateSetter<TreeItemIdSet>;
}

export type TreeItemHTMLAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  keyof ElementInteractionHandlers<HTMLElement> | "itemRef" | "id"
>;
export interface ConfigurableTreeItemProps
  extends TreeItemHTMLAttributes,
    ListItemChildrenAddonProps {
  /**
   * If this prop is provided, the `TreeItem` will render as a `Link` from
   * `react-router-dom` instead of as a `span`.
   */
  to?: string;
  href?: string;

  item: TreeItemNode;

  disabled?: boolean;
  contentClassName?: string;

  /**
   * @defaultValue `false`
   */
  disableCollapseTransition?: boolean;
}

export interface TreeItemStates {
  depth: number;
  focused: boolean;
  selected: boolean;
  expanded: boolean;
  isLeafNode: boolean;
}

export interface OverridableTreeItemProps
  extends ListItemChildrenAddonProps,
    Omit<HTMLAttributes<HTMLSpanElement>, "id"> {
  to?: string;
  href?: string;
  disabled?: boolean;
  disabledOpacity?: boolean;
  contentClassName?: string;
  disableTransition?: boolean;
}

export interface CurrentTreeItem<T extends TreeItemNode>
  extends TreeItemStates {
  item: T;
}

export type GetTreeItemProps<T extends TreeItemNode = DefaultTreeItemNode> = (
  item: CurrentTreeItem<T>
) => Readonly<OverridableTreeItemProps> | undefined;

export interface TreeItemRendererProps<T extends TreeItemNode>
  extends TreeItemStates {
  id: string;

  item: T;

  childItems: ReactNode;
  contentRef: MutableRefObject<HTMLSpanElement | null>;
  getTreeItemProps: GetTreeItemProps<T>;
}

export type IsTreeItem<T extends TreeItemNode = DefaultTreeItemNode> = (
  item: T
) => boolean;

export type TreeHTMLAttributes = Omit<
  HTMLAttributes<HTMLUListElement>,
  "role" | "tabIndex" | "children"
>;

export interface TreeProps<T extends TreeItemNode>
  extends TreeHTMLAttributes,
    TreeExpansion,
    TreeSelection {
  data: ReadonlyTreeData<T>;
  treeRef?: Ref<HTMLUListElement>;

  /** @defaultValue `identity` */
  sort?: TreeItemSorter<T>;

  /**
   * @defaultValue `null`
   */
  rootId?: string | null;

  /**
   * @see {@link TreeExpansionMode}
   * @defaultValue `"auto"`
   */
  expansionMode?: TreeExpansionMode;

  /**
   * @defaultValue `false`
   */
  expanderLeft?: boolean;

  /**
   * @defaultValue `useIcon("expander")`
   */
  expanderIcon?: ReactNode;

  /**
   * @defaultValue `() => true`
   */
  isTreeItem?: IsTreeItem<T>;

  /**
   * @defaultValue `false`
   */
  disableTransition?: boolean;

  /**
   * @see {@link DefaultTreeItemRenderer}
   * @defaultValue `DefaultTreeItemRenderer`
   */
  renderer?: ElementType<TreeItemRendererProps<T>>;

  getTreeItemProps?: GetTreeItemProps<T>;

  linkComponent?: CustomLinkComponent;
}
