import { cnb } from "cnbuilder";
import { type HTMLAttributes, forwardRef } from "react";

import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-fab-offset"?: string | number;
  }
}

const styles = bem("rmd-fab");

/**
 * The position within the viewport for the floating action button.
 *
 * @since 6.0.0 This was renamed from `FABPosition`
 */
export type FloatingActionButtonPosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right"
  | null;

/**
 * @since 6.0.0
 * @internal
 */
export interface FloatingActionButtonClassNameOptions {
  className?: string;

  /** @defaultValue `null` */
  position?: FloatingActionButtonPosition;

  /**
   * @defaultValue `false`
   */
  absolute?: boolean;
}

/**
 * FAB = Floating Action Button
 *
 * @since 6.0.0
 * @internal
 */
export function fab(options: FloatingActionButtonClassNameOptions): string {
  const { className, position = null, absolute = false } = options;

  return cnb(
    styles({
      tl: position === "top-left",
      tr: position === "top-right",
      bl: position === "bottom-left",
      br: position === "bottom-right",
      absolute,
    }),
    className
  );
}

/** @since 6.0.0 */
export interface FloatingActionButtonProps
  extends HTMLAttributes<HTMLSpanElement>,
    FloatingActionButtonClassNameOptions {}

/**
 * @since 6.0.0
 * @internal
 */
export const FloatingActionButton = forwardRef<
  HTMLSpanElement,
  FloatingActionButtonProps
>(function FloatingActionButton(props, ref) {
  const {
    children,
    className,
    position = null,
    absolute = false,
    ...remaining
  } = props;
  if (!position) {
    return <>{children}</>;
  }

  return (
    <span
      {...remaining}
      ref={ref}
      className={fab({
        className,
        position,
        absolute,
      })}
    >
      {children}
    </span>
  );
});
