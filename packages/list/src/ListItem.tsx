import {
  RippleContainer,
  useElementInteraction,
  useHigherContrastChildren,
} from "@react-md/core";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { getListItemHeight } from "./getListItemHeight";
import { ListItemChildren } from "./ListItemChildren";
import { listItem } from "./styles";
import type { ListItemChildrenProps, ListItemHeight } from "./types";

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
   * @defaultValue `true`
   */
  clickable?: boolean;
}

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
      onTouchStart,
      onTouchEnd,
      onTouchMove,
      tabIndex = disabled ? -1 : 0,
      children: propChildren,
      ...remaining
    } = props;
    const { pressedClassName, rippleContainerProps, handlers } =
      useElementInteraction({
        onBlur,
        onClick,
        onKeyDown,
        onKeyUp,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        disabled,
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
