import * as React from "react";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";

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
  selected,
  tabIndex: propTabIndex,
  onMouseUp,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onKeyDown,
  onKeyUp,
  group,
  ...props
}) => {
  let tabIndex = propTabIndex;
  if (typeof tabIndex !== "number") {
    tabIndex = selected ? 0 : -1;
  }

  return (
    <li style={liStyle} className={cn("rmd-tree-item", liClassName)} role="none">
      <StatesConsumer
        selected={selected}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
      >
        {statesProps => <TreeItemContent {...statesProps} {...props} role="treeitem" tabIndex={tabIndex} />}
      </StatesConsumer>
      {group}
    </li>
  );
};

export default TreeLinkItem;
