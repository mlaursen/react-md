import React, {
  createElement,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
} from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export type ListElement = HTMLUListElement | HTMLOListElement;
export interface ListProps extends HTMLAttributes<ListElement> {
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
  Pick<ListProps, "dense" | "ordered" | "horizontal">
>;
type WithDefaultProps = ListProps & DefaultProps & WithRef;

/**
 * Creates an unordered or ordered list.
 */
const List: FunctionComponent<ListProps & WithRef> = providedProps => {
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
      className: cn(
        "rmd-list",
        {
          "rmd-list--dense": dense,
          "rmd-list--horizontal": horizontal,
        },
        className
      ),
    },
    children
  );
};

const defaultProps: DefaultProps = {
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
      dense: PropTypes.bool,
      horizontal: PropTypes.bool,
      ordered: PropTypes.bool,
    };
  }
}

export default forwardRef<ListElement, ListProps>((props, ref) => (
  <List {...props} forwardedRef={ref} />
));
