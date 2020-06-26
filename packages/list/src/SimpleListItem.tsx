import React, { forwardRef } from "react";
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
const SimpleListItem = forwardRef<HTMLLIElement, SimpleListItemProps>(
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
      clickable = false,
      ...props
    },
    ref
  ) {
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
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    SimpleListItem.propTypes = {
      "aria-disabled": PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["true", "false"]),
      ]),
      className: PropTypes.string,
      disabled: PropTypes.bool,
      clickable: PropTypes.bool,
      threeLines: PropTypes.bool,
      textClassName: PropTypes.string,
      secondaryTextClassName: PropTypes.string,
      textChildren: PropTypes.bool,
      primaryText: PropTypes.node,
      secondaryText: PropTypes.node,
      height: PropTypes.oneOf([
        "auto",
        "normal",
        "medium",
        "large",
        "extra-large",
      ]),
      leftAddon: PropTypes.node,
      leftAddonType: PropTypes.oneOf([
        "icon",
        "avatar",
        "media",
        "large-media",
      ]),
      leftAddonPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      rightAddon: PropTypes.node,
      rightAddonType: PropTypes.oneOf([
        "icon",
        "avatar",
        "media",
        "large-media",
      ]),
      rightAddonPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      forceAddonWrap: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default SimpleListItem;
