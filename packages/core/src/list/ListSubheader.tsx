import { cnb } from "cnbuilder";
import { forwardRef, type HTMLAttributes } from "react";
import { type PropsWithRef } from "../types.js";
import { bem } from "../utils/bem.js";
import { ListItemText } from "./ListItemText.js";

const styles = bem("rmd-list-subheader");

/** @since 6.0.0 */
export interface ListSubheaderClassNameOptions {
  className?: string;

  /**
   * Boolean if the subheader should be inset to match the `ListItem` text
   * keyline.
   *
   * @defaultValue `false`
   */
  inset?: boolean;
}

/**
 * @since 6.0.0
 */
export function listSubheader(
  options: ListSubheaderClassNameOptions = {}
): string {
  const { inset = false, className } = options;

  return cnb(styles({ inset }), className);
}

export interface ListSubheaderProps
  extends HTMLAttributes<HTMLLIElement>,
    ListSubheaderClassNameOptions {
  /**
   * @defaultValue `"presentation"`
   */
  role?: HTMLAttributes<HTMLLIElement>["role"];

  /**
   * @since 6.0.0
   */
  textProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

/**
 * **Server Component**
 *
 * The `ListSubheader` is a wrapper for the `<li>` element to apply subheader
 * typography styles and {@link ListItemText} layout.
 */
export const ListSubheader = forwardRef<HTMLLIElement, ListSubheaderProps>(
  function ListSubheader(props, ref) {
    const {
      role = "presentation",
      inset = false,
      className,
      children,
      textProps,
      ...remaining
    } = props;

    return (
      <li
        {...remaining}
        ref={ref}
        role={role}
        className={listSubheader({
          inset,
          className,
        })}
      >
        <ListItemText {...textProps}>{children}</ListItemText>
      </li>
    );
  }
);
