import * as React from "react";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";
import { IListItemBaseProps, ListItemText, ListItemLeftIcon, ListItemRightIcon } from "@react-md/list";

import { ITreeItemDefaultProps } from "./TreeItem";

export interface ITreeItemContentBaseProps extends IListItemBaseProps {
  // TODO: Learn how to correctly type this
  linkComponent?: React.ReactType;
  medium?: boolean;
}

export type ITreeItemContentDivProps = ITreeItemContentBaseProps & React.HTMLAttributes<HTMLDivElement>;
export interface ITreeItemContentLinkProps extends ITreeItemContentBaseProps, React.HTMLAttributes<HTMLAnchorElement> {
  [key: string]: any;
  linkComponent?: React.ReactType;
}

export type ITreeItemContentProps = ITreeItemContentDivProps | ITreeItemContentLinkProps;
export interface ITreeItemContentDefaultProps {
  medium: boolean;
  linkComponent: React.ReactType;
}
export type TreeItemContentWithDefaultProps = ITreeItemContentProps &
  ITreeItemContentDefaultProps &
  ITreeItemDefaultProps;

const TreeItemContent: React.SFC<ITreeItemContentProps> = providedProps => {
  const {
    className: propClassName,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onKeyDown,
    onKeyUp,
    linkComponent,
    leftIcon,
    rightIcon,
    forceIconWrap,
    children,
    medium,
    ...props
  } = providedProps as TreeItemContentWithDefaultProps;

  const className = cn(
    "rmd-tree-item__content",
    {
      "rmd-tree-item__content--link": !!linkComponent,
    },
    "rmd-list-item rmd-list-item--stateful",
    {
      "rmd-list-item--medium": medium && !!linkComponent,
    },
    propClassName
  );

  const content = (
    <ListItemLeftIcon icon={leftIcon} forceIconWrap={forceIconWrap}>
      <ListItemRightIcon icon={rightIcon} forceIconWrap={forceIconWrap}>
        <ListItemText>{children}</ListItemText>
      </ListItemRightIcon>
    </ListItemLeftIcon>
  );

  if (!linkComponent) {
    const divProps = props as ITreeItemContentDivProps;
    return (
      <div {...divProps} className={className}>
        {content}
      </div>
    );
  }

  return React.createElement(
    linkComponent,
    {
      ...props,
      className,
    },
    content
  );
};

TreeItemContent.defaultProps = {
  medium: false,
} as ITreeItemContentDefaultProps;

export default TreeItemContent;
