import { type ReactElement } from "react";

import {
  ListSubheader,
  type ListSubheaderProps,
} from "../list/ListSubheader.js";
import { navItem } from "./navItemStyles.js";

/**
 * @since 6.0.0
 */
export type NavSubheaderProps = ListSubheaderProps;

/**
 * A simple wrapper around the {@link ListSubheader} that updates the padding
 * based on the current navigation item depth to match the other items.
 *
 * @see {@link https://react-md.dev/components/navigation | Navigation Demos}
 * @since 6.0.0
 */
export function NavSubheader(props: NavSubheaderProps): ReactElement {
  const { ref, textProps, ...remaining } = props;

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
