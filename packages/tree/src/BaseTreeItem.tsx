import React, { forwardRef, FC, HTMLAttributes } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export interface BaseTreeItemProps extends HTMLAttributes<HTMLLIElement> {}

interface DefaultProps {
  role: "none" | "treeitem";
}

type WithRef = WithForwardedRef<HTMLLIElement>;
type WithDefaultProps = BaseTreeItemProps & DefaultProps & WithRef;

/**
 * The `BaseTreeItem` component is an extremely simple component that just renders an `li` element
 * with the "base" tree item props and any children provided. This should be used in combination
 * with the `TreeItemContent` and `TreeGroup` components to get a fully functional tree item.
 *
 * If you want to render the treeitem as a link, please use the `TreeLinkItem` component instead
 * of this one.
 */
const BaseTreeItem: FC<BaseTreeItemProps & WithRef> = providedProps => {
  const {
    className,
    children,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

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

const defaultProps: DefaultProps = {
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

export default forwardRef<HTMLLIElement, BaseTreeItemProps>((props, ref) => (
  <BaseTreeItem {...props} forwardedRef={ref} />
));
