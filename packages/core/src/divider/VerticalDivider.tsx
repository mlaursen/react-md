import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { Divider } from "./Divider";
import type { VerticalDividerHookOptions } from "./useVerticalDividerHeight";
import { useVerticalDividerHeight } from "./useVerticalDividerHeight";

export interface VerticalDividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @see {@link VerticalDividerHookOptions.maxHeight}
   * @defaultValue `1`
   */
  maxHeight?: VerticalDividerHookOptions<HTMLDivElement>["maxHeight"];
}

/**
 * This component is used to create a vertical divider based on a parent
 * element's height. This is really only needed when the parent element **has no
 * defined height**.  If there is a defined height, this component is not worth
 * much as the height can be computed in css as normal. This really just fixes
 * the issue that the height would be set to `auto` (which computes to 0 most of
 * the time) when it is not set on a parent element.
 */
export const VerticalDivider = forwardRef<HTMLDivElement, VerticalDividerProps>(
  function VerticalDivider(props, ref) {
    const { style, maxHeight = 1, ...remaining } = props;

    const heightProps = useVerticalDividerHeight({
      ref,
      style,
      maxHeight,
    });

    return <Divider {...remaining} {...heightProps} vertical />;
  }
);
