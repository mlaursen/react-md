import * as React from "react";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";

/**
 * The `TreeItem` component is an extremely simple component that just renders an `li` element
 * with the "base" tree item props and any children provided. This should be used in combination
 * with the `TreeItemContent` and `TreeGroup` components to get a fully functional tree item.
 *
 * If you want to render the treeitem as a link, please use the `TreeLinkItem` component instead
 * of this one.
 */
export interface ITreeItemBaseProps {
  /**
   * An optional aria-expanded attribute to apply to the tree item. This should only be provided as the value "true"
   * and only if it is currently expanded. It should be `undefined` otherwise.
   *
   * @docgen
   */
  "aria-expanded"?: "true";

  /**
   * The current level (depth) for the tree item.
   *
   * @docgen
   */
  "aria-level": number;

  /**
   * The tree item's current position within the parent treeview or a sub-group. This should be a number starting
   * from `1`.
   *
   * @docgen
   */
  "aria-posinset": number;

  /**
   * The size of the treeview or sub-group that the tree item is in. This should be a number starting from `1`.
   *
   * @docgen
   */
  "aria-setsize": number;

  /**
   * The tabindex for the tree item. When working with a single-selection tree view, **only 1 treeitem** can have a
   * tab index of `0` while all other treeitems should have a tab index of `-1`.
   *
   * It is generally recommended to keep this prop `undefined` and let the `selected` prop handle setting the correct
   * `tabIndex` instead. However, you can manually override the built-in behavior by setting this to valid number.
   *
   * @docgen
   */
  tabIndex?: 0 | -1;

  /**
   * Boolean if the tree item is current selected. This will update the styles to be have the selected state as well
   * as changing the `tabIndex` from `-1` to `0` so it is focusable. If the `tabIndex` prop is defined, that value
   * will **always** be used instead.
   *
   * @docgen
   */
  selected?: boolean;
}

export type ITreeItemProps = React.HTMLAttributes<HTMLLIElement> & ITreeItemBaseProps;

export interface ITreeItemDefaultProps {
  selected: boolean;
}

export type TreeItemWithDefaultProps = ITreeItemProps & ITreeItemDefaultProps;

const TreeItem: React.SFC<ITreeItemProps> = providedProps => {
  const {
    className,
    selected,
    tabIndex: propTabIndex,
    children,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onKeyDown,
    onKeyUp,
    ...props
  } = providedProps as TreeItemWithDefaultProps;

  let tabIndex = propTabIndex;
  if (typeof tabIndex !== "number") {
    tabIndex = selected ? 0 : -1;
  }

  return (
    <StatesConsumer
      selected={selected}
      className={cn("rmd-tree-item", className)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
    >
      {statesProps => (
        <li {...statesProps} {...props} role="treeitem" tabIndex={tabIndex}>
          {children}
        </li>
      )}
    </StatesConsumer>
  );
};

export default TreeItem;
