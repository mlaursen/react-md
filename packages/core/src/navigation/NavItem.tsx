import { type LiHTMLAttributes, type ReactNode, forwardRef } from "react";

import { type NavItemClassNameOptions, navItem } from "./navItemStyles.js";

/**
 * @since 6.0.0
 * @since 6.3.1 Extends NavItemClassNameOptions to allow for CSS properties
 * augmentation.
 */
export interface NavItemProps
  extends LiHTMLAttributes<HTMLLIElement>,
    NavItemClassNameOptions {
  children: ReactNode;
}

/**
 * This component is just used to add padding based on the depth of the nav item
 * and should not be used on its own. See the `CollapsibleNavGroup` and
 * `NavItemLink` instead.
 *
 * @see {@link https://react-md.dev/components/navigation | Navigation Demos}
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
