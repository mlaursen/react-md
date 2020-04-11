import React, { forwardRef, ReactElement, Ref } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import getListItemHeight, { SimpleListItemProps } from "./getListItemHeight";
import ListItemChildren from "./ListItemChildren";

const block = bem("rmd-list-item");

/**
 * The `SimpleListItem` component is used to create a non-clickable item within
 * a `List`. This is really just useful since it allows for the `ListItem`
 * styling behavior of left and right icons, avatars, and media.
 *
 * Note: Even though this component exists, it is recommended to use the
 * `ListItemChildren` component instead if you want the "addon" styling/behavior
 * since screen readers read `li` items within lists differently.
 */
function SimpleListItem(
  {
    className,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    leftAddon,
    leftAddonType = "icon",
    leftAddonPosition = "middle",
    rightAddon,
    rightAddonType = "icon",
    rightAddonPosition = "middle",
    forceAddonWrap,
    children,
    height: propHeight = "auto",
    threeLines = false,
    "aria-disabled": ariaDisabled,
    disabled,
    clickable = false,
    ...props
  }: SimpleListItemProps,
  ref?: Ref<HTMLLIElement>
): ReactElement {
  const height = getListItemHeight({
    height: propHeight,
    leftAddon,
    leftAddonType,
    rightAddon,
    rightAddonType,
    secondaryText,
  });

  return (
    <li
      {...props}
      aria-disabled={
        typeof ariaDisabled === "string"
          ? ariaDisabled
          : (disabled && "true") || undefined
      }
      ref={ref}
      className={cn(
        block({
          [height]: height !== "auto" && height !== "normal",
          "three-lines": threeLines,
          clickable,
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
    </li>
  );
}

const ForwardedSimpleListItem = forwardRef<HTMLLIElement, SimpleListItemProps>(
  SimpleListItem
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedSimpleListItem.propTypes = {
      disabled: PropTypes.bool,
      clickable: PropTypes.bool,
      threeLines: PropTypes.bool,
      height: PropTypes.oneOf([
        "auto",
        "normal",
        "medium",
        "large",
        "extra-large",
      ]),
      leftAddonPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      rightAddonPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
    };
  } catch (e) {}
}

export default ForwardedSimpleListItem;
