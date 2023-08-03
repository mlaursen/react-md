import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../utils";

declare module "react" {
  interface CSSProperties {
    "--rmd-list-padding-h"?: string | number;
    "--rmd-list-padding-v"?: string | number;
  }
}

const styles = bem("rmd-list");

/** @remarks \@since 6.0.0 */
export interface ListClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  dense?: boolean;

  /** @defaultValue `false` */
  horizontal?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function list(options: ListClassNameOptions = {}): string {
  const { dense = false, horizontal = false, className } = options;

  return cnb(styles({ dense, horizontal }), className);
}

export type ListElement = HTMLUListElement | HTMLOListElement;

export interface ListProps extends HTMLAttributes<ListElement> {
  /**
   * @defaultValue `"none"`
   */
  role?: HTMLAttributes<ListElement>["role"];

  /**
   * Set to `true` to decrease the amount of padding and font size within the
   * list.
   *
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * Set this to `true` to render as `<ol>` instead of `<ul>` when the children
   * are in a specific order. For example: steps within a recipe.
   *
   * @defaultValue `false`
   */
  ordered?: boolean;

  /**
   * Set this to `true` to render horizontally instead of vertically.
   *
   * @defaultValue `false`
   */
  horizontal?: boolean;
}

/**
 * **Server Component**
 *
 * The `List` component is used to render a collection of clickable actions
 * vertically or horizontally and does not include the default `ol`/`ul` styles.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { List, ListItem, ListItemLink } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <List>
 *       <ListItem
 *         onClick={() => {
 *           // do something
 *         }}
 *       >
 *         Item 1
 *       </ListItem>
 *       <ListItem
 *         onClick={() => {
 *           // do something
 *         }}
 *       >
 *         Item 2
 *       </ListItem>
 *       <ListItem
 *         onClick={() => {
 *           // do something
 *         }}
 *       >
 *         Item 3
 *       </ListItem>
 *       <ListItemLink href="/some-route">Link Example</ListItemLink>
 *     </List>
 *   );
 * }
 * ```
 */
export const List = forwardRef<ListElement, ListProps>(
  function List(props, ref) {
    const {
      className,
      children,
      role = "none",
      dense = false,
      ordered = false,
      horizontal = false,
      ...remaining
    } = props;
    const Component = (ordered ? "ol" : "ul") as "ul";
    return (
      <Component
        {...remaining}
        ref={ref}
        role={role}
        className={list({
          dense,
          horizontal,
          className,
        })}
      >
        {children}
      </Component>
    );
  }
);
