"use client";
import { forwardRef, type HTMLAttributes } from "react";
import { type ComponentWithRippleProps } from "../interaction/types.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import { getListItemHeight } from "./getListItemHeight.js";
import { ListItemChildren } from "./ListItemChildren.js";
import { listItem } from "./listItemStyles.js";
import { type ListItemChildrenProps, type ListItemHeight } from "./types.js";

/**
 * @since 6.0.0 Renamed `threeLines` to `multiline` since it can
 * support more than three lines of text.
 */
export interface ListItemProps
  extends HTMLAttributes<HTMLLIElement>,
    ListItemChildrenProps,
    ComponentWithRippleProps {
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
  multiline?: boolean;

  /**
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Note: This does nothing if the `disabled` prop is not enabled.
   *
   * @defaultValue `false`
   * @since 2.4.3
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
 * @example Simple Example
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
 * @example Applying Addons Example
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
      height: propHeight,
      leftAddon,
      leftAddonType,
      leftAddonPosition,
      leftAddonClassName,
      leftAddonForceWrap,
      rightAddon,
      rightAddonType,
      rightAddonPosition,
      rightAddonClassName,
      rightAddonForceWrap,
      disableLeftAddonSpacing,
      disableLeftAddonCenteredMedia,
      disableRightAddonCenteredMedia,
      multiline = false,
      disabled = false,
      disableRipple,
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

    const { pressedClassName, ripples, handlers } = useElementInteraction({
      mode: disableRipple ? "none" : undefined,
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
          multiline,
          clickable: !presentational,
          pressedClassName,
        })}
      >
        <ListItemChildren
          multiline={multiline}
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
          disableLeftAddonSpacing={disableLeftAddonSpacing}
          disableLeftAddonCenteredMedia={disableLeftAddonCenteredMedia}
          disableRightAddonCenteredMedia={disableRightAddonCenteredMedia}
        >
          {children}
        </ListItemChildren>
        {ripples}
      </li>
    );
  }
);
