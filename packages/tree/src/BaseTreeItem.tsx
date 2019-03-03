import React, {
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  CSSProperties,
  Fragment,
  createElement,
  ComponentType,
  ReactType,
} from "react";
import cn from "classnames";
import {
  getListItemHeight,
  IListItemProps,
  ListItemChildren,
  SimpleListItem,
  IListItemChildrenProps,
  ISimpleListItemProps,
} from "@react-md/list";
import {
  IInteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { IWithForwardedRef, Omit } from "@react-md/utils";

import { ITreeItemA11yProps } from "./types.d";

export interface IBaseTreeItemProps
  extends IWithForwardedRef<HTMLLIElement>,
    HTMLAttributes<HTMLLIElement> {}

interface IBaseTreeItemDefaultProps {
  role: "none" | "treeitem";
}

type BaseTreeItemWithDefaultProps = IBaseTreeItemProps &
  IBaseTreeItemDefaultProps;

/**
 * The `BaseTreeItem` component is an extremely simple component that just renders an `li` element
 * with the "base" tree item props and any children provided. This should be used in combination
 * with the `TreeItemContent` and `TreeGroup` components to get a fully functional tree item.
 *
 * If you want to render the treeitem as a link, please use the `TreeLinkItem` component instead
 * of this one.
 */
const BaseTreeItem: FunctionComponent<IBaseTreeItemProps> = providedProps => {
  const {
    className,
    children,
    forwardedRef,
    ...props
  } = providedProps as BaseTreeItemWithDefaultProps;

  return (
    <li
      {...props}
      ref={forwardedRef}
      className={cn("rmd-tree-item", className)}
    >
      {children}
    </li>
  );
};

const defaultProps: IBaseTreeItemDefaultProps = {
  role: "treeitem",
};

BaseTreeItem.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  BaseTreeItem.displayName = "BaseTreeItem";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    BaseTreeItem.propTypes = {
      "aria-expanded": PropTypes.oneOfType([
        PropTypes.oneOf(["true", "false"]),
        PropTypes.bool,
      ]),
      "aria-level": PropTypes.number,
      "aria-posinset": PropTypes.number,
      "aria-setsize": PropTypes.number,
      tabIndex: PropTypes.oneOf([0, -1]),
      className: PropTypes.string,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLLIElement, IBaseTreeItemProps>((props, ref) => (
  <BaseTreeItem {...props} forwardedRef={ref} />
));
