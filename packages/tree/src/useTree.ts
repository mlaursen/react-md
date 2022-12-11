import type { TreeItemDefaultIds } from "./types";
import type { TreeExpansion } from "./useTreeExpansion";
import { useTreeExpansion } from "./useTreeExpansion";
import type { TreeSelection } from "./useTreeSelection";
import { useTreeSelection } from "./useTreeSelection";

/**
 * @remarks \@since 6.0.0
 */
export interface TreeHookOptions {
  /**
   * @defaultValue `false`
   */
  multiSelect?: boolean;

  /**
   * @defaultValue `[]`
   */
  defaultExpandedIds?: TreeItemDefaultIds;

  /**
   * @defaultValue `[]`
   */
  defaultSelectedIds?: TreeItemDefaultIds;
}

/**
 * @remarks \@since 6.0.0
 */
export interface TreeImplementation extends TreeSelection, TreeExpansion {}

/**
 * This is a convenience wrapper for the {@link useTreeExpansion} and
 * {@link useTreeSelection} hooks since they will almost always be used together.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { TreeData } from "@react-md/tree";
 * import { Tree, useTree } from "@react-md/tree";
 * import type { ReactElement } from "react";
 *
 * const data: TreeData = {
 *   // pretend data
 * };
 *
 * function Example(): ReactElement {
 *   const tree = useTree();
 *
 *   return <Tree {...tree} data={data} aria-label="Tree" />;
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function useTree(options: TreeHookOptions = {}): TreeImplementation {
  const {
    multiSelect = false,
    defaultExpandedIds,
    defaultSelectedIds,
  } = options;

  return {
    ...useTreeExpansion(defaultExpandedIds),
    ...useTreeSelection(defaultSelectedIds, multiSelect),
  };
}
