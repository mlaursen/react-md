"use client";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { NonNullRef } from "../types.js";
import type { DefaultTreeItemNode, TreeData, TreeItemNode } from "./types.js";
import type { TreeExpansion } from "./useTreeExpansion.js";
import type { TreeSelection } from "./useTreeSelection.js";

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
 *
 * @remarks \@since 6.0.0
 */
export type TreeExpansionMode = "auto" | "manual";

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface TreeItemMetadataLookup {
  /**
   * This is used for the keyboard movement behavior for trees that allow the
   * `ArrowRight` key for tree items that have children.
   */
  expandable: Record<string, boolean>;

  /**
   * This is a quick lookup if a tree item is disabled since it's possible the
   * custom `renderer` sets the `disabled` state and not the `TreeData`.
   */
  disabledItems: Record<string, boolean>;

  /**
   * A lookup of element `id` (DOM id) for each tree item to the `itemId`. This
   * is a quick way to figure out which item is being interacted with from a
   * keyboard event without needed to add `data-*` attributes.
   */
  elementToItem: Record<string, string>;

  /**
   * A lookup of tree item `itemId` to the element `id` (DOM id). This is used
   * to be able to find a parent tree item when the `ArrowLeft` key is pressed
   * to focus that parent item.
   */
  itemToElement: Record<string, string>;
}

/**
 * The tree context is mostly a convenience API for implementing a custom tree
 * item that requires the {@link TreeExpansion}, {@link TreeSelection} and
 * {@link TreeData} to work.
 *
 * The other properties on the context are most likely for internal use only.
 *
 * @remarks \@since 6.0.0
 */
export interface TreeContext<T extends TreeItemNode = DefaultTreeItemNode>
  extends TreeExpansion,
    TreeSelection {
  data: TreeData<T>;
  rootId: string | null;
  disableTransition: boolean;
  temporaryChildItems: boolean;

  /** @internal */
  expanderLeft: boolean;
  /** @internal */
  expanderIcon: ReactNode;
  /** @internal */
  expansionMode: TreeExpansionMode;
  /** @internal */
  metadataLookup: NonNullRef<TreeItemMetadataLookup>;
}

// Allow the hook to correct typecast this instead
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const context = createContext<TreeContext<any> | undefined>(undefined);
context.displayName = "Tree";
const { Provider } = context;

/**
 * This can be used for a custom tree item renderer.
 *
 * @see The `Tree` component for an example.
 * @remarks \@since 6.0.0
 */
export function useTreeContext<
  T extends TreeItemNode = DefaultTreeItemNode,
>(): TreeContext<T> {
  const value = useContext(context);
  if (!value) {
    throw new Error("Cannot find a parent Tree component");
  }

  return value;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface TreeProviderProps<T extends TreeItemNode = DefaultTreeItemNode>
  extends TreeContext<T> {
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @internal
 * @remarks \@since 6.0.0
 */
export function TreeProvider<T extends TreeItemNode = DefaultTreeItemNode>(
  props: TreeProviderProps<T>
): ReactElement {
  const {
    children,
    data,
    rootId,
    multiSelect,
    expanderIcon,
    expanderLeft,
    expansionMode,
    metadataLookup,
    disableTransition,
    temporaryChildItems,
    expandedIds,
    selectedIds,
    expandMultipleTreeItems,
    toggleTreeItemExpansion,
    selectMultipleTreeItems,
    toggleTreeItemSelection,
  } = props;
  const value = useMemo<TreeContext<T>>(
    () => ({
      data,
      rootId,
      multiSelect,
      expanderIcon,
      expanderLeft,
      expansionMode,
      metadataLookup,
      disableTransition,
      temporaryChildItems,
      expandedIds,
      selectedIds,
      expandMultipleTreeItems,
      toggleTreeItemExpansion,
      selectMultipleTreeItems,
      toggleTreeItemSelection,
    }),
    [
      data,
      disableTransition,
      expandMultipleTreeItems,
      expandedIds,
      expanderIcon,
      expanderLeft,
      expansionMode,
      metadataLookup,
      multiSelect,
      rootId,
      selectMultipleTreeItems,
      selectedIds,
      temporaryChildItems,
      toggleTreeItemExpansion,
      toggleTreeItemSelection,
    ]
  );

  return <Provider value={value}>{children}</Provider>;
}
