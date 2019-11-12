import React, { FC, forwardRef, useCallback } from "react";
import cn from "classnames";
import { FontIcon } from "@react-md/icon";
import { ListItemChildren, ListElement } from "@react-md/list";
import { useInteractionStates } from "@react-md/states";
import { bem, WithForwardedRef } from "@react-md/utils";

import TreeGroup from "./TreeGroup";
import TreeItemExpanderIcon from "./TreeItemExpanderIcon";
import { TreeItemProps } from "./types";

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<
  Pick<
    TreeItemProps,
    | "contentComponent"
    | "expanderLeft"
    | "expanderIcon"
    | "disabled"
    | "height"
    | "threeLines"
    | "textChildren"
  >
>;
type WithDefaultProps = TreeItemProps & DefaultProps & WithRef;

const block = bem("rmd-tree-item");

/**
 * This component renders an item within a tree with optional child items. This should almost always
 * be used from the `itemRenderer` prop from the `Tree` component as it provides a lot of the required
 * a11y props for you.
 */
const TreeItem: FC<TreeItemProps & WithRef> = providedProps => {
  const {
    id,
    className: propClassName,
    liStyle,
    liClassName,
    liRef,
    forwardedRef,
    depth,
    listSize,
    itemIndex,
    renderChildItems,
    expanded,
    selected,
    focused,
    expanderIcon,
    expanderLeft,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    leftIcon: propLeftIcon,
    leftAvatar,
    rightIcon: propRightIcon,
    rightAvatar,
    forceIconWrap,
    height,
    threeLines,
    children,
    contentComponent: Content,
    isLink: propIsLink,
    disabled,
    readOnly,
    onFocus,
    ...props
  } = providedProps as WithDefaultProps;

  const isLink =
    typeof propIsLink === "boolean"
      ? propIsLink
      : typeof Content !== "string" || Content === "a";

  const { ripples, className, handlers } = useInteractionStates({
    disabled,
    className: propClassName,
    handlers: isLink ? props : undefined,
    disableSpacebarClick: isLink,
  });

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

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLLIElement>) => {
      if (onFocus) {
        onFocus(event);
      }

      event.preventDefault();
      const tree = event.currentTarget.closest('[role="tree"]');
      if (tree) {
        (tree as ListElement).focus();
      }
    },
    [onFocus]
  );

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
    onFocus: handleFocus,
  };
  const noA11y = { role: "none" };

  return (
    <li
      {...(isLink ? noA11y : a11y)}
      ref={liRef}
      style={liStyle}
      className={cn(block(), liClassName)}
    >
      <Content
        {...props}
        {...(isLink ? a11y : undefined)}
        ref={forwardedRef}
        className={cn(
          block("content", {
            link: isLink,
            clickable: !disabled && !readOnly,
            [height]: height !== "auto" && height !== "normal",
            "three-lines": !!secondaryText && threeLines,
            selected,
            focused,
          }),
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
    </li>
  );
};

const defaultProps: DefaultProps = {
  contentComponent: "span",
  expanderLeft: false,
  expanderIcon: <FontIcon>keyboard_arrow_down</FontIcon>,
  disabled: false,
  height: "auto",
  threeLines: false,
  textChildren: true,
};

TreeItem.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TreeItem.displayName = "TreeItem";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TreeItem.propTypes = {
      id: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      itemIndex: PropTypes.number.isRequired,
      listSize: PropTypes.number.isRequired,
      selected: PropTypes.bool.isRequired,
      expanded: PropTypes.bool.isRequired,
      focused: PropTypes.bool.isRequired,
      renderChildItems: PropTypes.func,
      liStyle: PropTypes.object,
      liClassName: PropTypes.string,
      isLink: PropTypes.bool,
      contentComponent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      disabled: PropTypes.bool,
      expanderLeft: PropTypes.bool,
      expanderIcon: PropTypes.node,
      height: PropTypes.oneOf([
        "auto",
        "normal",
        "medium",
        "large",
        "extra-large",
      ]),
      threeLines: PropTypes.bool,
      textChildren: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLLIElement, TreeItemProps>((props, ref) => (
  <TreeItem {...props} forwardedRef={ref} />
));
