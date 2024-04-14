"use client";
import { forwardRef, type HTMLAttributes } from "react";
import { type DividerProps } from "../divider/Divider.js";
import { divider } from "../divider/styles.js";
import { useMenuConfiguration } from "./MenuConfigurationProvider.js";

/** @since 5.0.0 */
export interface MenuItemSeparatorProps
  extends HTMLAttributes<HTMLLIElement>,
    Pick<DividerProps, "inset" | "vertical"> {}

/**
 * **Client Component**
 *
 * This component renders a `<li role="separator">` with the divider styles. It
 * will also automatically render itself vertically instead of horizontally if
 * the menu is rendering horizontally.
 *
 * @since 5.0.0 Renders as an `<li>` instead of a `<div>` or `<hr />`.
 */
export const MenuItemSeparator = forwardRef<
  HTMLLIElement,
  MenuItemSeparatorProps
>(function MenuItemSeparator(props, ref) {
  const {
    className,
    inset,
    vertical: propVertical,
    children,
    ...remaining
  } = props;

  const horizontal = useMenuConfiguration().horizontal;
  const vertical = propVertical ?? horizontal;

  return (
    <li
      {...remaining}
      aria-orientation={vertical ? "vertical" : undefined}
      ref={ref}
      role="separator"
      className={divider({ inset: inset && !vertical, vertical, className })}
    >
      {children}
    </li>
  );
});
