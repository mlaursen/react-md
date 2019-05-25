import React, {
  CSSProperties,
  forwardRef,
  FC,
  HTMLAttributes,
  ReactNode,
  ElementType,
} from "react";
import cn from "classnames";
import {
  ListItemChildren,
  ListItemChildrenProps,
  SimpleListItemProps,
} from "@react-md/list";
import { useInteractionStates } from "@react-md/states";
import { Omit, WithForwardedRef } from "@react-md/utils";

import BaseTreeItem from "./BaseTreeItem";
import TreeGroup from "./TreeGroup";
import TreeItemExpanderIcon from "./TreeItemExpanderIcon";
import { TreeItemInjectedProps, TreeProps } from "./types.d";

export interface TreeItemProps
  extends TreeItemInjectedProps,
    ListItemChildrenProps,
    Pick<TreeProps, "expanderIcon" | "expanderLeft">,
    Pick<SimpleListItemProps, "threeLines" | "height">,
    Omit<HTMLAttributes<HTMLSpanElement | HTMLAnchorElement>, "id"> {
  [key: string]: any;
  disabled?: boolean;
  className?: string;
  liStyle?: CSSProperties;
  liClassName?: string;
  children?: ReactNode;
  contentComponent?: ElementType;
  isLink?: boolean;
}

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<
  Pick<
    TreeItemProps,
    "contentComponent" | "height" | "threeLines" | "textChildren"
  >
>;
type WithDefaultProps = TreeItemProps & DefaultProps & WithRef;

const TreeItem: FC<TreeItemProps & WithRef> = providedProps => {
  const {
    id,
    depth,
    listSize,
    itemIndex,
    renderChildItems,
    expanded,
    selected,
    focused,
    className: propClassName,
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
    disableRipple,
    disableProgrammaticRipple,
    ...props
  } = providedProps as WithDefaultProps;
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

  const { ripples, className, handlers } = useInteractionStates({
    disabled,
    className: propClassName,
    handlers: isLink ? props : undefined,
    disableRipple,
    disableProgrammaticRipple,
    disableSpacebarClick: isLink,
  });

  const Content = contentComponent as ElementType;
  const a11y = {
    "aria-expanded": renderChildItems ? expanded : undefined,
    "aria-level": depth + 1,
    "aria-setsize": listSize,
    "aria-posinset": itemIndex + 1,
    "aria-disabled": disabled ? "true" : undefined,
    id,
    role: "treeitem",
    tabIndex: -1,
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
        {ripples}
      </Content>
      {group}
    </BaseTreeItem>
  );
};

const defaultProps: DefaultProps = {
  contentComponent: "span",
  height: "auto",
  threeLines: false,
  textChildren: true,
};

TreeItem.defaultProps = defaultProps;

export default forwardRef<HTMLLIElement, TreeItemProps>((props, ref) => (
  <TreeItem {...props} forwardedRef={ref} />
));
