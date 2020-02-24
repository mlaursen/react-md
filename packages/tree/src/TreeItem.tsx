import React, { forwardRef, ReactElement, Ref, useCallback } from "react";
import { cnb } from "cnbuilder";
import { useIcon } from "@react-md/icon";
import { ListElement, ListItemChildren } from "@react-md/list";
import { useInteractionStates } from "@react-md/states";
import { bem } from "@react-md/utils";

import TreeGroup from "./TreeGroup";
import TreeItemExpanderIcon from "./TreeItemExpanderIcon";
import { TreeItemProps, TreeItemWithContentComponentProps } from "./types";

const block = bem("rmd-tree-item");

/**
 * This component renders an item within a tree with optional child items. This
 * should almost always be used from the `itemRenderer` prop from the `Tree`
 * component as it provides a lot of the required a11y props for you.
 */
function TreeItem(
  {
    id,
    className: propClassName,
    liStyle,
    liClassName,
    liRef,
    depth,
    listSize,
    itemIndex,
    renderChildItems,
    expanded,
    selected,
    focused,
    expanderIcon: propExpanderIcon,
    expanderLeft = false,
    textClassName,
    secondaryTextClassName,
    textChildren = true,
    primaryText,
    secondaryText,
    leftIcon: propLeftIcon,
    leftAvatar,
    rightIcon: propRightIcon,
    rightAvatar,
    forceIconWrap,
    height = "auto",
    threeLines = false,
    children,
    contentComponent: Content = "span",
    isLink: propIsLink,
    disabled = false,
    readOnly,
    onFocus,
    ...props
  }: TreeItemProps,
  ref?: Ref<HTMLLIElement>
): ReactElement {
  const expanderIcon = useIcon("expander", propExpanderIcon);

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
      className={cnb(block(), liClassName)}
    >
      <Content
        {...props}
        {...(isLink ? a11y : undefined)}
        ref={ref}
        className={cnb(
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
}

const ForwardedTreeItem = forwardRef<
  HTMLLIElement,
  TreeItemProps | TreeItemWithContentComponentProps
>(TreeItem);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTreeItem.propTypes = {
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
  } catch (e) {}
}

export default ForwardedTreeItem;
