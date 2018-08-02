import * as React from "react";
import cn from "classnames";

import { ITreeItemBaseProps } from "./TreeItem";
import { default as TreeItemContent, ITreeItemContentBaseProps } from "./TreeItemContent";

export interface ITreeLinkItemProps extends ITreeItemBaseProps, ITreeItemContentBaseProps {
  liStyle?: React.CSSProperties;
  liClassName?: string;
  href?: string;
  linkComponent?: React.ReactType;
  group?: React.ReactNode;
}

export type TreeLinkItemProps = ITreeLinkItemProps & React.HTMLAttributes<HTMLAnchorElement>;

const TreeLinkItem: React.SFC<TreeLinkItemProps> = ({
  liStyle,
  liClassName,
  className,
  tabIndex: propTabIndex,
  group,
  ...props
}) => {
  let tabIndex = propTabIndex;
  if (typeof tabIndex !== "number") {
    tabIndex = props.selected ? 0 : -1;
  }

  return (
    <li style={liStyle} className={cn("rmd-tree-item", liClassName)} role="none">
      <TreeItemContent {...props} role="treeitem" tabIndex={tabIndex} />
      {group}
    </li>
  );
};

export default TreeLinkItem;
