import { forwardRef, useCallback } from "react";
import cn from "classnames";
import { useIcon } from "@react-md/icon";
import type { ListElement } from "@react-md/list";
import { ListItemChildren } from "@react-md/list";
import { useInteractionStates } from "@react-md/states";
import { bem } from "@react-md/utils";

import { TreeGroup } from "./TreeGroup";
import { TreeItemExpanderIcon } from "./TreeItemExpanderIcon";
import type { TreeItemProps, TreeItemWithContentComponentProps } from "./types";

const block = bem("rmd-tree-item");

/**
 * This component renders an item within a tree with optional child items. This
 * should almost always be used from the `itemRenderer` prop from the `Tree`
 * component as it provides a lot of the required a11y props for you.
 */
export const TreeItem = forwardRef<
  HTMLLIElement,
  TreeItemProps | TreeItemWithContentComponentProps
>(function TreeItem(
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
    leftAddon: propLeftAddon,
    leftAddonType = "icon",
    leftAddonPosition = "middle",
    rightAddon: propRightAddon,
    rightAddonType = "icon",
    rightAddonPosition = "middle",
    forceAddonWrap,
    height = "auto",
    threeLines = false,
    children,
    contentComponent: Content = "span",
    isLink: propIsLink,
    disabled = false,
    readOnly,
    onFocus,
    onKeyUp,
    onKeyDown,
    onClick,
    onMouseUp,
    onMouseDown,
    onMouseLeave,
    onTouchMove,
    onTouchEnd,
    onTouchStart,
    ...props
  },
  ref
) {
  const expanderIcon = useIcon("expander", propExpanderIcon);

  const isLink =
    typeof propIsLink === "boolean"
      ? propIsLink
      : typeof Content !== "string" || Content === "a";

  const { ripples, className, handlers } = useInteractionStates({
    disabled,
    className: propClassName,
    handlers: {
      onKeyUp,
      onKeyDown,
      onClick,
      onMouseUp,
      onMouseDown,
      onMouseLeave,
      onTouchMove,
      onTouchEnd,
      onTouchStart,
    },
    disableSpacebarClick: isLink,
  });

  let group;
  let leftAddon = propLeftAddon;
  let rightAddon = propRightAddon;
  if (renderChildItems) {
    const icon = (
      <TreeItemExpanderIcon rotated={expanded}>
        {expanderIcon}
      </TreeItemExpanderIcon>
    );
    if (expanderLeft) {
      leftAddon = icon;
    } else {
      rightAddon = icon;
    }

    group = <TreeGroup collapsed={!expanded}>{renderChildItems()}</TreeGroup>;
  }

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLLIElement>) => {
      if (onFocus) {
        onFocus(event);
      }

      event.preventDefault();
      event.currentTarget.closest<ListElement>('[role="tree"]')?.focus();
    },
    [onFocus]
  );

  const a11y = {
    "aria-expanded": renderChildItems ? expanded : undefined,
    "aria-selected": selected,
    "aria-level": depth + 1,
    "aria-setsize": listSize,
    "aria-posinset": itemIndex + 1,
    "aria-disabled": disabled || undefined,
    id,
    role: "treeitem",
    tabIndex: -1,
    ...handlers,
    onFocus: handleFocus,
  } as const;
  const noA11y = { role: "none" } as const;

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
        ref={ref}
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
          leftAddon={leftAddon}
          leftAddonType={leftAddonType}
          leftAddonPosition={leftAddonPosition}
          rightAddon={rightAddon}
          rightAddonType={rightAddonType}
          rightAddonPosition={rightAddonPosition}
          forceAddonWrap={forceAddonWrap}
        >
          {children}
        </ListItemChildren>
        {ripples}
      </Content>
      {group}
    </li>
  );
});
