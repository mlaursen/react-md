"use client";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { RippleContainer } from "../interaction/RippleContainer.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import { ListItemChildren } from "./ListItemChildren.js";
import { getListItemHeight } from "./getListItemHeight.js";
import { listItem } from "./listItemStyles.js";
import type { ListItemChildrenProps, ListItemHeight } from "./types.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-list-item-keyline"?: string | number;
    "--rmd-list-item-padding-h"?: string | number;
    "--rmd-list-item-padding-v"?: string | number;
    "--rmd-list-item-height"?: string | number;
    "--rmd-list-item-medium-height"?: string | number;
    "--rmd-list-item-large-height"?: string | number;
    "--rmd-list-item-extra-large-height"?: string | number;
    "--rmd-list-item-three-line-height"?: string | number;
    "--rmd-list-item-media-size"?: string | number;
    "--rmd-list-item-media-spacing"?: string | number;
    "--rmd-list-item-text-three-line-height"?: string | number;
  }
}

export interface ListItemProps
  extends HTMLAttributes<HTMLLIElement>,
    ListItemChildrenProps {
  /**
   * @defaultValue `"button"`
   */
  role?: HTMLAttributes<HTMLLIElement>["role"];

  /**
   * @defaultValue `disabled ? -1 : 0`
   */
  tabIndex?: number;

  /**
   * @see {@link ListItemHeight}
   * @defaultValue `"auto"`
   */
  height?: ListItemHeight;

  /**
   * @defaultValue `false`
   */
  threeLines?: boolean;

  /**
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Note: This does nothing if the `disabled` prop is not enabled.
   *
   * @defaultValue `false`
   * @remarks \@since 2.4.3
   */
  disabledOpacity?: boolean;

  /**
   * Set this to `false` if the list item should not gain the interaction
   * states: hover, focus, press, etc. This is kind of like being disabled
   * without the disabled styles being applied.
   *
   * @defaultValue `role === "presentation"`
   */
  presentational?: boolean;
}

/**
 * **Client Component**
 *
 * The `ListItem` is used to create a clickable/focusable button within a
 * `List` and removes the normal `<li>` styles.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { List, ListItem } from "@react-md/core";
 * import type { ReactElement  } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <List>
 *       <ListItem
 *         onClick={() => {
 *           // do something
 *         }}
 *       >
 *         Item 1
 *       </ListItem>
 *       <ListItem
 *         onClick={() => {
 *           // do something
 *         }}
 *         secondaryText={<span>Some <strong>additional</strong> content.</span>}
 *       >
 *         Item 2
 *       </ListItem>
 *     </List>
 *   );
 *   );
 * }
 * ```
 *
 * @example
 * Applying Addons Example
 * ```tsx
 * import { List, ListItem } from "@react-md/core";
 * import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
 * import type { ReactElement  } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <List>
 *       <ListItem leftAddon={<FavoriteIcon />}>
 *         Item 1
 *       </ListItem>
 *       <ListItem rightAddon={<FavoriteIcon />}>
 *         Item 2
 *       </ListItem>
 *       <ListItem
 *         leftAddon={<FavoriteIcon />}
 *         rightAddon={<img alt="" src="/some-image.png" />}
 *         rightAddonType="media"
 *       >
 *         Item 3
 *       </ListItem>
 *     </List>
 *   );
 *   );
 * }
 * ```
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(props, ref) {
    const {
      className,
      textProps,
      textClassName,
      secondaryTextClassName,
      primaryText,
      secondaryText,
      secondaryTextProps,
      disableTextChildren = false,
      height: propHeight = "auto",
      leftAddon,
      leftAddonType = "icon",
      leftAddonPosition = "middle",
      leftAddonClassName,
      leftAddonForceWrap,
      rightAddon,
      rightAddonType = "icon",
      rightAddonPosition = "middle",
      rightAddonClassName,
      rightAddonForceWrap,
      disableLeftAddonCenteredMedia = false,
      disableRightAddonCenteredMedia = false,
      threeLines = false,
      disabled = false,
      disabledOpacity = false,
      role = "button",
      onBlur,
      onClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onDragStart,
      onTouchStart,
      onTouchEnd,
      onTouchMove,
      tabIndex: propTabIndex,
      children: propChildren,
      presentational = role === "presentation",
      ...remaining
    } = props;

    let tabIndex = propTabIndex;
    if (!presentational && typeof tabIndex === "undefined") {
      tabIndex = disabled ? -1 : 0;
    }

    const { pressedClassName, rippleContainerProps, handlers } =
      useElementInteraction({
        onBlur,
        onClick,
        onKeyDown,
        onKeyUp,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        onDragStart,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        disabled: disabled || presentational,
      });
    const children = useHigherContrastChildren(
      propChildren,
      !disableTextChildren
    );

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
        {...remaining}
        {...handlers}
        aria-disabled={disabled || undefined}
        ref={ref}
        role={role}
        tabIndex={tabIndex}
        className={listItem({
          className,
          height,
          disabled,
          disabledOpacity,
          threeLines,
          clickable: !presentational,
          pressedClassName,
        })}
      >
        <ListItemChildren
          threeLines={threeLines}
          textClassName={textClassName}
          secondaryTextClassName={secondaryTextClassName}
          disableTextChildren={disableTextChildren}
          primaryText={primaryText}
          textProps={textProps}
          secondaryText={secondaryText}
          secondaryTextProps={secondaryTextProps}
          leftAddon={leftAddon}
          leftAddonType={leftAddonType}
          leftAddonPosition={leftAddonPosition}
          leftAddonClassName={leftAddonClassName}
          leftAddonForceWrap={leftAddonForceWrap}
          rightAddon={rightAddon}
          rightAddonType={rightAddonType}
          rightAddonPosition={rightAddonPosition}
          rightAddonClassName={rightAddonClassName}
          rightAddonForceWrap={rightAddonForceWrap}
          disableLeftAddonCenteredMedia={disableLeftAddonCenteredMedia}
          disableRightAddonCenteredMedia={disableRightAddonCenteredMedia}
        >
          {children}
        </ListItemChildren>
        {rippleContainerProps && <RippleContainer {...rippleContainerProps} />}
      </li>
    );
  }
);
