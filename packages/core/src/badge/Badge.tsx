import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { type BadgeTheme, badge } from "./styles.js";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** @defaultValue `"greyscale"` */
  theme?: BadgeTheme;

  children: ReactNode;
}

/**
 * @example Simple Example
 * ```tsx
 * import { Badge } from "@react-md/core/badge/Badge";
 * import { Button } from "@react-md/core/button/Button";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <>
 *       <Badge>3</Badge>
 *       <Badge theme="primary">100</Badge>
 *       <Badge theme="secondary">23</Badge>
 *       <Badge theme="greyscale">18</Badge>
 *       <Badge theme="clear">1</Badge>
 *     </>
 *   );
 * }
 * ```
 *
 * @example Within Buttons Example
 * ```tsx
 * import { Badge } from "@react-md/core/badge/Badge";
 * import { Button } from "@react-md/core/button/Button";
 * import { MaterialSymbol } from "@react-md/core/icon/MaterialSymbol";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Button aria-label="Notifications" buttonType="icon">
 *       <Badge>88</Badge>
 *       <MaterialSymbol name="notifications" />
 *     </Button>
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/badge | Badge Demos}
 * @since 6.0.0 Removed the `disableNullOnZero` feature since it's
 * easier just to use condition rendering yourself.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    const { children, className, theme, ...remaining } = props;
    return (
      <span {...remaining} ref={ref} className={badge({ theme, className })}>
        {children}
      </span>
    );
  }
);
