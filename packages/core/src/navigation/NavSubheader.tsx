import { forwardRef } from "react";
import {
  ListSubheader,
  type ListSubheaderProps,
} from "../list/ListSubheader.js";
import { navItem } from "./navItemStyles.js";

/**
 * @since 6.0.0
 */
export interface NavSubheaderProps extends ListSubheaderProps {}

/**
 * A simple wrapper around the {@Link ListSubheader} that updates the padding
 * based on the current navigation item depth to match the other items.
 *
 * @since 6.0.0
 */
export const NavSubheader = forwardRef<HTMLLIElement, NavSubheaderProps>(
  function NavSubheader(props, ref) {
    const { textProps, ...remaining } = props;

    return (
      <ListSubheader
        {...remaining}
        ref={ref}
        textProps={{
          ...textProps,
          className: navItem({ className: textProps?.className }),
        }}
      />
    );
  }
);
