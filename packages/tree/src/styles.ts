import type { InternalListItemClassNameOptions } from "@react-md/core";
import { bem, listItem } from "@react-md/core";
import { cnb } from "cnbuilder";

const treeStyles = bem("rmd-tree");
const treeItemStyles = bem("rmd-tree-item");
const treeGroupStyles = bem("rmd-tree-group");

/** @remarks \@since 6.0.0 */
export interface TreeClassNameOptions {
  className?: string;
}

/**
 * Apply the `className`s for a tree component. This will be type-safe if using
 * typescript.
 *
 * @remarks \@since 6.0.0
 */
export function tree(options: TreeClassNameOptions = {}): string {
  const { className } = options;

  return cnb(treeStyles(), className);
}

/** @remarks \@since 6.0.0 */
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
 * @remarks \@since 6.0.0
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

/** @remarks \@since 6.0.0 */
export interface TreeItemContentClassNameOptions
  extends InternalListItemClassNameOptions {
  /**
   * Set this
   *
   * @defaultValue `false`
   */
  link?: boolean;

  /**
   *
   *
   * @defaultValue `false`
   */
  padded?: boolean;

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
 * @remarks \@since 6.0.0
 */
export function treeItemContent(
  options: TreeItemContentClassNameOptions = {}
): string {
  const {
    className,
    link = false,
    padded = false,
    focused,
    selected,
    disabled = false,
    ...remaining
  } = options;

  return cnb(
    treeItemStyles("content", {
      link,
      padded,
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
 * @remarks \@since 6.0.0
 */
export interface TreeItemMediaClassNameOptions {
  className?: string;
  isLeafNode: boolean;
  isMediaLeftAddon: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function treeItemMedia(options: TreeItemMediaClassNameOptions): string {
  const { isLeafNode, isMediaLeftAddon, className } = options;

  return cnb(
    isMediaLeftAddon && treeItemStyles("media", { single: isLeafNode }),
    className
  );
}

/** @remarks \@since 6.0.0 */
export interface TreeGroupClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function treeGroup(options: TreeGroupClassNameOptions = {}): string {
  const { className } = options;

  return cnb(treeGroupStyles(), className);
}
