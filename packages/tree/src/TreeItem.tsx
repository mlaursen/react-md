import React, {
  FunctionComponent,
  ReactType,
  ReactElement,
  ReactNode,
  CSSProperties,
  HTMLAttributes,
} from "react";
import cn from "classnames";
import {
  IListItemChildrenProps,
  ListItemChildren,
  ISimpleListItemProps,
  ListItemHeight,
} from "@react-md/list";
import {
  useInteractionStates,
  useRipplesState,
  RippleContainer,
} from "@react-md/states";
import { IWithForwardedRef, Omit } from "@react-md/utils";

import BaseTreeItem from "./BaseTreeItem";
import TreeItemExpanderIcon from "./TreeItemExpanderIcon";
import TreeGroup from "./TreeGroup";
import { ITreeItemInjectedProps, ITreeProps } from "./types.d";

export interface ITreeItemProps
  extends ITreeItemInjectedProps,
    IListItemChildrenProps,
    Pick<ITreeProps, "expanderIcon" | "expanderLeft">,
    Pick<ISimpleListItemProps, "threeLines" | "height">,
    Omit<HTMLAttributes<HTMLSpanElement | HTMLAnchorElement>, "id">,
    IWithForwardedRef<HTMLLIElement> {
  [key: string]: any;
  className?: string;
  liStyle?: CSSProperties;
  liClassName?: string;
  children?: ReactNode;
  contentComponent?: ReactType;
  isLink?: boolean;
}

interface ITreeItemDefaultProps {
  contentComponent: ReactType;
  height: ListItemHeight;
  threeLines: boolean;
  textChildren: boolean;
}

type TreeItemWithDefaultProps = ITreeItemProps & ITreeItemDefaultProps;

const TreeItem: FunctionComponent<ITreeItemProps> = providedProps => {
  const {
    id,
    depth,
    listSize,
    itemIndex,
    renderChildItems,
    expanded,
    selected,
    focused,
    className,
    contentComponent,
    isLink: propIsLink,
    expanderIcon,
    expanderLeft,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    forwardedRef,
    leftIcon: propLeftIcon,
    leftAvatar,
    rightIcon: propRightIcon,
    rightAvatar,
    forceIconWrap,
    height,
    threeLines,
    children,
    ...props
  } = providedProps as TreeItemWithDefaultProps;
  const { disabled } = props;

  let isLink = propIsLink;
  if (typeof isLink === "undefined") {
    isLink = contentComponent !== "span";
  }
  let group;
  let leftIcon = propLeftIcon;
  let rightIcon = propRightIcon;
  if (renderChildItems) {
    const icon = (
      <TreeItemExpanderIcon rotated={expanded}>
        {expanderIcon}
      </TreeItemExpanderIcon>
    );
    if (expanderLeft) {
      leftIcon = icon;
    } else {
      rightIcon = icon;
    }

    group = <TreeGroup collapsed={!expanded}>{renderChildItems()}</TreeGroup>;
  }

  const { ripples, setRipples, handlers } = useRipplesState({
    disabled,
    handlers: isLink ? props : undefined,
  });

  const Content = contentComponent as ReactType;
  const a11y = {
    "aria-expanded": renderChildItems ? expanded : undefined,
    "aria-level": depth + 1,
    "aria-setsize": listSize,
    "aria-posinset": itemIndex + 1,
    "aria-disabled": disabled ? "true" : undefined,
    id,
    role: "treeitem",
    tabIndex: selected ? 0 : -1,
    ...handlers,
  };
  const noA11y = { role: "none" };

  return (
    <BaseTreeItem ref={forwardedRef} {...(isLink ? noA11y : a11y)}>
      <Content
        {...props}
        {...(isLink ? a11y : undefined)}
        className={cn(
          "rmd-tree-item__content",
          {
            "rmd-tree-item__content--link": isLink,
            "rmd-tree-item__content--clickable": !disabled,
            [`rmd-tree-item__content--${height}`]:
              height !== "auto" && height !== "normal",
            "rmd-tree-item__content--three-lines":
              !!secondaryText && threeLines,
            "rmd-states--focused": focused,
            "rmd-tree-item__content--selected": selected,
          },
          className
        )}
      >
        <ListItemChildren
          textClassName={textClassName}
          secondaryTextClassName={secondaryTextClassName}
          textChildren={textChildren}
          primaryText={primaryText}
          secondaryText={secondaryText}
          leftIcon={leftIcon}
          leftAvatar={leftAvatar}
          rightIcon={rightIcon}
          rightAvatar={rightAvatar}
          forceIconWrap={forceIconWrap}
        >
          {children}
        </ListItemChildren>
        <RippleContainer ripples={ripples} setRipples={setRipples} />
      </Content>
      {group}
    </BaseTreeItem>
  );
};

const defaultProps: ITreeItemDefaultProps = {
  contentComponent: "span",
  height: "auto",
  threeLines: false,
  textChildren: true,
};

TreeItem.defaultProps = defaultProps;

export default TreeItem;
