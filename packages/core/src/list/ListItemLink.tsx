"use client";

import {
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  forwardRef,
} from "react";

import { type ComponentWithRippleProps } from "../interaction/types.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import { type CustomLinkComponent } from "../link/Link.js";
import { type PropsWithRef } from "../types.js";
import { ListItemChildren } from "./ListItemChildren.js";
import { getListItemHeight } from "./getListItemHeight.js";
import { type ListItemClassNameOptions, listItem } from "./listItemStyles.js";
import { type ListItemChildrenProps } from "./types.js";

export interface ListItemLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ListItemClassNameOptions,
    ListItemChildrenProps,
    ComponentWithRippleProps {
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
 * The `ListItemLink` should be used to render links within the `List`, `Menu`,
 * or `DropdownMenu` components.
 *
 * @example Simple Example
 * ```tsx
 * import { List } from "@react-md/core/list/list";
 * import { ListItemLink } from "@react-md/core/list/ListItemLink";
 *
 * function Example() {
 *   return (
 *     <List>
 *       <ListItemLink href="#">Some Link</ListItemLink>
 *     </List>
 *   );
 * }
 * ```
 *
 * @example In Menus
 * ```tsx
 * import { ListItemLink } from "@react-md/core/list/ListItemLink";
 * import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
 *
 * function Example() {
 *   return (
 *     <DropdownMenu buttonChildren="Hello">
 *       <ListItemLink role="menuitem" href="#">Some Link</ListItemLink>
 *     </List>
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/list|List Demos}
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
      height: propHeight,
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
      multiline = false,
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
      disableRipple,
      ...remaining
    } = props;

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
            multiline,
            pressedClassName,
          })}
          // TODO: Figure out a better type for the CustomLinkComponent to fix this
          to={to as string}
          href={href as string}
          tabIndex={tabIndex}
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
            disableLeftAddonCenteredMedia={disableLeftAddonCenteredMedia}
            disableRightAddonCenteredMedia={disableRightAddonCenteredMedia}
          >
            {children}
          </ListItemChildren>
          {ripples}
        </Link>
      </li>
    );
  }
);
