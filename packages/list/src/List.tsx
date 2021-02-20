import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export type ListElement = HTMLUListElement | HTMLOListElement;
export interface ListProps extends HTMLAttributes<ListElement> {
  /**
   * The role is set to `"none"` by default for lists screen readers announce
   * lists differently than other elements on the page. Since the major use-case
   * for lists is to contain clickable items, setting this to `"none"` fixes
   * this issue.
   */
  role?: HTMLAttributes<ListElement>["role"];

  /**
   * Boolean if the dense spec should be applied to the list.
   */
  dense?: boolean;

  /**
   * Boolean if the list's order is important. This will update the list to be
   * rendered as an `<ol>` instead of `<ul>`.
   */
  ordered?: boolean;

  /**
   * Boolean if the list should appear horizontally instead of vertically.
   */
  horizontal?: boolean;
}

const block = bem("rmd-list");

/**
 * The `List` component creates an unstyled ordered or unordered list that
 * should be used with the `ListItem`, `ListItemLink`, and `SimpleListItem`
 * components.
 */
export const List = forwardRef<ListElement, ListProps>(function List(
  {
    role = "none",
    dense = false,
    ordered = false,
    horizontal = false,
    className,
    children,
    ...props
  },
  ref
) {
  const Component = (ordered ? "ol" : "ul") as "ul";

  return (
    <Component
      {...props}
      ref={ref}
      role={role}
      className={cn(block({ dense, horizontal }), className)}
    >
      {children}
    </Component>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    List.propTypes = {
      role: PropTypes.string,
      dense: PropTypes.bool,
      ordered: PropTypes.bool,
      className: PropTypes.string,
      children: PropTypes.node,
      horizontal: PropTypes.bool,
    };
  } catch (e) {}
}
