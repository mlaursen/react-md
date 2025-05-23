"use client";

import { type TreeDefaultIds } from "./types.js";
import { type TreeExpansion, useTreeExpansion } from "./useTreeExpansion.js";
import { type TreeSelection, useTreeSelection } from "./useTreeSelection.js";

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
  defaultExpandedIds?: TreeDefaultIds;

  /**
   * @defaultValue `[]`
   */
  defaultSelectedIds?: TreeDefaultIds;
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
 * import { Tree } from "@react-md/core/tree/Tree";
 * import { type TreeData } from "@react-md/core/tree/types";
 * import { useTree } from "@react-md/core/tree/useTree";
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
 * @see {@link https://react-md.dev/components/tree | Tree Demos}
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
