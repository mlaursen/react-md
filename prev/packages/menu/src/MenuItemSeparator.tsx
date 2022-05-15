import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import type { DividerProps, VerticalDividerProps } from "@react-md/divider";
import { useVerticalDividerHeight } from "@react-md/divider";
import { bem } from "@react-md/utils";

import { useMenuConfiguration } from "./MenuConfigurationProvider";

const styles = bem("rmd-divider");

/** @remarks \@since 5.0.0 */
export interface MenuItemSeparatorProps
  extends HTMLAttributes<HTMLLIElement>,
    Pick<DividerProps, "inset" | "vertical">,
    Pick<VerticalDividerProps, "maxHeight"> {}

/**
 * This component renders a `<li role="separator">` with the divider styles. It
 * will also automatically render itself vertically instead of horizontally if
 * the menu is rendering horizontally.
 *
 * @remarks \@since 5.0.0 Renders as an `<li>` instead of a `<div>` or `<hr />`.
 */
export const MenuItemSeparator = forwardRef<
  HTMLLIElement,
  MenuItemSeparatorProps
>(function MenuItemSeparator(
  {
    style,
    className,
    maxHeight,
    inset,
    vertical: propVertical,
    children,
    ...props
  },
  ref
) {
  const horizontal = useMenuConfiguration().horizontal;
  const vertical = propVertical ?? horizontal;
  const heightProps = useVerticalDividerHeight({
    ref,
    style,
    maxHeight: vertical ? maxHeight ?? 1 : 0,
  });

  return (
    <li
      {...props}
      {...heightProps}
      aria-orientation={vertical ? "vertical" : undefined}
      role="separator"
      className={cn(styles({ inset: inset && !vertical, vertical }), className)}
    >
      {children}
    </li>
  );
});
