import { cnb } from "cnbuilder";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cssUtils, type BackgroundColor } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-badge-size"?: string | number;
    "--rmd-badge-offset"?: string | number;
    "--rmd-badge-offset-top"?: string | number;
    "--rmd-badge-offset-right"?: string | number;
  }
}

const styles = bem("rmd-badge");

/**
 * @since 6.0.0 Renamed `"default"` to `"greyscale"` and added all
 * theme colors.
 */
export type BadgeTheme = BackgroundColor | "greyscale" | "clear";

export interface BadgeClassNameOptions {
  className?: string;

  /** @defaultValue `""greyscale` */
  theme?: BadgeTheme;
}

export function badge(options: BadgeClassNameOptions = {}): string {
  const { className, theme = "greyscale" } = options;
  const greyscale = theme === "greyscale";
  const clear = theme === "clear";

  return cnb(
    styles({ greyscale }),
    cssUtils({ backgroundColor: !clear && !greyscale ? theme : undefined }),
    className
  );
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** @defaultValue `"greyscale"` */
  theme?: BadgeTheme;

  children: ReactNode;
}

/**
 * @example Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { Badge, Button, MaterialSymbol } from "@react-md/core";
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
 * import type { ReactElement } from "react";
 * import { Badge, Button, MaterialSymbol } from "@react-md/core";
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
