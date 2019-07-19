import React, { createElement, forwardRef, FC, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export type ListElement = HTMLUListElement | HTMLOListElement;
export interface ListProps extends HTMLAttributes<ListElement> {
  /**
   * The role is set to `"none"` by default for lists screen readers annouce lists
   * differently than other elements on the page. Since the major use-case for lists
   * is to contain clickable items, setting this to `"none"` fixes this issue.
   */
  role?: HTMLAttributes<ListElement>["role"];

  /**
   * Boolean if the dense spec should be applied to the list.
   */
  dense?: boolean;

  /**
   * Boolean if the list's order is important. This will update the list to be rendered as
   * an `<ol>` instead of `<ul>`.
   */
  ordered?: boolean;

  /**
   * Boolean if the list should appear horizontally instead of vertically.
   */
  horizontal?: boolean;
}

type WithRef = WithForwardedRef<ListElement>;
type DefaultProps = Required<
  Pick<ListProps, "dense" | "ordered" | "horizontal" | "role">
>;
type WithDefaultProps = ListProps & DefaultProps & WithRef;

const block = bem("rmd-list");

/**
 * Creates an unordered or ordered list.
 */
const List: FC<ListProps & WithRef> = providedProps => {
  const {
    dense,
    horizontal,
    ordered,
    forwardedRef,
    className,
    children,
    ...props
  } = providedProps as WithDefaultProps;

  return createElement(
    ordered ? "ol" : "ul",
    {
      ...props,
      ref: forwardedRef,
      className: cn(block({ dense, horizontal }), className),
    },
    children
  );
};

const defaultProps: DefaultProps = {
  role: "none",
  dense: false,
  horizontal: false,
  ordered: false,
};

List.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  List.displayName = "List";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    List.propTypes = {
      role: PropTypes.string,
      dense: PropTypes.bool,
      horizontal: PropTypes.bool,
      ordered: PropTypes.bool,
    };
  }
}

export default forwardRef<ListElement, ListProps>((props, ref) => (
  <List {...props} forwardedRef={ref} />
));
