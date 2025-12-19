"use client";

import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { type DividerProps } from "../divider/Divider.js";
import { divider } from "../divider/styles.js";
import { useMenuConfiguration } from "./MenuConfigurationProvider.js";

/** @since 5.0.0 */
export interface MenuItemSeparatorProps
  extends
    HTMLAttributes<HTMLLIElement>,
    Pick<DividerProps, "inset" | "vertical"> {
  ref?: Ref<HTMLLIElement>;
}

/**
 * **Client Component**
 *
 * This component renders a `<li role="separator">` with the divider styles. It
 * will also automatically render itself vertically instead of horizontally if
 * the menu is rendering horizontally.
 *
 * @see {@link https://react-md.dev/components/menu | Menu Demos}
 * @since 5.0.0 Renders as an `<li>` instead of a `<div>` or `<hr />`.
 */
export function MenuItemSeparator(props: MenuItemSeparatorProps): ReactElement {
  const {
    ref,
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
}
