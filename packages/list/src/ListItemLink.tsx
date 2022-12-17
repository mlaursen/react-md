import type { PropsWithRef } from "@react-md/core";
import {
  RippleContainer,
  useElementInteraction,
  useHigherContrastChildren,
} from "@react-md/core";
import type { CustomLinkComponent } from "@react-md/link";
import type {
  ListItemChildrenProps,
  ListItemClassNameOptions,
} from "@react-md/list";
import { getListItemHeight, listItem, ListItemChildren } from "@react-md/list";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { forwardRef } from "react";

export interface ListItemLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ListItemClassNameOptions,
    ListItemChildrenProps {
  /** @defaultValue `"a"` */
  as?: CustomLinkComponent;

  to?: string;
  href?: string;
  liProps?: PropsWithRef<HTMLAttributes<HTMLLIElement>, HTMLLIElement>;

  /**
   * @defaultValue `disabled ? -1 : undefined`
   */
  tabIndex?: number;
}

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
