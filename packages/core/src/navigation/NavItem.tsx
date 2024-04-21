import { forwardRef, type LiHTMLAttributes, type ReactNode } from "react";
import { navItem } from "./navItemStyles.js";

/**
 * @since 6.0.0
 */
export interface NavItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

/**
 * **Server Component**
 *
 * This component is just used to add padding based on the depth of the nav item
 * and should not be used on its own. See the `CollapsibleNavGroup` and
 * `NavItemLink` instead.
 *
 * @since 6.0.0
 */
export const NavItem = forwardRef<HTMLLIElement, NavItemProps>(
  function NavItem(props, ref) {
    const { className, children, ...remaining } = props;
    return (
      <li {...remaining} ref={ref} className={navItem({ className })}>
        {children}
      </li>
    );
  }
);
