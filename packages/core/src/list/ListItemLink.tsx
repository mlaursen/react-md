"use client";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { forwardRef } from "react";
import { RippleContainer } from "../interaction/RippleContainer.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import type { CustomLinkComponent } from "../link/LinkProvider.js";
import type { PropsWithRef } from "../types.js";
import { ListItemChildren } from "./ListItemChildren.js";
import { getListItemHeight } from "./getListItemHeight.js";
import type { ListItemClassNameOptions } from "./listItemStyles.js";
import { listItem } from "./listItemStyles.js";
import type { ListItemChildrenProps } from "./types.js";

export interface ListItemLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ListItemClassNameOptions,
    ListItemChildrenProps {
  /** @defaultValue `"a"` */
  as?: CustomLinkComponent;

  /**
   * This should only be used if the {@link as} {@link CustomLinkComponent}
   * accepts a `to` prop instead of {@link href}.
   */
  to?: string;

  /**
   * The link's href. Either this or the {@link to} prop **should** be provided.
   */
  href?: string;

  /**
   * Any additional props to provide the wrapping `<li>` element such as
   * `style`, `className`, and `ref`.
   */
  liProps?: PropsWithRef<HTMLAttributes<HTMLLIElement>, HTMLLIElement>;

  /**
   * @defaultValue `disabled ? -1 : undefined`
   */
  tabIndex?: number;
}

/**
 * **Client Component**
 *
 * The `ListItemLink` should be used to render links within the `List` component.
 */
export const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>(
  function ListItemLink(props, ref) {
    const {
      as: Link = "a",
      to,
      href,
      className,
      liProps,
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
      role,
      tabIndex = disabled || role === "menuitem" ? -1 : undefined,
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
        onDragStart,
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
      <li {...liProps} role="none">
        <Link
          ref={ref}
          {...remaining}
          {...handlers}
          role={role}
          className={listItem({
            className,
            link: true,
            height,
            disabled,
            disabledOpacity,
            threeLines,
            pressedClassName,
          })}
          // TODO: Figure out a better type for the CustomLinkComponent to fix this
          to={to as string}
          href={href as string}
          tabIndex={tabIndex}
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
          {rippleContainerProps && (
            <RippleContainer {...rippleContainerProps} />
          )}
        </Link>
      </li>
    );
  }
);