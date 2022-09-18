import {
  RippleContainer,
  useElementInteraction,
  useHigherContrastChildren,
} from "@react-md/core";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { getListItemHeight } from "./getListItemHeight";
import { ListItemChildren } from "./ListItemChildren";
import type { ListItemClassNameOptions } from "./styles";
import { listItem } from "./styles";
import type { ListItemChildrenProps } from "./types";

export interface ListItemProps
  extends HTMLAttributes<HTMLLIElement>,
    ListItemClassNameOptions,
    ListItemChildrenProps {
  /**
   * @defaultValue `"button"`
   */
  role?: HTMLAttributes<HTMLLIElement>["role"];

  /**
   * @defaultValue `disabled ? -1 : 0`
   */
  tabIndex?: number;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(props, ref) {
    const {
      className,
      textClassName,
      secondaryTextClassName,
      primaryText,
      secondaryText,
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
      onClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      tabIndex = disabled ? -1 : 0,
      children: propChildren,
      ...remaining
    } = props;
    const { pressedClassName, rippleContainerProps, handlers } =
      useElementInteraction({
        onClick,
        onKeyDown,
        onKeyUp,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
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
          secondaryText={secondaryText}
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
