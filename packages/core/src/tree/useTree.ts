"use client";
import type { TreeItemDefaultIds } from "./types.js";
import type { TreeExpansion } from "./useTreeExpansion.js";
import { useTreeExpansion } from "./useTreeExpansion.js";
import type { TreeSelection } from "./useTreeSelection.js";
import { useTreeSelection } from "./useTreeSelection.js";

/**
 * @since 6.0.0
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
 * @since 6.0.0
 */
export interface TreeImplementation extends TreeSelection, TreeExpansion {}

/**
 * This is a convenience wrapper for the {@link useTreeExpansion} and
 * {@link useTreeSelection} hooks since they will almost always be used together.
 *
 * @example Simple Example
 * ```tsx
 * import type { TreeData } from "@react-md/core";
 * import { Tree, useTree } from "@react-md/core";
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
 * @since 6.0.0
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
