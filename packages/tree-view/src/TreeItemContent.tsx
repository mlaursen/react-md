import * as React from "react";
import cn from "classnames";
import { IconRotator } from "@react-md/icon";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
import { IListItemBaseProps, ListItemText, ListItemLeftIcon, ListItemRightIcon } from "@react-md/list";

export interface ITreeItemContentProps extends IListItemBaseProps, React.HTMLAttributes<HTMLDivElement> {
  expanded: boolean;
}

const TreeItemContent: React.SFC<ITreeItemContentProps> = ({
  className,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  onKeyUp,
  onKeyDown,
  expanded,
  leftIcon,
  rightIcon,
  forceIconWrap,
  children,
  ...props
}) => (
  <div
    {...props}
    className={cn(
      "rmd-tree-item__content rmd-list-item",
      {
        "rmd-list-item--stateful": true,
        "rmd-list-item--medium": !!(leftIcon || rightIcon),
      },
      className
    )}
  >
    <ListItemLeftIcon icon={leftIcon} forceIconWrap={forceIconWrap}>
      <ListItemRightIcon icon={rightIcon} forceIconWrap={forceIconWrap}>
        {children}
      </ListItemRightIcon>
    </ListItemLeftIcon>
  </div>
);

export default TreeItemContent;
