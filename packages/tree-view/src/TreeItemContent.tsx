import * as React from "react";
import cn from "classnames";
import { IconRotator } from "@react-md/icon";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
import { IListItemBaseProps, ListItemText, ListItemLeftIcon, ListItemRightIcon } from "@react-md/list";

export interface ITreeItemContentBaseProps extends IListItemBaseProps {
  link?: boolean;
  linkComponent?: React.ReactType;
  expanded: boolean;
  medium?: boolean;
}

export interface ITreeItemContentDivProps extends ITreeItemContentBaseProps, React.HTMLAttributes<HTMLDivElement> {
}

export interface ITreeItemContentAnchorProps
  extends ITreeItemContentBaseProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  [key: string]: any;
  link: boolean;
  linkComponent?: React.ReactType;
}

export type ITreeItemContentProps = ITreeItemContentDivProps | ITreeItemContentAnchorProps;

export interface ITreeItemContentDefaultProps {
  linkComponent: React.ReactType;
  medium: boolean;
}

export type TreeItemContentWithDefaultProps = ITreeItemContentProps & ITreeItemContentDefaultProps;

const TreeItemContent: React.SFC<ITreeItemContentProps> = providedProps => {
  const {
    className,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onKeyUp,
    onKeyDown,
    medium,
    expanded,
    leftIcon,
    rightIcon,
    forceIconWrap,
    children,
    link,
    linkComponent,
    ...props
  } = providedProps as TreeItemContentWithDefaultProps;

  const content = (
    <ListItemLeftIcon icon={leftIcon} forceIconWrap={forceIconWrap}>
      <ListItemRightIcon icon={rightIcon} forceIconWrap={forceIconWrap}>
        {children}
      </ListItemRightIcon>
    </ListItemLeftIcon>
  );

  return React.createElement(
    link ? linkComponent : "div",
    {
      ...props,
      className: cn(
        "rmd-tree-item__content rmd-list-item rmd-list-item--stateful",
        {
          "rmd-tree-item__content--link": link,
        },
        className
      ),
    },
    content
  );
};

TreeItemContent.defaultProps = {
  medium: true,
  linkComponent: "a",
} as ITreeItemContentDefaultProps;

export default TreeItemContent;
