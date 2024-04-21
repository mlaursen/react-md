import { forwardRef, type MouseEventHandler, type ReactNode } from "react";
import { Button, type ButtonProps } from "../button/Button.js";
import { IconRotator, type IconRotatorBaseProps } from "../icon/IconRotator.js";
import { getIcon } from "../icon/iconConfig.js";
import { navItemContent } from "./navItemStyles.js";

/**
 * @since 6.0.0
 */
export interface NavItemButtonRotatorProps {
  /** @defaultValue `getIcon("dropdown")` */
  icon?: ReactNode;
  iconRotatorProps?: IconRotatorBaseProps;
  disableIconRotator?: boolean;
}

/**
 * @since 6.0.0
 */
export interface NavItemButtonProps
  extends ButtonProps,
    NavItemButtonRotatorProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  collapsed: boolean;
  children: ReactNode;
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
      ...remaining
    } = props;

    return (
      <Button
        {...remaining}
        ref={ref}
        className={navItemContent({ className })}
      >
        {children}
        {!disableIconRotator && (
          <IconRotator {...iconRotatorProps} rotated={!collapsed}>
            {getIcon("dropdown", icon)}
          </IconRotator>
        )}
      </Button>
    );
  }
);
