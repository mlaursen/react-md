import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { ListClassNameOptions } from "./styles";
import { list } from "./styles";

export type ListElement = HTMLUListElement | HTMLOListElement;

export interface ListProps
  extends HTMLAttributes<ListElement>,
    ListClassNameOptions {
  /**
   * @defaultValue `"none"`
   */
  role?: HTMLAttributes<ListElement>["role"];

  /**
   * Boolean if the dense spec should be applied to the list.
   */
  dense?: boolean;

  /**
   * Boolean if the list's order is important. This will update the list to be
   * rendered as an `<ol>` instead of `<ul>`.
   *
   * @defaultValue `false`
   */
  ordered?: boolean;

  /**
   * Boolean if the list should appear horizontally instead of vertically.
   */
  horizontal?: boolean;
}

export const List = forwardRef<ListElement, ListProps>(function List(
  props,
  ref
) {
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
});
