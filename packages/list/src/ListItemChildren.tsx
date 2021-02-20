import React, { ReactElement, ReactNode } from "react";

import {
  ListItemAddon,
  ListItemAddonPosition,
  ListItemAddonType,
} from "./ListItemAddon";
import { ListItemText } from "./ListItemText";

export interface ListItemChildrenProps {
  /**
   * The main content to display. When the `textChildren` prop is enabled and
   * there is child content, it will be treated as primary text and update the
   * styles automatically.
   */
  children?: ReactNode;

  /**
   * An optional className to apply to the `<span>` that surrounds the
   * `primaryText` and optionally `secondaryText` within the list item.
   */
  textClassName?: string;

  /**
   * An optional className to apply to the `<span>` that surrounds the
   * `secondaryText` within the list item.
   */
  secondaryTextClassName?: string;

  /**
   * Boolean if the children should be treated as the `primaryText` prop. This
   * will wrap them in an additional class so that they have ellipsis for text
   * overflow.
   *
   * If you want to have more "freedom" within the `ListItem`, you can disable
   * this prop so that the height will grow depending on content.
   *
   * NOTE: If the `secondaryText` prop is provided, this will always be
   * considered `true`.
   */
  textChildren?: boolean;

  /**
   * An optional element that should be rendered as the `primaryText` within the
   * list item. It is most likely easier to use the `children` prop instead, but
   * this allows you to create more complex components with the `ListItem` since
   * you can provided `children` and have the styles for the `primaryText` still
   * applied. By default, this will only allow one line of text and add ellipsis
   * for any text overflow.
   */
  primaryText?: ReactNode;

  /**
   * An optional element that should be rendered as the `secondaryText` within
   * the list item. By default, this will only span one line and add ellipsis
   * for overflow.
   */
  secondaryText?: ReactNode;

  /**
   * An optional addon to display to the left of the `primaryText` or
   * `children` and should be used with the `leftAddonType` prop to adjust
   * spacing.
   */
  leftAddon?: ReactNode;

  /**
   * The type of the addon that appears to the left of the `primaryText` or
   * `children`.
   */
  leftAddonType?: ListItemAddonType;

  /**
   * The vertical position the left icon, avatar, media, or large media
   * should be placed.
   */
  leftAddonPosition?: ListItemAddonPosition;

  /**
   * An optional addon to display to the right of the `primaryText` or
   * `children` and should be used with the `rightAddonType` prop to adjust
   * spacing.
   */
  rightAddon?: ReactNode;

  /**
   * The type of the addon that appears to the right of the `primaryText` or
   * `children`.
   */
  rightAddonType?: ListItemAddonType;

  /**
   * The vertical position the right icon, avatar, media, or large media
   * should be placed.
   */
  rightAddonPosition?: ListItemAddonPosition;

  /**
   * Boolean if the left and/or right addons should be "forcefully" wrapped in a
   * `<span>` with the spacing class names applied instead of attempting to
   * clone it into the provided icon element.
   */
  forceAddonWrap?: boolean;
}

/**
 * The `ListItemChildren` component is used to create a styled list item that
 * can have optional addons to the left or right of the children in the form of
 * icons, avatars, or media. The `children` can be replaced by the `primaryText`
 * and `secondaryText` props to create stacked text spanning two or more lines
 * with the default behavior of using `line-clamp` at three lines.
 *
 * Note: This will return a `React.Fragment` of the children and does not wrap
 * in a DOM node for styling. The parent component should normally have
 * `display: flex` for the styling to work.
 */
export function ListItemChildren({
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
  children: propChildren,
}: ListItemChildrenProps): ReactElement {
  const stringifiedChildren =
    typeof propChildren === "number" ? `${propChildren}` : propChildren;

  let children = stringifiedChildren;
  if (primaryText || secondaryText || textChildren) {
    children = (
      <ListItemText
        className={textClassName}
        secondaryText={secondaryText}
        secondaryTextClassName={secondaryTextClassName}
      >
        {(textChildren && children) || primaryText}
      </ListItemText>
    );
  }

  children = (
    <ListItemAddon
      addon={leftAddon}
      type={leftAddonType}
      position={leftAddonPosition}
      forceAddonWrap={forceAddonWrap}
    >
      {children}
    </ListItemAddon>
  );
  children = (
    <ListItemAddon
      addon={rightAddon}
      addonAfter
      type={rightAddonType}
      position={rightAddonPosition}
      forceAddonWrap={forceAddonWrap}
    >
      {children}
    </ListItemAddon>
  );

  return (
    <>
      {children}
      {(primaryText && stringifiedChildren) || null}
    </>
  );
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");
    ListItemChildren.propTypes = {
      textClassName: PropTypes.string,
      secondaryTextClassName: PropTypes.string,
      textChildren: PropTypes.bool,
      primaryText: PropTypes.node,
      secondaryText: PropTypes.node,
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
