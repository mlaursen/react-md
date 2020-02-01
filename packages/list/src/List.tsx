import cn from "classnames";
import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { bem } from "@react-md/utils";

export type ListElement = HTMLUListElement | HTMLOListElement;
export interface ListProps extends HTMLAttributes<ListElement> {
  /**
   * The role is set to `"none"` by default for lists screen readers annouce
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
 * Creates an unordered or ordered list.
 */
function List(
  {
    role = "none",
    dense = false,
    horizontal = false,
    ordered = false,
    className,
    children,
    ...props
  }: ListProps,
  ref?: Ref<ListElement>
): ReactElement {
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
}

const ForwardedList = forwardRef<ListElement, ListProps>(List);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedList.propTypes = {
      role: PropTypes.string,
      dense: PropTypes.bool,
      horizontal: PropTypes.bool,
      ordered: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedList;
