import { cnb } from "cnbuilder";

import { type InternalListItemClassNameOptions } from "../list/listItemStyles.js";
import { listItem } from "../list/listItemStyles.js";
import { bem } from "../utils/bem.js";

const treeStyles = bem("rmd-tree");
const treeItemStyles = bem("rmd-tree-item");
const treeGroupStyles = bem("rmd-tree-group");

declare module "react" {
  interface CSSProperties {
    "--rmd-tree-depth"?: number;
    "--rmd-tree-item-padding"?: string | number;
    "--rmd-tree-item-padding-base"?: string | number;
    "--rmd-tree-item-padding-incrementor"?: string | number;
  }
}

/** @since 6.0.0 */
export interface TreeClassNameOptions {
  className?: string;
}

/**
 * Apply the `className`s for a tree component. This will be type-safe if using
 * typescript.
 *
 * @since 6.0.0
 */
export function tree(options: TreeClassNameOptions = {}): string {
  const { className } = options;

  return cnb(treeStyles(), className);
}

/** @since 6.0.0 */
export interface TreeItemClassNameOptions {
  className?: string;
  expander?: boolean;

  /**
   * Settings this to `true` will update the styles for the expander icon within
   * the tree item to rotate `down -> right` instead of `down -> left`.
   *
   * @defaultValue `false`
   */
  expanderLeft?: boolean;
}

/**
 * Apply the `className`s for a tree item component. This will be type-safe if
 * using typescript.
 *
 * @since 6.0.0
 */
export function treeItem(options: TreeItemClassNameOptions = {}): string {
  const { className, expander = false, expanderLeft = false } = options;

  return cnb(
    treeItemStyles({
      "expander-left": expander && expanderLeft,
      "expander-right": expander && !expanderLeft,
    }),
    className
  );
}

/** @since 6.0.0 */
export interface TreeItemContentClassNameOptions
  extends InternalListItemClassNameOptions {
  /**
   * Set this
   *
   * @defaultValue `false`
   */
  link?: boolean;

  /**
   * Set this to `true` when the tree item is the current keyboard focus with
   * `aria-activedescendant`. This will apply the focus styles only while the
   * parent tree component is focused and the user is in keyboard mode.
   *
   *
   * @defaultValue `false`
   */
  focused?: boolean;

  /**
   * Set this to `true` hen the tree item has been selected by the user. The
   * default styles just
   *
   * @defaultValue `false`
   */
  selected?: boolean;
}

/**
 * @since 6.0.0
 */
export function treeItemContent(
  options: TreeItemContentClassNameOptions = {}
): string {
  const {
    className,
    link = false,
    focused,
    selected,
    disabled = false,
    ...remaining
  } = options;

  return cnb(
    treeItemStyles("content", {
      link,
      focused,
      selected,
      disabled,
    }),
    listItem({
      className,
      disabled,
      ...remaining,
    })
  );
}

/**
 * @since 6.0.0
 */
export interface TreeItemMediaClassNameOptions {
  className?: string;
  isLeafNode: boolean;
  isMediaLeftAddon: boolean;
}

/**
 * @since 6.0.0
 */
export function treeItemMedia(options: TreeItemMediaClassNameOptions): string {
  const { isLeafNode, isMediaLeftAddon, className } = options;

  return cnb(
    isMediaLeftAddon && treeItemStyles("media", { single: isLeafNode }),
    className
  );
}

/** @since 6.0.0 */
export interface TreeGroupClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function treeGroup(options: TreeGroupClassNameOptions = {}): string {
  const { className } = options;

  return cnb(treeGroupStyles(), className);
}
