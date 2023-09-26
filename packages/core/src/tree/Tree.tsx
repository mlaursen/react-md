"use client";
import {
  useMemo,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import {
  LinkProvider,
  type CustomLinkComponent,
} from "../link/LinkProvider.js";
import { List } from "../list/List.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { type LabelRequiredForA11y } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { identity } from "../utils/identity.js";
import {
  DefaultTreeItemRenderer,
  type TreeItemRendererProps,
} from "./DefaultTreeItemRenderer.js";
import { TreeProvider, type TreeExpansionMode } from "./TreeProvider.js";
import { tree } from "./styles.js";
import {
  type TreeData,
  type TreeItemNode,
  type TreeItemSorter,
} from "./types.js";
import { type TreeExpansion } from "./useTreeExpansion.js";
import { useTreeItems, type RenderableTreeItemNode } from "./useTreeItems.js";
import { useTreeMovement } from "./useTreeMovement.js";
import { type TreeSelection } from "./useTreeSelection.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-tree-depth"?: number;
    "--rmd-tree-item-padding"?: string | number;
    "--rmd-tree-item-padding-base"?: string | number;
    "--rmd-tree-item-padding-incrementor"?: string | number;
  }
}

/**
 * @remarks \@since 6.0.0
 */
export type TreeHTMLAttributes = Omit<
  HTMLAttributes<HTMLUListElement>,
  "role" | "tabIndex" | "children"
>;

/**
 * @remarks
 * \@since 6.0.0 There was a major API change and the `id` is now `optional`.
 * In addition, the following props were removed:
 * - `itemRenderer`
 * - `labelKey`
 * - `valueKey`
 * - `getItemLabel`
 * - `getItemValue`
 * - `getItemProps`
 */
export interface TreeProps<T extends TreeItemNode>
  extends TreeHTMLAttributes,
    TreeExpansion,
    TreeSelection {
  /** @see {@link TreeData} */
  data: TreeData<T>;

  /**
   * An optional ref to pass to the tree element.
   *
   * @remarks \@since 6.0.0
   */
  treeRef?: Ref<HTMLUListElement>;

  /** @defaultValue `identity` */
  sort?: TreeItemSorter<T>;

  /**
   * Any nodes in the {@Link data} that have a `parentId` set to this value will
   * appear at the root of the tree.
   *
   * @defaultValue `null`
   */
  rootId?: string | null;

  /**
   * @defaultValue `"auto"`
   * @see {@link TreeExpansionMode}
   */
  expansionMode?: TreeExpansionMode;

  /**
   * Set this to `true` to display the expander icon to the left instead of the
   * right. This will also update the styles slightly so you can still provide a
   * `leftAddon`.
   *
   * @defaultValue `false`
   */
  expanderLeft?: boolean;

  /**
   * @defaultValue `getIcon("expander")`
   */
  expanderIcon?: ReactNode;

  /**
   * Set this to `true` to disable the collapse transition for all tree items.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;

  /**
   * Set this to `true` if the collapsed tree items should be removed from the
   * DOM instead of hidden using `display: none`. This _might_ improve
   * performance for large trees.
   *
   * @defaultValue `false`
   */
  temporaryChildItems?: boolean;

  /**
   * @example
   * Custom Tree Item Renderer
   * ```tsx
   * import type { TreeItemRendererProps } from "@react-md/core";
   * import { TreeItem, useKeyboardMovementContext, useTreeContext } from "@react-md/core";
   * import FolderIcon from "@react-md/material-icons/FolderIcon";
   * import FolderOpenIcon from "@react-md/material-icons/FolderOpenIcon";
   * import type { ReactElement } from "react";
   *
   * export function CustomTreeItem(props: TreeItemRendererProps): ReactElement {
   *   const { item, ...remaining  } = props;
   *   const id = useId();
   *   const { itemId } = item;
   *   const {
   *     data,
   *     expandedIds,
   *     selectedIds,
   *     toggleTreeItemExpansion,
   *     toggleTreeItemSelection,
   *   } = useTreeContext()
   *   const { activeDescendantId } = useKeyboardMovementContext();
   *
   *   const focused = id === activeDescendantId;
   *   const expanded = expandedIds.has(itemId);
   *   const selected = selectedIds.has(itemId);
   *   const children = ...; // do whatever
   *
   *   return (
   *     <TreeItem
   *       {...remaining}
   *       id={id}
   *       itemId={itemId}
   *       leftAddon={expanded ? <FolderOpenIcon /> : <FolderIcon />}
   *     >
   *       {children}
   *     </TreeItem>
   *   );
   * }
   * ```
   *
   * @see {@link DefaultTreeItemRenderer}
   * @defaultValue `DefaultTreeItemRenderer`
   */
  renderer?: ElementType<TreeItemRendererProps<T>>;

  /**
   * The link component to use for any tree item nodes that have a `to` or
   * `href`.
   *
   * @see {@link CustomLinkComponent}
   * @defaultValue `Link`
   */
  linkComponent?: CustomLinkComponent;
}

/**
 * **Client Component**
 *
 * @example
 * Simple Tree
 * ```tsx
 * import type { TreeData } from "@react-md/core";
 * import { Tree, useTree } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * const data: TreeData = {
 *   "item-1": {
 *     itemId: "item-1",
 *     parentId: null,
 *     name: "Root Level Item 1",
 *   },
 *   "item-2": {
 *     itemId: "item-2",
 *     parentId: "item-1",
 *     name: "A child for the first item",
 *   },
 *   "item-3": {
 *     itemId: "item-3",
 *     parentId: "item-1",
 *     children: "Another child for the first item",
 *   },
 * };
 *
 * function Example(): ReactElement {
 *   const tree = useTree({
 *     // can enable multiple selected items
 *     // multiSelect: true,
 *
 *     // can set default expanded and selected items
 *     // defaultSelectedIds: ["item-1"],
 *     // defaultExpandedIds: ["item-1"],
 *   });
 *
 *   return (
 *     <Tree
 *       {...tree}
 *       aria-label="Tree"
 *       data={data}
 *     />
 *   );
 * }
 * ```
 *
 * @see {@link TreeProps.renderer} for a custom tree item example.
 *
 * @remarks
 * \@since 6.0.0 There was a major API change and the `id` is now `optional`.
 * In addition, the following props were removed:
 * - `itemRenderer`
 * - `labelKey`
 * - `valueKey`
 * - `getItemLabel`
 * - `getItemValue`
 * - `getItemProps`
 */
export function Tree<T extends TreeItemNode>(
  props: LabelRequiredForA11y<TreeProps<T>>
): ReactElement {
  const {
    id,
    data,
    sort = identity,
    rootId = null,
    treeRef,
    className,
    expandedIds,
    selectedIds,
    toggleTreeItemSelection,
    selectMultipleTreeItems,
    toggleTreeItemExpansion,
    expandMultipleTreeItems,
    onClick,
    onFocus,
    onKeyDown,
    renderer: TreeItemRenderer = DefaultTreeItemRenderer,
    multiSelect = false,
    expansionMode = "auto",
    expanderIcon,
    expanderLeft = false,
    linkComponent,
    disableTransition = false,
    temporaryChildItems = false,
    ...remaining
  } = props;
  const treeId = useEnsuredId(id, "tree");
  const { items, treeItemChildIds } = useTreeItems({
    data,
    sort,
    rootId,
  });

  const { metadataLookup, movementContext, movementProps } = useTreeMovement({
    onClick,
    onFocus,
    onKeyDown,
    data,
    expandedIds,
    selectedIds,
    treeItemChildIds,
    toggleTreeItemExpansion,
    expandMultipleTreeItems,
  });

  const children = useMemo(() => {
    interface Options<T extends TreeItemNode> {
      depth: number;
      items: readonly RenderableTreeItemNode<T>[];
    }

    const renderTreeItems = (options: Options<T>): ReactNode => {
      const { depth, items } = options;

      return items.map((item) => {
        const { itemId, childItems } = item;
        let children: ReactNode;
        if (childItems) {
          children = renderTreeItems({
            items: childItems,
            depth: depth + 1,
          });
        }

        return (
          <TreeItemRenderer
            key={itemId}
            item={item}
            depth={depth}
            childItems={children}
          />
        );
      });
    };

    return renderTreeItems({
      depth: 0,
      items,
    });
  }, [TreeItemRenderer, items]);

  return (
    <TreeProvider
      data={data}
      rootId={rootId}
      multiSelect={multiSelect}
      selectedIds={selectedIds}
      expandedIds={expandedIds}
      expanderIcon={expanderIcon}
      expanderLeft={expanderLeft}
      expansionMode={expansionMode}
      metadataLookup={metadataLookup}
      disableTransition={disableTransition}
      temporaryChildItems={temporaryChildItems}
      toggleTreeItemSelection={toggleTreeItemSelection}
      toggleTreeItemExpansion={toggleTreeItemExpansion}
      selectMultipleTreeItems={selectMultipleTreeItems}
      expandMultipleTreeItems={expandMultipleTreeItems}
    >
      <LinkProvider value={linkComponent}>
        <KeyboardMovementProvider value={movementContext}>
          <List
            {...remaining}
            {...movementProps}
            id={treeId}
            ref={treeRef}
            role="tree"
            tabIndex={0}
            className={tree({ className })}
          >
            {children}
          </List>
        </KeyboardMovementProvider>
      </LinkProvider>
    </TreeProvider>
  );
}
