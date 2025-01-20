"use client";

import { type MouseEventHandler, type ReactNode, forwardRef } from "react";

import { Button, type ButtonProps } from "../button/Button.js";
import { cssUtils } from "../cssUtils.js";
import { IconRotator, type IconRotatorBaseProps } from "../icon/IconRotator.js";
import { getIcon } from "../icon/iconConfig.js";
import { Tooltip } from "../tooltip/Tooltip.js";
import { useTooltip } from "../tooltip/useTooltip.js";
import { navItemContent } from "./navItemStyles.js";
import { type NavItemContentProps } from "./types.js";

/**
 * @since 6.0.0
 */
export interface NavItemButtonRotatorProps {
  /** @defaultValue `getIcon("dropdown")` */
  icon?: ReactNode;
  iconRotatorProps?: Omit<IconRotatorBaseProps, "rotated">;
  disableIconRotator?: boolean;
}

/**
 * @since 6.0.0
 */
export interface NavItemButtonProps
  extends Omit<ButtonProps, "children">,
    NavItemButtonRotatorProps,
    NavItemContentProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  collapsed: boolean;
}

/**
 * **Client Component**
 *
 * @since 6.0.0
 */
export const NavItemButton = forwardRef<HTMLButtonElement, NavItemButtonProps>(
  function NavItemButton(props, ref) {
    const {
      className,
      collapsed,
      icon,
      iconRotatorProps,
      disableIconRotator,
      children,
      beforeAddon,
      afterAddon,
      spanProps,
      onBlur,
      onContextMenu,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onTouchEnd,
      onTouchStart,
      tooltipOptions,
      ...remaining
    } = props;

    const { elementProps, tooltipProps, overflowRef } = useTooltip({
      overflowOnly: true,
      defaultPosition: "right",
      ...tooltipOptions,
      onBlur,
      onContextMenu,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onTouchEnd,
      onTouchStart,
    });

    return (
      <>
        <Button
          aria-expanded={!collapsed}
          {...remaining}
          {...elementProps}
          ref={ref}
          className={navItemContent({ className })}
        >
          {beforeAddon}
          <span
            {...spanProps}
            ref={overflowRef}
            className={cssUtils({
              className: spanProps?.className,
              textOverflow: "ellipsis",
            })}
          >
            {children}
          </span>
          {afterAddon}
          {!disableIconRotator && (
            <IconRotator {...iconRotatorProps} rotated={!collapsed}>
              {getIcon("dropdown", icon)}
            </IconRotator>
          )}
        </Button>
        <Tooltip {...tooltipProps}>{children}</Tooltip>
      </>
    );
  }
);
